let currentYear = new Date().getFullYear();
document.getElementById('copyrightNotice').innerHTML = `&copy; Zedruc ${currentYear}`;

document.getElementById('appVersion').innerText = window.appVersion;

if (window.location.hostname == 'zedruc.net') {
  let noOp = function () {};
  console.log = noOp;
  console.warn = noOp;
}

if (!window?.navigator?.clipboard?.readText) {
  notificationQueue.queue({
    title: 'Important!',
    html: `It seems you are using a browser like Firefox, which doesn't support features required for this program to function properly.<br/>Consider using Chrome, as this is what the ATC24-Suite was developed for.`,
    icon: 'info',
  });
}

// check if first time visitor
let firstTimeVisit = localStorage.getItem('firstTimeVisit');
if (firstTimeVisit !== 'true') {
  if (window.appVersion.startsWith('b')) {
    notificationQueue.queue({
      title: 'Welcome!',
      html: `Thanks for visiting the ATC24 Suite.<br />Here's an overview of important keybinds for using the Suite as efficiently as possible. You can check them anytime by hovering over "Help" in the top right.<br /><br />• I - Create Inbound Strip<br />• O - Create Outbound Strip<br />• V - Create VFR Strip<br />• X - Delete Strip<br />• C - Cancel Deletion<br /><br/>• A - Move strip to the previous list<br />• D - Move strip to the next list<br />• W - Move strip up<br />• S - Move strip down<br /><br />Strips are created where your mouse is and deleting strips will take the strip your mouse is currently hovering.<br /><br />Happy Controlling!<br />- Zedruc`,
      icon: 'info',
    });
    notificationQueue.queue({
      type: 'first_visit',
      title: '',
      html: `Please bear in mind that this is a very early version, meaning it is not feature complete at all.<br />As of now Rockford and Larnaca have radar data.<br />There may however be data missing for some aerodromes.<br /><br />Feel free to take a look at the application and refer to the "Help" text in the top right for further instructions.<br /><br />In addition, do not hesitate to report any issues/suggestions with the text in the menu bar.<br /><br />Thank you for taking your time to check out ATC24-Suite!<br /><br />Maybe share it with fellow ATC24 controllers!`,
      icon: 'info',
    });
  } else {
    notificationQueue.queue({
      title: 'Welcome!',
      html: `Thanks for visiting the ATC24 Suite.<br />Here's an overview of important keybinds for using the Suite as efficiently as possible. You can check them anytime by hovering over "Help" in the top right.<br /><br />• I - Create Inbound Strip<br />• O - Create Outbound Strip<br />• V - Create VFR Strip<br />• X - Delete Strip<br />• C - Cancel Deletion<br /><br />Strips are created where your mouse is and deleting strips will take the strip your mouse is currently hovering.<br /><br />Happy Controlling!<br />- Zedruc`,
      icon: 'info',
    });
  }
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

airportSelect.selectedIndex = 10;

airportSelect.addEventListener('change', changeAirport);
stationSelect.addEventListener('change', changeStation);

executeStationSelectUpdate('rockford', 'Rockford');

// execute setting functions as required
if (Settings.get('loadStripsOnStart')) StripSaveManager.loadFromStorageAndPopulate();
else localStorage.setItem('strips', '{}');
