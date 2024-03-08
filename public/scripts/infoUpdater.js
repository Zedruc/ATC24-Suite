const airportIcao = document.querySelector('#airport>.leftNote');
const airportIata = document.querySelector('#airport>.rightNote');

const stationType = document.querySelector('#station>.leftNote');
const stationFrequency = document.querySelector('#station>.rightNote');

const chart = document.getElementById('chart');

let currentAirport;

function updateAirportInfo(airport) {
  airportIcao.textContent = airport.icao;
  airportIata.textContent = airport.iata;
  currentAirport = airport;

  $('#chart').prop('src', `./charts/${airport.icao}/${airport.icao} Ground Chart.png.webp`);
}

function updateStationInfo(currentStation = stationSelect.value) {
  if (typeof currentStation == 'string') {
    let vals = currentStation.split('/');
    currentStation = { type: vals[0], frequency: vals[1] };
  }
  if (window.radarWindow) {
    window.radarWindow.postMessage({ type: 'runway_changes', runways: window.activeRunways });
  }
  if (window.atisWindow) {
    window.atisWindow.postMessage({ type: 'runway_changes', runways: window.activeRunways });
  }
  stationType.textContent = currentStation.type;
  stationFrequency.textContent = currentStation.frequency + ' MHz';
}

/* function arrRunwayChange(target) {
  window.activeArrRunway = target.value;
  activeArrRunway = target.value;
  if (window.radarWindow) {
    window.radarWindow.postMessage({ type: 'arr_runway_change', runway: activeArrRunway });
  }
}

function depRunwayChange(target) {
  window.activeDepRunway = target.value;
  activeDepRunway = target.value;
  if (window.radarWindow) {
    window.radarWindow.postMessage({ type: 'dep_runway_change', runway: activeDepRunway });
  }
}
 */
