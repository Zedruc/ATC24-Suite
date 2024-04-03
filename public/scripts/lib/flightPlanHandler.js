function handleFlightplan(fpl) {
  if (!Settings.get('autoImportFlightplans')) return;
  let { departing, arriving } = fpl;
  console.log(fpl);
  if (departing.toLowerCase() == currentAirport.icao.toLowerCase()) {
    /**
     * Add strip to left-most column as that is
     * the default delivery column and I can only assume :p
     */
    let list = document.querySelector('.stripContainer').firstChild;
    let generatedStrip = generateStripFromLiveFlightplan(fpl, 'outbound');
    insertAsFirstStrip(generatedStrip, list);
    clearanceFromFlightPlan(generatedStrip, true, fpl);
    StripSaveManager.add(generatedStrip, list);
    return;
  }

  if (arriving.toLowerCase() == currentAirport.icao.toLowerCase()) {
    /**
     * Add strip to right-most column as that is
     * the default app/dep column and I can only assume :p
     */
    let list = document.querySelector('.stripContainer').lastChild;
    let generatedStrip = generateStripFromLiveFlightplan(fpl, 'inbound');
    insertAsFirstStrip(generatedStrip, list);
    clearanceFromFlightPlan(generatedStrip, true, { info: { flightplan: fpl } });
    StripSaveManager.add(generatedStrip, list);
    return;
  }
}
