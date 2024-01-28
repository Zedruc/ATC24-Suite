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
      runwaySpecs: [
        {
          id: '06/24',
          courses: '064/244',
          length: 3355, // feet,
          bottomMiddle: {
            x: 234,
            y: 257,
          },
          ils: true, // whether runway has ils equipped
        },
      ],
      cities: [
        [
          {
            x: 213,
            y: 349.20001220703125,
          },
          {
            x: 222,
            y: 352.20001220703125,
          },
          {
            x: 221,
            y: 344.20001220703125,
          },
          {
            x: 224,
            y: 344.20001220703125,
          },
          {
            x: 225,
            y: 348.20001220703125,
          },
          {
            x: 229,
            y: 342.20001220703125,
          },
          {
            x: 224,
            y: 335.20001220703125,
          },
          {
            x: 221,
            y: 335.20001220703125,
          },
          {
            x: 221,
            y: 339.20001220703125,
          },
          {
            x: 212,
            y: 344.20001220703125,
          },
        ],
        [
          {
            x: 245,
            y: 323,
          },
          {
            x: 252,
            y: 319,
          },
          {
            x: 243,
            y: 305,
          },
          {
            x: 238,
            y: 314,
          },
          {
            x: 239,
            y: 319,
          },
        ],
        [
          {
            x: 264,
            y: 319,
          },
          {
            x: 270,
            y: 318,
          },
          {
            x: 274,
            y: 306,
          },
          {
            x: 270,
            y: 306,
          },
          {
            x: 271,
            y: 302,
          },
          {
            x: 269,
            y: 300,
          },
          {
            x: 272,
            y: 284,
          },
          {
            x: 262,
            y: 279,
          },
          {
            x: 258,
            y: 286,
          },
          {
            x: 253,
            y: 290,
          },
          {
            x: 252,
            y: 298,
          },
          {
            x: 253,
            y: 301,
          },
          {
            x: 259,
            y: 300,
          },
          {
            x: 260,
            y: 308,
          },
          {
            x: 257,
            y: 311,
          },
          {
            x: 263,
            y: 316,
          },
        ],
        [
          {
            x: 347,
            y: 309,
          },
          {
            x: 354,
            y: 314,
          },
          {
            x: 364,
            y: 313,
          },
          {
            x: 370,
            y: 305,
          },
          {
            x: 373,
            y: 298,
          },
          {
            x: 369,
            y: 301,
          },
          {
            x: 362,
            y: 308,
          },
          {
            x: 347,
            y: 309,
          },
        ],
        [
          {
            x: 375,
            y: 255,
          },
          {
            x: 383,
            y: 255,
          },
          {
            x: 379,
            y: 253,
          },
          {
            x: 378,
            y: 248,
          },
          {
            x: 375,
            y: 248,
          },
          {
            x: 378,
            y: 254,
          },
          {
            x: 375,
            y: 253,
          },
        ],
      ],
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
      runwaySpecs: [
        {
          id: '11/29',
          courses: '111/291',
          length: 4375, // feet,
          bottomMiddle: {
            x: 234,
            y: 257,
          },
          ils: true, // whether runway has ils equipped
        },
      ],
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
