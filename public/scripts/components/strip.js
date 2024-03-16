let squawksInUse = [];
let validDigits = '01234567';
let length = 4;

const stripStatuses = {
  outbound: ['SUG', 'PBG', 'TXG', 'ALU', 'DEP'],
  inbound: ['ARR', 'IDE', 'DES', 'ILS', 'GOA', 'TXG', 'ONB'],
  vfr: ['SUG', 'TXG', 'DEP', 'TFP'],
};

let stripTypes = ['inbound', 'outbound', 'vfr'];

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
  newStrip.id = generateId(10);
  /* newStrip.querySelectorAll('.textInput').forEach(input => {
    input.addEventListener('focusout', event => {
      StripSaveManager.updateStrip(newStrip, newStrip.parentElement);
    });
  }); */
  newStrip.setAttribute('data-type', type);
  newStrip.removeEventListener('focusout', focusOutEvent);
  newStrip.addEventListener('focusout', focusOutEvent);

  if (!stripTypes.includes(type)) return;
  // if (!stripListTypes.includes(stripListType)) return;

  if (shouldGenerateRandomSquawk) {
    let squawk = generateSquawk();
    newStrip.querySelector('#squawk').value = squawk;
  }

  if (type !== 'vfr') {
    newStrip.querySelector('#runway').value = getDepartureRunway();
    newStrip.querySelector('#departure').value = currentAirport.icao || '';
  }

  newStrip.style.backgroundColor = `var(--${type}-bg)`;
  newStrip.style.border = `2px solid var(--${type}-border)`;

  return newStrip;
}

let genNewStrip;
function generateFocusOutEvent(e) {
  StripSaveManager.updateStrip(genNewStrip, genNewStrip.parentElement);
}

function generatePrepopulatedStrip(saveData) {
  let newStrip = templateStrip.cloneNode(true);
  newStrip.id = saveData?.info?.stripId || '';
  newStrip.setAttribute('data-type', saveData.type);

  newStrip.querySelectorAll('.textInput').forEach(input => {
    genNewStrip = newStrip;
    input.removeEventListener('focusout', generateFocusOutEvent);
    input.addEventListener('focusout', generateFocusOutEvent);
  });

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
  if (squawk == '7000') return generateSquawk();
  return squawk;
}

function getDepartureRunway() {
  for (let i = 0; i < window.activeRunways.length; i++) {
    const rwy = window.activeRunways[i];
    if (rwy.arrivalOrDeparture == 'dep' && rwy.active) return rwy.rwyId;
  }
  return '';
}

function generateId(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
