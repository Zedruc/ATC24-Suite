window.atis = {};
let checkBoxes = [...document.querySelectorAll('input')].filter(
  e => e.getAttribute('type') == 'checkbox'
);
checkBoxes.forEach(e => (window.atis[e.id] = e.checked));

document.querySelectorAll('input').forEach(e =>
  e.addEventListener('input', () => {
    console.log('change');
    generateATIS();
  })
);

function updateCheckbox(checkbox) {
  window.atis[checkbox.id] = checkbox.checked;
  console.log(checkbox.checked);
  generateATIS();
}

/**
 *
 * @param {string} type "arr" | "dep"
 */
function getUsedRunways(type) {
  if (!type) return;
  let runways = [];

  let availableRunways = window.opener.activeRunways;
  for (let i = 0; i < availableRunways.length; i++) {
    const runway = availableRunways[i];
    if (runway.arrivalOrDeparture == type && runway.active) {
      runways.push(runway.rwyId);
    }
  }
  return runways;
}

function getControllerCallsign() {
  return window.opener.controllerCallsign;
}

function getCurrentAirport() {
  return window.opener.currentAirport;
}

let lastAirport;

function getAirportATISData() {
  let currentAirport = getCurrentAirport();
  for (let i = 0; i < airportATISData.length; i++) {
    const data = airportATISData[i];
    if (data.icaoCode.toLowerCase() == currentAirport) {
      return data;
    }
  }
}

function populateChartPacks() {
  let chartSelect = document.getElementById('chartPack');
  let chartPacks = getAirportATISData().chartPacks;
  if (lastAirport == getCurrentAirport()) return;
  while (chartSelect.firstChild) {
    chartSelect.removeChild(chartSelect.lastChild);
  }
  for (let i = 0; i < chartPacks.length; i++) {
    const pack = chartPacks[i];
    let option = document.createElement('option');
    option.value = `${pack.author}°${pack.link}`;
    option.textContent = pack.author;
    chartSelect.appendChild(option);
  }
}

function generateATIS() {
  document.getElementById('arrivalRunways').value = getUsedRunways('arr').join(' ');
  document.getElementById('departureRunways').value = getUsedRunways('dep').join(' ');
  populateChartPacks();

  let atisOutput = document.getElementById('output');
  let chartPackSplitInfo = document.getElementById('chartPack').value.split('°');
  let atisData = getAirportATISData();
  let currentDate = new Date();
  let additionalNotams = document.getElementById('notams').value;

  lastAirport = getCurrentAirport();

  window.opener.currentAtis = document.getElementById('atisId').value.toUpperCase() || 'A';

  atisOutput.innerHTML = `∎ ${getCurrentAirport().toUpperCase()} ATIS Information ${
    document.getElementById('atisId').value.toUpperCase() || 'A'
  } ${currentDate.getUTCHours().toString().padStart(2, '0')}${
    currentDate.getUTCMinutes() >= 0 && currentDate.getUTCMinutes() <= 35 ? '20' : '50'
  }z ∎
**${''.padStart(15, '―')}**
**Controller Callsign:** ${getControllerCallsign()}
**${''.padStart(15, '―')}**
**Aerodrome:**
Max Taxi Speed: ${document.getElementById('maxTaxiSpeed').value}kts
Arrival Runway(s): ${document.getElementById('arrivalRunways').value}
Departure Runway(s): ${document.getElementById('departureRunways').value}
Max Acft Size: ${atisData.maxAircraftSize}
QNH: ${Math.round(+document.getElementById('qnh').value)}
    
**NOTAMS:**
Ground Acft Advise Receipt of Information ${
    document.getElementById('atisId').value.toUpperCase() || 'A'
  }${atis.parkingPosition ? ', Stand Number' : ''}${
    atis.groundAircraftType ? ', Aircraft Type' : ''
  } on Initial Contact.
Airborne Acft Advise Receipt of Information ${
    document.getElementById('atisId').value.toUpperCase() || 'A'
  }${atis.airAircraftType ? ', Aircraft Type' : ''}${atis.altitude ? ', Altitude' : ''}${
    atis.airspeed ? ', Airspeed' : ''
  }${atis.heading ? ', Heading' : ''} on Initial Contact.
VFR Acft say Direction of Flight and Intentions.
${atis.sidstar ? `SIDs/STARs are preferred.\n` : ''}${atis.cpdlc ? 'PDC Avail. Through DMs.\n' : ''}${
    additionalNotams.length > 0 ? `${additionalNotams}\n` : ''}
**Charts:**
Chart Pack Author: ${chartPackSplitInfo[0]}
Chart Pack Link: <${chartPackSplitInfo[1]}>
**${''.padStart(15, '―')}**
∎ End of ATIS Information ${document.getElementById('atisId').value.toUpperCase() || 'A'} ∎`;
}

generateATIS();

window.addEventListener('message', ev => {
  let msg = ev.data;
  console.log(msg);
  if (msg.type == 'airport_update') {
    generateATIS();
  }
});

// this will keep the connection between opener and atis window
window.requestAnimationFrame(alertParentWindow);

function alertParentWindow() {
  window.requestAnimationFrame(alertParentWindow);
  opener.atisWindow = window;
}
