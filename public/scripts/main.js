let currentYear = new Date().getFullYear();
document.getElementById('copyrightNotice').innerHTML = `&copy; Zedruc ${currentYear}`;

document.getElementById('appVersion').innerText = window.appVersion;

/* 
DISABLED FOR PURPOSE OF
HELPING USERS RESOLVE ISSUES

if (window.location.hostname == 'zedruc.net') {
  let noOp = function () {};
  console.log = noOp;
  console.warn = noOp;
} */

if (window?.navigator?.userAgent.toLowerCase().includes('firefox')) {
  notificationQueue.queue({
    title: 'Important!',
    html: `It seems you are using a browser like Firefox, which doesn't support features required for this program to function properly.<br/><b>Firefox uses may increasingly experience issues with the suite thinking you are still logged in because of Firefox not closing connections properly.</b><br/> Consider using Chrome, as this is what the ATC24-Suite was developed for.`,
    icon: 'info',
  });
}

// check if first time visitor
let firstTimeVisit = localStorage.getItem('firstTimeVisit');
let columns = localStorage.getItem('columns');
if (!columns)
  localStorage.setItem('columns', JSON.stringify(['DELIVERY', 'GROUND', 'TOWER', 'APP/DEP']));
populateColumns();
if (firstTimeVisit !== 'true') {
  notificationQueue.queue({
    type: 'first_visit',
    title: 'Welcome!',
    html: `Thanks for visiting the ATC24 Suite.<br />Here's an overview of <a>important keybinds</a> for using the Suite as efficiently as possible. You can check them anytime by <a>hovering over "Help" in the top right</a>.<br /><br />• I - Create Inbound Strip<br />• O - Create Outbound Strip<br />• V - Create VFR Strip<br />• X - Delete Strip<br />• C - Cancel Deletion<br /><br/>• A - Move strip to the previous list<br />• D - Move strip to the next list<br />• W - Move strip up<br />• S - Move strip down<br /><br />• Q - Cycle Flight Status Back<br />• E - Cycle Flight Status Forward<br /><br />Strips are created where your mouse is and deleting strips will take the strip your mouse is currently hovering.<br /><br /><a href="https://discord.com/invite/EHxWfKEbrq" target="_blank">Join the Discord!</a><br />Happy Controlling!<br />- Zedruc`,
    icon: 'info',
  });
}

let airportSelect = document.getElementById('airport-select');
let stationSelect = document.getElementById('station-select');
let arrRunwayCheckboxes = document.getElementById('arrRunwayCheckboxes');
let depRunwayCheckboxes = document.getElementById('depRunwayCheckboxes');

for (const island in airports) {
  let group = document.createElement('optgroup');
  group.label = island[0].toUpperCase() + island.substring(1);
  for (const airport of airports[island]) {
    let option = document.createElement('option');
    option.value = island.toLowerCase() + '/' + airport.name;
    option.textContent = airport.name;
    group.appendChild(option);
  }
  airportSelect.appendChild(group);
}

airportSelect.selectedIndex = document.querySelector('option[value="rockford/Rockford"]').index;

airportSelect.addEventListener('change', changeAirport);
stationSelect.addEventListener('change', changeStation);
// stationSelect.value = 'rockford/Rockford';

executeStationSelectUpdate('rockford', 'Rockford');

// execute setting functions as required
if (Settings.get('loadStripsOnStart')) StripSaveManager.loadFromStorageAndPopulate();
else localStorage.setItem('strips', '{}');
