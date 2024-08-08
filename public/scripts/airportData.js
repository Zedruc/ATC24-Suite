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
          middle: {
            x: 250.8000030517578,
            y: 247.8000030517578,
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
      terrain: [
        {
          mef: '05',
          points: [
            {
              x: 276,
              y: 304.40000915527344,
            },
            {
              x: 287,
              y: 316.40000915527344,
            },
            {
              x: 296,
              y: 314.40000915527344,
            },
            {
              x: 304,
              y: 307.40000915527344,
            },
            {
              x: 311,
              y: 303.40000915527344,
            },
            {
              x: 303,
              y: 298.40000915527344,
            },
            {
              x: 285,
              y: 291.40000915527344,
            },
            {
              x: 277,
              y: 298.40000915527344,
            },
            {
              x: 275,
              y: 305.40000915527344,
            },
          ],
        },
        {
          mef: '12',
          points: [
            {
              x: 320.4000015258789,
              y: 296.40000915527344,
            },
            {
              x: 338.4000015258789,
              y: 296.40000915527344,
            },
            {
              x: 343.4000015258789,
              y: 289.40000915527344,
            },
            {
              x: 357.4000015258789,
              y: 280.40000915527344,
            },
            {
              x: 362.4000015258789,
              y: 266.40000915527344,
            },
            {
              x: 361.4000015258789,
              y: 254.40000915527344,
            },
            {
              x: 354.4000015258789,
              y: 247.40000915527344,
            },
            {
              x: 352.4000015258789,
              y: 234.40000915527344,
            },
            {
              x: 325.4000015258789,
              y: 219.40000915527344,
            },
            {
              x: 314.4000015258789,
              y: 223.40000915527344,
            },
            {
              x: 321.4000015258789,
              y: 235.40000915527344,
            },
            {
              x: 326.4000015258789,
              y: 236.40000915527344,
            },
            {
              x: 327.4000015258789,
              y: 243.40000915527344,
            },
            {
              x: 323.4000015258789,
              y: 250.40000915527344,
            },
            {
              x: 318.4000015258789,
              y: 252.40000915527344,
            },
            {
              x: 292.4000015258789,
              y: 235.40000915527344,
            },
            {
              x: 285.4000015258789,
              y: 234.40000915527344,
            },
            {
              x: 277.4000015258789,
              y: 235.40000915527344,
            },
            {
              x: 271.4000015258789,
              y: 238.40000915527344,
            },
            {
              x: 265.4000015258789,
              y: 245.40000915527344,
            },
            {
              x: 261.4000015258789,
              y: 251.40000915527344,
            },
            {
              x: 260.4000015258789,
              y: 256.40000915527344,
            },
            {
              x: 262.4000015258789,
              y: 263.40000915527344,
            },
            {
              x: 271.4000015258789,
              y: 264.40000915527344,
            },
            {
              x: 276.4000015258789,
              y: 269.40000915527344,
            },
            {
              x: 287.4000015258789,
              y: 276.40000915527344,
            },
            {
              x: 293.4000015258789,
              y: 277.40000915527344,
            },
          ],
        },
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
      runwaySpecs: [
        {
          id: '17/35',
          courses: '174/354',
          length: 3404, // feet,
          middle: {
            x: 250,
            y: 250,
          },
          ils: true, // whether runway has ils equipped
        },
      ],
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
      runwaySpecs: [
        {
          id: '06/24',
          courses: '062/242',
          length: 2392, // feet,
          middle: {
            x: 250,
            y: 250,
          },
          ils: true, // whether runway has ils equipped
        },
      ],
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
      runwaySpecs: [
        {
          id: '10/28',
          courses: '106/286',
          length: 4375, // feet,
          middle: {
            x: 251.4000015258789,
            y: 260,
          },
          ils: true, // whether runway has ils equipped
        },
      ],
      cities: [
        [
          {
            x: 163.4000015258789,
            y: 236,
          },
          {
            x: 166.4000015258789,
            y: 216,
          },
          {
            x: 161.4000015258789,
            y: 216,
          },
          {
            x: 160.4000015258789,
            y: 210,
          },
          {
            x: 156.4000015258789,
            y: 210,
          },
          {
            x: 156.4000015258789,
            y: 212,
          },
          {
            x: 140.4000015258789,
            y: 212,
          },
          {
            x: 142.4000015258789,
            y: 222,
          },
          {
            x: 153.4000015258789,
            y: 225,
          },
          {
            x: 155.4000015258789,
            y: 230,
          },
          {
            x: 160.4000015258789,
            y: 237,
          },
        ],
        [
          {
            x: 243.4000015258789,
            y: 242,
          },
          {
            x: 239.4000015258789,
            y: 234,
          },
          {
            x: 236.4000015258789,
            y: 235,
          },
          {
            x: 234.4000015258789,
            y: 244,
          },
        ],
      ],
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
      runwaySpecs: [
        {
          id: '07/25',
          courses: '071/251',
          length: 2278, // feet,
          middle: {
            x: 250,
            y: 250,
          },
          ils: false, // whether runway has ils equipped
        },
      ],
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
      runwaySpecs: [
        {
          id: '13/31',
          courses: '127/307',
          length: 4850, // feet,
          middle: {
            x: 236.2000045776367,
            y: 218,
          },
          ils: true, // whether runway has ils equipped
        },
        {
          id: '02/20',
          courses: '020/200',
          length: 3754, // feet,
          middle: {
            x: 280,
            y: 254,
          },
          ils: true, // whether runway has ils equipped
        },
      ],
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
      runwaySpecs: [
        {
          id: '07/25',
          courses: '071/251',
          length: 1750, // feet @NOTE: Saba lengthened by 1000' so it isnt just a square on the radar,
          middle: {
            x: 250,
            y: 250,
          },
          ils: false, // whether runway has ils equipped
        },
      ],
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
          middle: {
            x: 251.4000015258789,
            y: 245,
          },
          ils: true, // whether runway has ils equipped
        },
        {
          id: '15/33',
          courses: '151/331',
          length: 3355, // feet,
          middle: {
            x: 246.4000015258789,
            y: 253,
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
      runwaySpecs: [
        {
          id: '09/27',
          courses: '089/269',
          length: 1303, // feet,
          middle: {
            x: 250,
            y: 250,
          },
          ils: false, // whether runway has ils equipped
        },
      ],
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
      runwaySpecs: [
        {
          id: '18R/36L',
          courses: '180/360',
          length: 3535, // feet,
          middle: {
            x: 236.4000015258789,
            y: 235,
          },
          ils: true, // whether runway has ils equipped
        },
        {
          id: '18L/36R',
          courses: '180/360',
          length: 3000, // feet,
          middle: {
            x: 247.4000015258789,
            y: 229,
          },
          ils: true, // whether runway has ils equipped
        },
      ],
      cities: [
        [
          {
            x: 236.5,
            y: 346.25,
          },
          {
            x: 240.5,
            y: 343.25,
          },
          {
            x: 234.5,
            y: 338.25,
          },
          {
            x: 231.5,
            y: 339.25,
          },
        ],
        [
          {
            x: 228.5,
            y: 317.25,
          },
          {
            x: 231.5,
            y: 317.25,
          },
          {
            x: 230.5,
            y: 309.25,
          },
          {
            x: 228.5,
            y: 308.25,
          },
          {
            x: 230.5,
            y: 305.25,
          },
          {
            x: 226.5,
            y: 300.25,
          },
          {
            x: 224.5,
            y: 301.25,
          },
          {
            x: 222.5,
            y: 300.25,
          },
          {
            x: 219.5,
            y: 302.25,
          },
          {
            x: 224.5,
            y: 308.25,
          },
          {
            x: 223.5,
            y: 310.25,
          },
          {
            x: 228.5,
            y: 310.25,
          },
          {
            x: 228.5,
            y: 317.25,
          },
        ],
        [
          {
            x: 216.5,
            y: 252.25,
          },
          {
            x: 220.5,
            y: 248.25,
          },
          {
            x: 220.5,
            y: 235.25,
          },
          {
            x: 215.5,
            y: 237.25,
          },
          {
            x: 211.5,
            y: 235.25,
          },
          {
            x: 201.5,
            y: 242.25,
          },
          {
            x: 205.5,
            y: 251.25,
          },
          {
            x: 212.5,
            y: 250.25,
          },
        ],
      ],
      terrain: [
        {
          mef: '08',
          points: [
            {
              x: 299.5999984741211,
              y: 389,
            },
            {
              x: 314.5999984741211,
              y: 387,
            },
            {
              x: 317.5999984741211,
              y: 353,
            },
            {
              x: 308.5999984741211,
              y: 324,
            },
            {
              x: 298.5999984741211,
              y: 306,
            },
            {
              x: 268.5999984741211,
              y: 295,
            },
            {
              x: 248.5999984741211,
              y: 296,
            },
            {
              x: 234.5999984741211,
              y: 314,
            },
            {
              x: 263.5999984741211,
              y: 373,
            },
          ],
        },
        {
          mef: '06',
          points: [
            {
              x: 190.5999984741211,
              y: 161,
            },
            {
              x: 191.5999984741211,
              y: 200,
            },
            {
              x: 193.5999984741211,
              y: 204,
            },
            {
              x: 211.5999984741211,
              y: 185,
            },
            {
              x: 213.5999984741211,
              y: 176,
            },
            {
              x: 202.5999984741211,
              y: 171,
            },
            {
              x: 197.5999984741211,
              y: 157,
            },
          ],
        },
        {
          mef: '06',
          points: [
            {
              x: 280.5999984741211,
              y: 176,
            },
            {
              x: 274.5999984741211,
              y: 180,
            },
            {
              x: 275.5999984741211,
              y: 187,
            },
            {
              x: 276.5999984741211,
              y: 189,
            },
            {
              x: 277.5999984741211,
              y: 190,
            },
            {
              x: 278.5999984741211,
              y: 191,
            },
            {
              x: 280.5999984741211,
              y: 192,
            },
            {
              x: 282.5999984741211,
              y: 193,
            },
            {
              x: 284.5999984741211,
              y: 193,
            },
            {
              x: 286.5999984741211,
              y: 193,
            },
            {
              x: 288.5999984741211,
              y: 193,
            },
            {
              x: 289.5999984741211,
              y: 192,
            },
            {
              x: 290.5999984741211,
              y: 191,
            },
            {
              x: 290.5999984741211,
              y: 191,
            },
            {
              x: 291.5999984741211,
              y: 190,
            },
            {
              x: 292.5999984741211,
              y: 189,
            },
            {
              x: 292.5999984741211,
              y: 188,
            },
            {
              x: 292.5999984741211,
              y: 186,
            },
            {
              x: 292.5999984741211,
              y: 186,
            },
            {
              x: 291.5999984741211,
              y: 184,
            },
            {
              x: 291.5999984741211,
              y: 183,
            },
            {
              x: 289.5999984741211,
              y: 182,
            },
            {
              x: 289.5999984741211,
              y: 181,
            },
            {
              x: 287.5999984741211,
              y: 181,
            },
            {
              x: 286.5999984741211,
              y: 180,
            },
            {
              x: 285.5999984741211,
              y: 179,
            },
            {
              x: 284.5999984741211,
              y: 179,
            },
            {
              x: 283.5999984741211,
              y: 178,
            },
          ],
        },
      ],
    },
    {
      name: 'Mellor',
      icao: 'IMLR',
      iata: 'MEL',
      stations: [
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
      runwaySpecs: [
        {
          id: '11/29',
          courses: '110/290',
          length: 2997, // feet,
          middle: {
            x: 250,
            y: 250,
          },
          ils: true, // whether runway has ils equipped
        },
      ],
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
      runwaySpecs: [
        {
          id: '09/27',
          courses: '090/270',
          length: 1547, // feet,
          middle: {
            x: 250,
            y: 250,
          },
          ils: false, // whether runway has ils equipped
        },
      ],
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
      runwaySpecs: [
        {
          id: '08/26',
          courses: '081/261',
          length: 2554, // feet,
          middle: {
            x: 250,
            y: 250,
          },
          ils: true, // whether runway has ils equipped
        },
      ],
    },
  ],
};
