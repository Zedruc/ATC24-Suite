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
  while (arrRunwaySelect.firstChild && depRunwaySelect.firstChild) {
    arrRunwaySelect.removeChild(arrRunwaySelect.lastChild);
    depRunwaySelect.removeChild(depRunwaySelect.lastChild);
  }

  let stations;
  let runways;
  for (const airport of airports[island]) {
    if (airport.name == airportName) {
      stations = airport.stations;
      runways = airport.runways;
      window.currentAirport = airport.icao.toLowerCase();
      if (window.radarWindow) {
        window.radarWindow.postMessage({
          type: 'airport_change',
          airport: airport.icao.toLowerCase(),
        });
      }

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
    let option = document.createElement('option');
    option.value = runway;
    option.textContent = runway;
    let option2 = document.createElement('option');
    option2.value = runway;
    option2.textContent = runway;
    arrRunwaySelect.appendChild(option);
    depRunwaySelect.appendChild(option2);
  }
  activeArrRunway = arrRunwaySelect.value;
  activeDepRunway = depRunwaySelect.value;

  updateStationInfo();
}
