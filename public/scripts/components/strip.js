let squawksInUse = [];
let validDigits = '01234567';
let length = 4;

let stripTypes = ['inbound', 'outbound', 'vfr'];
let stripListTypes = ['del', 'gnd', 'twr', 'app/dep'];

let templateStrip = document.getElementById('templateStrip');

/**
 *
 * @param {string} type Inbound | Outbound | VFR
 * @param {bool} shouldGenerateRandomSquawk
 * @param {string} stripListType Del | Gnd | Twr | App/Dep
 * @returns
 */
function generateStrip(type, shouldGenerateRandomSquawk, stripListType) {
  let newStrip = templateStrip.cloneNode(true);
  newStrip.id = '';
  newStrip.setAttribute('data-type', type);

  if (!stripTypes.includes(type)) return;
  if (!stripListTypes.includes(stripListType)) return;

  if (shouldGenerateRandomSquawk) {
    let squawk = generateSquawk();
    newStrip.querySelector('#squawk').value = squawk;
  }

  if (type !== 'vfr') {
    newStrip.querySelector('#runway').value = depRunwaySelect.value || '';
    newStrip.querySelector('#departure').value = currentAirport.icao || '';
  }

  newStrip.style.backgroundColor = `var(--${type}-bg)`;
  newStrip.style.border = `2px solid var(--${type}-border)`;

  return newStrip;
}

function generatePrepopulatedStrip(saveData) {
  let newStrip = templateStrip.cloneNode(true);
  newStrip.id = '';
  newStrip.setAttribute('data-type', saveData.type);

  if (!stripTypes.includes(saveData.type)) return;

  newStrip.style.backgroundColor = `var(--${saveData.type}-bg)`;
  newStrip.style.border = `2px solid var(--${saveData.type}-border)`;

  /* let callsignField = */ newStrip.querySelector('#callsign').value = saveData.info.callsign;
  /* let squawkField = */ newStrip.querySelector('#squawk').value = saveData.info.squawk;
  /* let departingField = */ newStrip.querySelector('#departure').value = saveData.info.departure;
  /* let arrivingField = */ newStrip.querySelector('#arrival').value = saveData.info.arrival;
  /* let aircraftField = */ newStrip.querySelector('#aircraft').value = saveData.info.aircraft;
  /* let altitudeField = */ newStrip.querySelector('#altitude').value = saveData.info.altitude;
  /* let gateField = */ newStrip.querySelector('#gate').value = saveData.info.gate;
  /* let statusField = */ newStrip.querySelector('#status').value = saveData.info.status;
  /* let infoField = */ newStrip.querySelector('#info').value = saveData.info.info;
  /* let runwayField = */ newStrip.querySelector('#runway').value = saveData.info.runway;
  /* let sidstarField = */ newStrip.querySelector('#sidstar').value = saveData.info.sidstar;
  /* let freeTextField = */ newStrip.querySelector('#notes').value = saveData.info.notes;
  /* let freeTextField = */ newStrip.querySelector('#route').value = saveData.info.route;
  /* let freeTextField = */ newStrip.querySelector('#flightplan').value = saveData.info.flightplan;

  return newStrip;
}

function generateSquawk() {
  let squawk = '';
  for (let i = 0; i < length; i++) {
    squawk += validDigits[Math.floor(Math.random() * validDigits.length)];
  }
  if (squawksInUse.includes(squawk)) return generateSquawk();
  return squawk;
}
