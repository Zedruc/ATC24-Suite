let currentYear = new Date().getFullYear();
document.getElementById('copyrightNotice').innerHTML = `&copy; Zedruc ${currentYear}`;

document.getElementById('appVersion').innerText = window.appVersion;

// check if first time visitor
let firstTimeVisit = localStorage.getItem('firstTimeVisit');
if (firstTimeVisit !== 'true') {
  localStorage.setItem('firstTimeVisit', 'true');
  if (window.appVersion.startsWith('b')) {
    notificationQueue.queue({
      title: 'Welcome!',
      html: `Thanks for visiting the ATC24 Suite.<br />Here's an overview of important keybinds for using the Suite as efficiently as possible. You can check them anytime by hovering over "Help" in the top right.<br /><br />• I - Create Inbound Strip<br />• O - Create Outbound Strip<br />• V - Create VFR Strip<br />• X - Delete Strip<br />• C - Cancel Deletion<br /><br />Strips are created where your mouse is and deleting strips will take the strip your mouse is currently hovering.<br /><br />Happy Controlling!<br />- Zedruc`,
      icon: 'info',
    });
    notificationQueue.queue({
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
let arrRunwaySelect = document.getElementById('arr-runway-select');
let depRunwaySelect = document.getElementById('dep-runway-select');

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
