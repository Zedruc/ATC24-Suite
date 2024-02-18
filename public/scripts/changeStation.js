/**
 *
 * @param {Event|String} e HTMLEvent OR station type
 * @returns void
 */
function changeStation(e) {
  if (typeof e == 'string') {
    let stationType = e;
    updateStationInfo(findStation(stationType));
  } else {
    let newValues = e.target.value.split('/');
    let type = newValues[0];
    let frequency = newValues[1];
    updateStationInfo({ type: type, frequency: frequency });
  }
}

function findStation(type) {
  for (const station of currentAirport.stations) {
    if (station.type == type) return station;
  }
}
