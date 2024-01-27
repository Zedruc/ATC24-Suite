const airports = {
  cyprus: [
    {
      name: 'Larnaca',
      icao: 'ILAR',
      iata: 'LCA',
      stations: [
        {
          type: 'DEP',
          frequency: '130.200',
        },
        {
          type: 'TWR',
          frequency: '121.200',
        },
        {
          type: 'GND',
          frequency: '119.400',
        },
        {
          type: 'DEL',
          frequency: '120.575',
        },
      ],
      runways: ['06', '24'],
    },
    {
      name: 'Paphos',
      icao: 'IPAP',
      iata: 'PFO',
      stations: [
        {
          type: 'DEP',
          frequency: '130.635',
        },
        {
          type: 'TWR',
          frequency: '119.900',
        },
        {
          type: 'GND',
          frequency: '120.800',
        },
      ],
      runways: ['35', '17'],
    },
    {
      name: 'Barra',
      icao: 'IBAR',
      iata: 'BRR',
      stations: [
        {
          type: 'INFO',
          frequency: '118.080',
        },
      ],
      runways: ['SAND'],
    },
  ],
  grindavik: [
    {
      name: 'Grindavik',
      icao: 'IGRV',
      iata: 'GVK',
      stations: [
        {
          type: 'DEP',
          frequency: '119.300',
        },
        {
          type: 'TWR',
          frequency: '118.300',
        },
        {
          type: 'GND',
          frequency: '121.900',
        },
      ],
      runways: ['06', '24'],
    },
  ],
  izolirani: [
    {
      name: 'Izolirani',
      icao: 'IZOL',
      iata: 'IZO',
      stations: [
        {
          type: 'DEP',
          frequency: '124.300',
        },
        {
          type: 'TWR',
          frequency: '118.700',
        },
        {
          type: 'GND',
          frequency: '121.900',
        },
        {
          type: 'DEL',
          frequency: '128.200',
        },
      ],
      runways: ['28', '10'],
    },
    {
      name: 'Najaf',
      icao: 'IJAF',
      iata: 'NJF',
      stations: [
        {
          type: 'APP',
          frequency: '120.200',
        },
        {
          type: 'TWR',
          frequency: '119.100',
        },
        {
          type: 'GND',
          frequency: '121.700',
        },
      ],
      runways: ['07', '25'],
    },
  ],
  orenji: [
    {
      name: 'Tokyo',
      icao: 'ITKO',
      iata: 'HND',
      stations: [
        {
          type: 'DEP',
          frequency: '119.100',
        },
        {
          type: 'TWR',
          frequency: '118.800',
        },
        {
          type: 'GND',
          frequency: '118.225',
        },
        {
          type: 'DEL',
          frequency: '121.825',
        },
      ],
      runways: ['31', '13', '02', '20'],
    },
    {
      name: 'Saba',
      icao: 'IDCS',
      iata: 'SAB',
      stations: [
        {
          type: 'INFO',
          frequency: '118.250',
        },
      ],
      runways: ['07', '25'],
    },
  ],
  perth: [
    {
      name: 'Perth',
      icao: 'IPPH',
      iata: 'PER',
      stations: [
        {
          type: 'DEP',
          frequency: '118.700',
        },
        {
          type: 'TWR',
          frequency: '127.400',
        },
        {
          type: 'GND',
          frequency: '121.700',
        },
        {
          type: 'DEL',
          frequency: '118.550',
        },
      ],
      runways: ['11', '29', '15', '33'],
    },
    {
      name: 'Lukla',
      icao: 'ILKL',
      iata: 'LUA',
      stations: [
        {
          type: 'INFO',
          frequency: '120.150',
        },
      ],
      runways: ['09', '27'],
    },
  ],
  rockford: [
    {
      name: 'Rockford',
      icao: 'IRFD',
      iata: 'RFD',
      stations: [
        {
          type: 'DEP',
          frequency: '121.000',
        },
        {
          type: 'TWR',
          frequency: '118.100',
        },
        {
          type: 'GND',
          frequency: '120.400',
        },
        {
          type: 'DEL',
          frequency: '128.400',
        },
      ],
      runways: ['18R', '18L', '36R', '36L'],
    },
    {
      name: 'Mellor',
      icao: 'IMLR',
      iata: 'MEL',
      stations: [
        {
          type: 'CTR',
          frequency: '125.650',
        },
        {
          type: 'TWR',
          frequency: '133.850',
        },
        {
          type: 'DEL',
          frequency: '121.930',
        },
      ],
      runways: ['29', '11'],
    },
  ],
  'saint barthelemy': [
    {
      name: 'Saint Barthélemy Airport',
      icao: 'IBTH',
      iata: 'SBH',
      stations: [
        {
          type: 'INFO',
          frequency: '118.450',
        },
      ],
      runways: ['27', '09'],
    },
  ],
  sauthemptona: [
    {
      name: 'Sauthemptona',
      icao: 'ISAU',
      iata: 'SAU',
      stations: [
        {
          type: 'CTR',
          frequency: '122.730',
        },
        {
          type: 'TWR',
          frequency: '118.205',
        },
        {
          type: 'GND',
          frequency: '130.880',
        },
      ],
      runways: ['08', '26'],
    },
  ],
};

let currentYear = new Date().getFullYear();
document.getElementById('copyrightNotice').innerHTML = `&copy; Zedruc ${currentYear}`;

// check if first time visitor
console.log('checking first');
let firstTimeVisit = localStorage.getItem('firstTimeVisit');
console.log(firstTimeVisit);
if (firstTimeVisit !== 'true') {
  localStorage.setItem('firstTimeVisit', 'true');
  swal({
    title: 'Welcome!',
    text: 'Thanks for visiting the ATC24 Suite.\nHere\'s an overview of important keybinds for using the Suite as efficiently as possible. You can check them anytime by hovering over "Help" in the top right.\n\n• I - Create Inbound Strip\n• O - Create Outbound Strip\n• V - Create VFR Strip\n• X - Delete Strip\n• C - Cancel Deletion\n\nStrips are created where your mouse is and deleting strips will take the strip your mouse is currently hovering.\n\nHappy Controlling!\n- Zedruc',
    icon: 'info',
  });
}

let airportSelect = document.getElementById('airport-select');
let stationSelect = document.getElementById('station-select');
let runwaySelect = document.getElementById('runway-select');

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
