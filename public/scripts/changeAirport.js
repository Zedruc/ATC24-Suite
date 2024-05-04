/**
 *
 * @param {Event|String} e HTMLEvent OR island name
 * @param  {String} airportName Airport name
 * @returns void
 */
function changeAirport(e, ...airportName) {
  window.activeRunways = [];
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
  console.log(airportName);
  while (stationSelect.firstChild) {
    stationSelect.removeChild(stationSelect.lastChild);
  }
  while (arrRunwayCheckboxes.firstChild && depRunwayCheckboxes.firstChild) {
    arrRunwayCheckboxes.removeChild(arrRunwayCheckboxes.lastChild);
    depRunwayCheckboxes.removeChild(depRunwayCheckboxes.lastChild);
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

      if (window.atisWindow) {
        window.atisWindow.postMessage({
          type: 'airport_update',
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
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.id = 'arr';
    checkbox.setAttribute('data-runway', runway);
    checkbox.setAttribute('onchange', 'changeRunwayStatus(this)');
    let p = document.createElement('p');
    p.innerText = runway;

    let checkbox2 = document.createElement('input');
    checkbox2.setAttribute('type', 'checkbox');
    checkbox2.id = 'dep';
    checkbox2.setAttribute('data-runway', runway);
    checkbox2.setAttribute('onchange', 'changeRunwayStatus(this)');
    let p2 = document.createElement('p');
    p2.innerText = runway;

    if (i == 0) {
      checkbox.checked = true;
      checkbox2.checked = true;
    }

    arrRunwayCheckboxes.appendChild(checkbox);
    arrRunwayCheckboxes.appendChild(p);

    depRunwayCheckboxes.appendChild(checkbox2);
    depRunwayCheckboxes.appendChild(p2);

    changeRunwayStatus(checkbox);
    changeRunwayStatus(checkbox2);
  }
  // activeArrRunways = getActiveRunways('arr');
  // activeDepRunways = getActiveRunways('dep');

  updateStationInfo();
}

function changeRunwayStatus(checkboxElement) {
  let runway = checkboxElement.getAttribute('data-runway');
  let active = checkboxElement.checked;
  let arrivalOrDeparture = checkboxElement.id;

  if (!window.activeRunways) window.activeRunways = [];

  let rwyObject = {
    rwyId: runway,
    active: active,
    arrivalOrDeparture: arrivalOrDeparture,
  };

  let runwayIndex = getRunwayIndex(runway, arrivalOrDeparture);

  if (runwayInArray(window.activeRunways, runway, arrivalOrDeparture)) {
    window.activeRunways.splice(runwayIndex, 1, rwyObject);
  } else {
    window.activeRunways.push(rwyObject);
  }

  window?.radarWindow?.postMessage({ type: 'runway_changes', runways: window.activeRunways });
  if (window.atisWindow) {
    window.atisWindow.postMessage({
      type: 'airport_update',
    });
  }
}

function runwayInArray(arr, id, arrivalOrDeparture) {
  for (let i = 0; i < arr.length; i++) {
    const rwy = arr[i];
    if (rwy.rwyId == id && rwy.arrivalOrDeparture == arrivalOrDeparture) return true;
  }
  return false;
}

function getRunwayIndex(id, arrivalOrDeparture) {
  for (let i = 0; i < window.activeRunways.length; i++) {
    const rwy = window.activeRunways[i];
    if (rwy.rwyId == id && rwy.arrivalOrDeparture == arrivalOrDeparture) return i;
  }
  return -1;
}
