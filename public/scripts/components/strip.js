let squawksInUse = [];
let validDigits = '01234567';
let length = 4;

let stripTypes = ['inbound', 'outbound', 'vfr'];
let stripListTypes = ['del', 'gnd', 'twr', 'app/dep'];

let templateStrip = document.getElementById('templateStrip');

/**
 *
 * @param {string} type Inbound | Outbound | VFR
 * @param {bool} shouldGenerateRandomSquawk
 * @param {string} stripListType Del | Gnd | Twr | App/Dep
 * @returns
 */
function generateStrip(type, shouldGenerateRandomSquawk, stripListType) {
  let newStrip = templateStrip.cloneNode(true);
  newStrip.id = '';
  newStrip.setAttribute('data-type', type);

  if (!stripTypes.includes(type)) return;
  if (!stripListTypes.includes(stripListType)) return;

  if (shouldGenerateRandomSquawk) {
    let squawk = generateSquawk();
    newStrip.querySelector('#squawk').value = squawk;
  }

  if (type !== 'vfr') {
    newStrip.querySelector('#runway').value = runwaySelect.value || '';
    newStrip.querySelector('#departure').value = currentAirport.icao || '';
  }

  newStrip.style.backgroundColor = `var(--${type}-bg)`;
  newStrip.style.border = `2px solid var(--${type}-border)`;

  return newStrip;
}

function generateSquawk() {
  let squawk = '';
  for (let i = 0; i < length; i++) {
    squawk += validDigits[Math.floor(Math.random() * validDigits.length)];
  }
  if (squawksInUse.includes(squawk)) return generateSquawk();
  return squawk;
}
