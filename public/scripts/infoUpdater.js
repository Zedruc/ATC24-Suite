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
  if (window.) {
    window.radarWindow.postMessage({ type: 'runway_change', runway: activeRunway });
  }
  stationType.textContent = currentStation.type;
  stationFrequency.textContent = currentStation.frequency + ' MHz';
}

function runwayChange(target) {
  activeRunway = target.value;
}
