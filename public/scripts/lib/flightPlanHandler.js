let arrivalsOnHold = {};

function handleFlightplan(fpl, overrideHold = false) {
  if (!Settings.get('autoImportFlightplans')) return;
  let { departing, arriving, flightrules } = fpl;

  let isArriving = arriving.toLowerCase() == currentAirport.icao.toLowerCase();
  let isDeparting = departing.toLowerCase() == currentAirport.icao.toLowerCase();
  let isIFR = flightrules.toLowerCase() == 'ifr';

  /**
   * If overrideHold is true, this is ignored and the strip is placed anyway
   */
  console.log(isArriving);
  console.log(Settings.get('holdArrivalsInList'));
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
        rwy: findFirstActiveRunway(),
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
  }
}

function findFirstActiveRunway() {
  for (let i = 0; i < window.activeRunways.length; i++) {
    const rwy = window.activeRunways[i];
    if (rwy.active && rwy.arrivalOrDeparture == 'arr') return rwy.rwyId;
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
