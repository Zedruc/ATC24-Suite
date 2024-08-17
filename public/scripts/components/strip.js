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

const frequencyGroups = {
  'IMLR': { group: 'Rockford', frequency: '124.850' },
  'IGRV': { group: 'Grindavik', frequency: '126.750' },
  'IPAP': { group: 'Cyprus', frequency: '126.300' },
  'IDCS': { group: 'Orenji', frequency: '132.300' },
  'IBAR': { group: 'Cyprus', frequency: '126.300' },
  'IHEN': { group: 'Cyprus', frequency: '126.300' },
  'IBLT': { group: 'Rockford', frequency: '124.850' },
  'ISKP': { group: 'Cyprus', frequency: '126.300' },
  'ITRC': { group: 'Orenji', frequency: '132.300' },
  'ILKL': { group: 'Perth', frequency: '135.250' },
  'ISAU': { group: 'Sauthemptona', frequency: '122.730' },
  'ISCM': { group: 'Cyprus', frequency: '126.300' },
  'IBTH': { group: 'St Barthelemy', frequency: '128.600' },
  'IJAF': { group: 'Izolirani', frequency: '124.640' },
  'IGAR': { group: 'Rockford', frequency: '124.850' },
  'IRFD': { group: 'Rockford', frequency: '124.850' },
  'IPPH': { group: 'Perth', frequency: '135.