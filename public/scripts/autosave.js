// save strips in case of accidentally closing or crash
/* let example = {
  del: [
    {
      type: 'i' || 'o' || 'v',
      info: {
        callsign,
        squawk,
        departure,
        aircraft,
        altitude,
        gate,
        arrival,
        status,
        info,
        runway,
        sidstar,
        freeText,
      },
    },
  ],
}; */
let extractInfo = strip => {
  let extract = {
    type: strip.getAttribute('data-type'),
    info: {
      callsign: strip.querySelector('#callsign').value,
      squawk: strip.querySelector('#squawk').value,
      departure: strip.querySelector('#departure').value,
      aircraft: strip.querySelector('#aircraft').value,
      altitude: strip.querySelector('#altitude').value,
      gate: strip.querySelector('#gate').value,
      arrival: strip.querySelector('#arrival').value,
      status: strip.querySelector('#status').value,
      info: strip.querySelector('#info').value,
      runway: strip.querySelector('#runway').value,
      sidstar: strip.querySelector('#sidstar').value,
      freeText: strip.querySelector('#freeText').value,
    },
  };

  return extract;
};

let saveData = data => {
  localStorage.setItem('strips', JSON.stringify(data));
};
class StripSaveManager {
  static add(strip, list) {
    let currentData = JSON.parse(localStorage.getItem('strips') || '{}');
    if (!currentData[list.id]) currentData[list.id] = [];
    currentData[list.id].push(JSON.stringify(extractInfo(strip)));
    saveData(currentData);
  }

  static remove(strip, list) {
    let currentData = JSON.parse(localStorage.getItem('strips') || '{}');
    if (!currentData[list.id]) return;
    let stripToRemoveData = extractInfo(strip);

    for (let i = 0; i < currentData[list.id].length; i++) {
      const dataStrip = JSON.parse(currentData[list.id][i]);
      if (dataStrip.info.squawk == stripToRemoveData.info.squawk) {
        currentData[list.id].splice(i, 1);
      }
    }
    saveData(currentData);
  }

  static nextList(strip, currentList, nextList) {}

  static previousList(strip, currentList, nextList) {
    let currentData = JSON.parse(localStorage.getItem('strips') || '{}');
    if (!currentData[list.id]) return;
    if (!currentData[nextList.id]) currentData[nextList.id] = [];
  }
}
