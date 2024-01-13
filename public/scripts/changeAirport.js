/**
 *
 * @param {Event|String} e HTMLEvent OR island name
 * @param  {String} airportName Airport name
 * @returns void
 */
function changeAirport(e, ...airportName) {
  if (typeof e == 'string') {
    let values = [e, ...airportName];
    let island = values[0];
    let _airportName = values[1];
    executeStationSelectUpdate(island, _airportName);
  } else {
    let newValues = e.target.value.split('/');
    let island = newValues[0];
    let _airportName = newValues[1];
    executeStationSelectUpdate(island, _airportName);
  }
}

function executeStationSelectUpdate(island, airportName) {
  while (stationSelect.firstChild) {
    stationSelect.removeChild(stationSelect.lastChild);
  }
  while (runwaySelect.firstChild) {
    runwaySelect.removeChild(runwaySelect.lastChild);
  }
  let stations;
  let runways;
  for (const airport of airports[island]) {
    if (airport.name == airportName) {
      stations = airport.stations;
      runways = airport.runways;

      updateAirportInfo(airport);
      break;
    }
  }

  for (const station of stations) {
    let option = document.createElement('option');
    option.value = station.type + '/' + station.frequency;
    option.textContent = station.type;
    stationSelect.appendChild(option);
  }

  for (let i = 0; i < runways.length; i++) {
    const runway = runways[i];
    console.log(runway);
    let option = document.createElement('option');
    option.value = runway;
    option.textContent = runway;
    runwaySelect.appendChild(option);
  }

  updateStationInfo();
}
