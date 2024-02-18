let currentYear = new Date().getFullYear();
document.getElementById('copyrightNotice').innerHTML = `&copy; Zedruc ${currentYear}`;

window.appVersion = 'b-1.2.2';
document.getElementById('appVersion').innerText = window.appVersion;

// check if first time visitor
let firstTimeVisit = localStorage.getItem('firstTimeVisit');
if (firstTimeVisit !== 'true') {
  localStorage.setItem('firstTimeVisit', 'true');
  if (window.appVersion.startsWith('b')) {
    swal({
      title: 'Welcome!',
      text: 'Thanks for visiting the ATC24 Suite.\nHere\'s an overview of important keybinds for using the Suite as efficiently as possible. You can check them anytime by hovering over "Help" in the top right.\n\n• I - Create Inbound Strip\n• O - Create Outbound Strip\n• V - Create VFR Strip\n• X - Delete Strip\n• C - Cancel Deletion\n\nStrips are created where your mouse is and deleting strips will take the strip your mouse is currently hovering.\n\nHappy Controlling!\n- Zedruc',
      icon: 'info',
    }).then(_ => {
      swal({
        title: '',
        text: 'Please bear in mind that this is a very early version, meaning it is not feature complete at all.\nAs of now Rockford and Larnaca have radar data.\nThere may however be data missing for some aerodromes.\n\nFeel free to take a look at the application and refer to the "Help" text in the top right for further instructions.\n\nIn addition, do not hesitate to report any issues/suggestions with the text in the menu bar.\n\nThank you for taking your time to check out ATC24-Suite!\n\nMaybe share it with fellow ATC24 controllers!',
        icon: 'info',
      });
    });
  } else {
    swal({
      title: 'Welcome!',
      text: 'Thanks for visiting the ATC24 Suite.\nHere\'s an overview of important keybinds for using the Suite as efficiently as possible. You can check them anytime by hovering over "Help" in the top right.\n\n• I - Create Inbound Strip\n• O - Create Outbound Strip\n• V - Create VFR Strip\n• X - Delete Strip\n• C - Cancel Deletion\n\nStrips are created where your mouse is and deleting strips will take the strip your mouse is currently hovering.\n\nHappy Controlling!\n- Zedruc',
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
