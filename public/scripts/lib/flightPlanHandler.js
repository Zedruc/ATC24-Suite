function handleFlightplan(fpl, overrideHold = false) {
  if (!Settings.get('autoImportFlightplans')) return;
  let { departing, arriving } = fpl;
  console.log(fpl);
  if (departing.toLowerCase() == currentAirport.icao.toLowerCase()) {
    /**
     * Add strip to left-most column as that is
     * the default delivery column
     */
    let list = document.querySelector('.stripContainer').firstChild;
    let generatedStrip = generateStripFromLiveFlightplan(fpl, 'outbound');
    list.appendChild(generatedStrip);
    clearanceFromFlightPlan(generatedStrip, true, fpl);
    StripSaveManager.add(generatedStrip, list);
    return;
  }

  if (arriving.toLowerCase() == currentAirport.icao.toLowerCase()) {
    /**
     * Add strip to right-most column as that is
     * the default app/dep column
     */
    // if (Settings.get('holdArrivalsInList') == 'false') {
    let list = document.querySelector('.stripContainer').lastChild;
    let generatedStrip = generateStripFromLiveFlightplan(fpl, 'inbound');
    list.appendChild(generatedStrip);
    clearanceFromFlightPlan(generatedStrip, true, { info: { flightplan: fpl } });
    StripSaveManager.add(generatedStrip, list);
    // }

    // add strip to arrival list
    let arrivalTime = new Date();
    let arrivalHour = arrivalTime.getUTCHours();
    let arrivalMinute = arrivalTime.getUTCMinutes() + 10;
    if (arrivalMinute >= 60) {
      arrivalHour += 1;
      arrivalMinute = arrivalMinute - 60;
    }
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
        stripId: generatedStrip.id,
      },
    });

    return;
  }
}

function findFirstActiveRunway() {
  for (let i = 0; i < window.activeRunways.length; i++) {
    const rwy = window.activeRunways[i];
    if (rwy.active && rwy.arrivalOrDeparture == 'arr') return rwy.rwyId;
  }
}
