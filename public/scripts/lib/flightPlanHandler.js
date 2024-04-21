let arrivalsOnHold = {};

function handleFlightplan(fpl, overrideHold = false) {
  if (!Settings.get('autoImportFlightplans')) return;
  let { departing, arriving, flightrules, eventFP } = fpl;

  let isArriving = arriving.toLowerCase() == currentAirport.icao.toLowerCase();
  let isDeparting = departing.toLowerCase() == currentAirport.icao.toLowerCase();
  let isCenterController = stationSelect.value.split('/')[0].toLowerCase() == 'ctr';
  let isIFR = flightrules.toLowerCase() == 'ifr';
  let isEventFlightPlan = eventFP;
  console.log(`IsEventFP: ${eventFP}`);

  /**
   * If "Only Event Flightplans" is enabled and the Flightplan is not
   * an event flightplan, disregard
   */
  if (Settings.get('eventFlightPlans') !== isEventFlightPlan) {
    // ignore
    console.log('Ignoring');
    return;
  }

  /**
   * If overrideHold is true, this is ignored and the strip is placed anyway
   */

  if (isArriving && isIFR && Settings.get('holdArrivalsInList') && !overrideHold) {
    // add strip to arrival list
    let arrivalTime = new Date();
    let arrivalHour = arrivalTime.getUTCHours();
    let arrivalMinute = arrivalTime.getUTCMinutes() + 10;
    if (arrivalMinute >= 60) {
      arrivalHour += 1;
      arrivalMinute = arrivalMinute - 60;
    }

    arrivalsOnHold[fpl.callsign] = fpl;

    window?.arrivalWindow?.postMessage({
      type: 'new_arrival',
      /**
       * @type {Arrival} arrival
       */
      arrival: {
        rwy: findFirstActiveRunway('arr'),
        cs: fpl.callsign,
        type: fpl.aircraft,
        eta: `${arrivalHour}:${arrivalMinute.toString().padStart(2, '0')}`,
        stand: 'N/A',
        stripId: fpl.callsign,
      },
    });

    return;
  }

  if (isDeparting && isIFR) {
    /**
     * Add strip to left-most column as that is
     * the default delivery column
     */
    let list = document.querySelector('.stripContainer').firstChild;
    let generatedStrip = generateStripFromLiveFlightplan(fpl, 'outbound');
    list.appendChild(generatedStrip);
    clearanceFromAutomaticImport(generatedStrip, fpl);
    StripSaveManager.add(generatedStrip, list, true, true);
  } else if (isDeparting && !isIFR) {
    /**
     * Add strip to left-most column as that is
     * the default delivery column
     */
    let list = document.querySelector('.stripContainer').firstChild;
    let generatedStrip = generateStripFromLiveFlightplan(fpl, 'vfr');
    list.appendChild(generatedStrip);
    clearanceFromAutomaticImport(generatedStrip, fpl);
    StripSaveManager.add(generatedStrip, list, true, true);
  } else if (isArriving && isIFR) {
    /**
     * Add strip to right-most column as that is
     * the default app/dep column
     */
    let list = document.querySelector('.stripContainer').lastChild;
    let generatedStrip = generateStripFromLiveFlightplan(fpl, 'inbound');
    list.appendChild(generatedStrip);
    clearanceFromAutomaticImport(generatedStrip, fpl);
    StripSaveManager.add(generatedStrip, list, true, true);
  } else if (isArriving && !isIFR) {
    /**
     * Add strip to right-most column as that is
     * the default app/dep column
     */
    let list = document.querySelector('.stripContainer').lastChild;
    let generatedStrip = generateStripFromLiveFlightplan(fpl, 'vfr');
    list.appendChild(generatedStrip);
    clearanceFromAutomaticImport(generatedStrip, fpl);
    StripSaveManager.add(generatedStrip, list, true, true);
  } else if (isCenterController && !isArriving && !isDeparting) {
    console.log('enroute');
    // SOTAF_CTR needs all flights crossing the airspace
    let flightIsCrossingAirspace = checkIfFlightIsCrossingAirspace(
      currentAirport.icao.toLowerCase(),
      fpl
    );

    if (flightIsCrossingAirspace) {
      let list = document.querySelector('.stripContainer').lastChild;
      let generatedStrip = generateStripFromLiveFlightplan(fpl, 'inbound');
      list.appendChild(generatedStrip);
      fpl.route = `[ENROUTE] ${fpl.route}`;
      clearanceFromAutomaticImport(generatedStrip, fpl);
      StripSaveManager.add(generatedStrip, list, true, true);
    }
  }
}

function findFirstActiveRunway(appOrDep) {
  for (let i = 0; i < window.activeRunways.length; i++) {
    const rwy = window.activeRunways[i];
    if (rwy.active && rwy.arrivalOrDeparture == appOrDep) return rwy.rwyId;
  }
}

window.addEventListener('message', ({ data }) => {
  console.log(data);
  if (data.type == 'arrival_accepted') {
    acceptArrival(data.callsign);
  }
});

function acceptArrival(callsign) {
  let arrival = arrivalsOnHold[callsign];
  if (!arrival) return;
  delete arrivalsOnHold[callsign];

  /**
   * True to override the settings check so we dont loop back into the arrivals list
   */
  handleFlightplan(arrival, true);
}

let pairsCrossingSotaf = [];
function checkIfFlightIsCrossingAirspace(currentAirportIcao, fpl) {
  let waypointsInAirspace = getWaypoints(currentAirportIcao);
  let isSotaf = currentAirportIcao.toLowerCase() == 'ibth';
  if (!waypointsInAirspace) return;
  let route = fpl.route.toLowerCase();

  for (let i = 0; i < waypointsInAirspace.length; i++) {
    const wpt = waypointsInAirspace[i].name;
    if (route.includes(wpt.toLowerCase())) return true;
  }

  /**
   * If no waypoint detected/matched but current station is IBTH_CTR
   * just import flight because yes
   */
  if (!isSotaf) return false;
  else return true;
}

function getWaypoints(icao) {
  for (const country in airports) {
    for (const airport of airports[country]) {
      console.log(airport);
      if (airport.icao.toLowerCase() !== icao.toLowerCase()) continue;
      if (!airport?.waypoints) return;
      return airport.waypoints;
    }
  }
}
