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

const arrivalGroups = {
  'IFRD': { controlArea: 'Rockford', frequency: '124.850' },
  'ITRN': { controlArea: 'Rockford', frequency: '124.850' },
  'IBLT': { controlArea: 'Rockford', frequency: '124.850' },
  'IGAR': { controlArea: 'Rockford', frequency: '124.850' },
  'IMLR': { controlArea: 'Rockford', frequency: '124.850' },

  'IHEN': { controlArea: 'Cyprus', frequency: '126.300' },
  'IIAB': { controlArea: 'Cyprus', frequency: '126.300' },
  'ILAR': { controlArea: 'Cyprus', frequency: '126.300' },
  'IPAP': { controlArea: 'Cyprus', frequency: '126.300' },

  'IZOL': { controlArea: 'Izolirani', frequency: '124.640' },
  'IJAF': { controlArea: 'Izolirani', frequency: '124.640' },

  'IPPH': { controlArea: 'Perth', frequency: '135.250' },
  'ILKL': { controlArea: 'Perth', frequency: '135.250' },

  'ITKO': { controlArea: 'Orenji', frequency: '132.300' },
  'IDCS': { controlArea: 'Orenji', frequency: '132.300' },

  'IBTH': { controlArea: 'St Barthelemy', frequency: '128.600' },

  'IGRV': { controlArea: 'Grindavik', frequency: '126.750' },

  'ISAU': { controlArea: 'Sauthemptona', frequency: '122.730' },
};

function generateStrip(type, shouldGenerateRandomSquawk, stripListType) {
  let newStrip = templateStrip.cloneNode(true);
  newStrip.id = generateId(10);
  
  newStrip.setAttribute('data-type', type);
  newStrip.removeEventListener('focusout', focusOutEvent);
  newStrip.addEventListener('focusout', focusOutEvent);

  if (!stripTypes.includes(type)) return;

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

function setFrequencyBasedOnArrival(newStrip, arrival) {
  let frequencyInput = newStrip.querySelector('#frequency');
  if (arrival && arrivalGroups[arrival]) {
    let groupInfo = arrivalGroups[arrival];
    frequencyInput.value = `${groupInfo.controlArea} ${groupInfo.frequency}`;
  } else {
    frequencyInput.value = 'Unknown';
  }
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

  newStrip.querySelector('#callsign').value = saveData.info.callsign;
  newStrip.querySelector('#squawk').value = saveData.info.squawk;
  newStrip.querySelector('#departure').value = saveData.info.departure;
  newStrip.querySelector('#arrival').value = saveData.info.arrival;
  newStrip.querySelector('#aircraft').value = saveData.info.aircraft;
  newStrip.querySelector('#altitude').value = saveData.info.altitude;
  newStrip.querySelector('#gate').value = saveData.info.gate;
  newStrip.querySelector('#status').value = saveData.info.status;
  newStrip.querySelector('#info').value = saveData.info.info;
  newStrip.querySelector('#runway').value = saveData.info.runway;
  newStrip.querySelector('#notes').value = saveData.info.notes;
  newStrip.querySelector('#route').value = saveData.info.route;
  newStrip.querySelector('#flightplan').value = saveData.info.flightplan;

  setFrequencyBasedOnArrival(newStrip, saveData.info.arrival);

  return newStrip;
}

function generateStripFromLiveFlightplan(fpl, type) {
  let newStrip = templateStrip.cloneNode(true);
  newStrip.id = generateId(10);
  newStrip.setAttribute('data-type', type);

  newStrip.querySelectorAll('.textInput').forEach(input => {
    input.removeEventListener('focusout', generateFocusOutEvent);
    input.addEventListener('focusout', generateFocusOutEvent);
  });

  if (!stripTypes.includes(type)) return;

  newStrip.style.backgroundColor = `var(--${type}-bg)`;
  newStrip.style.border = `2px solid var(--${type}-border)`;
  
  newStrip.querySelector('#callsign').value = fpl.callsign;
  newStrip.querySelector('#squawk').value = generateSquawk();
  newStrip.querySelector('#departure').value = fpl.departing;
  newStrip.querySelector('#arrival').value = fpl.arriving;
  newStrip.querySelector('#aircraft').value = fpl.aircraft;
  newStrip.querySelector('#altitude').value = fpl.altitude;
  newStrip.querySelector('#route').innerText = fpl.route;

  setFrequencyBasedOnArrival(newStrip, fpl.arriving);

  return newStrip;
}

function generateSquawk() {
  let squawk = '';
  for (let i = 0; i < length; i++) {
    squawk += validDigits[Math.floor(Math.random() * validDigits.length)];
  }
  if (squawksInUse.includes(squawk)) return generateSquawk();
  if (['7700', '7600', '7500', '7000'].includes(squawk)) return generateSquawk();
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