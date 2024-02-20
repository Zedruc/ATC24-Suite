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

// extract info from strip
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
      notes: strip.querySelector('#notes').value,
      route: strip.querySelector('#route').value,
      flightplan: strip.querySelector('#flightplan').value,
    },
  };

  return extract;
};

// save JSON data as string into localStorage
let saveData = data => {
  localStorage.setItem('strips', JSON.stringify(data));
};
class StripSaveManager {
  // add strip to list
  static add(strip, list) {
    let currentData = JSON.parse(localStorage.getItem('strips') || '{}');
    if (!currentData[list.id]) currentData[list.id] = [];
    currentData[list.id].push(extractInfo(strip));
    saveData(currentData);
  }

  // remove strip from list
  static remove(strip, list) {
    let currentData = JSON.parse(localStorage.getItem('strips') || '{}');
    if (!currentData[list.id]) return;
    let stripToRemoveData = extractInfo(strip);
    for (let i = 0; i < currentData[list.id].length; i++) {
      // const dataStrip = JSON.parse(currentData[list.id][i]);
      const dataStrip = currentData[list.id][i];
      if (dataStrip.info.squawk == stripToRemoveData.info.squawk) {
        currentData[list.id].splice(i, 1);
        break;
      } else if (dataStrip.info.callsign == stripToRemoveData.info.callsign) {
        currentData[list.id].splice(i, 1);
        break;
      }
    }
    saveData(currentData);
  }

  // move strip from currentList into the nextList
  static moveBetweenLists(strip, currentList, nextList) {
    let currentData = JSON.parse(localStorage.getItem('strips') || '{}');
    if (!currentData[currentList.id]) return;
    if (!currentData[nextList.id]) currentData[nextList.id] = [];

    // loop until we find strip with correct callsign
    let stripToMove;
    for (const stripToCheck of currentData[currentList.id]) {
      if (stripToCheck.callsign == strip.callsign) {
        stripToMove = stripToCheck;
        this.remove(strip, currentList);
        this.add(strip, nextList);
        break;
      }
    }
  }

  static updateStrip(strip, list) {
    let currentData = JSON.parse(localStorage.getItem('strips') || '{}');
    if (!currentData[list.id]) {
      return;
    }
    let stripToUpdateData = extractInfo(strip);
    for (let i = 0; i < currentData[list.id].length; i++) {
      const dataStrip = currentData[list.id][i];
      if (dataStrip.info.squawk == stripToUpdateData.info.squawk) {
        currentData[list.id][i] = stripToUpdateData;
        break;
      } else if (dataStrip.info.callsign == stripToUpdateData.info.callsign) {
        currentData[list.id][i] = stripToUpdateData;
        break;
      }
    }
    saveData(currentData);
  }

  static loadFromStorageAndPopulate() {
    let stripData = JSON.parse(localStorage.getItem('strips') || '{}');
    for (const listId in stripData) {
      let listData = stripData[listId];
      let listElement = document.getElementById(listId);

      for (const strip of listData) {
        listElement.appendChild(generatePrepopulatedStrip(strip));
      }
    }
  }

  // move strip from currentList into the list before
  /* static previousList(strip, currentList, nextList) {
    let currentData = JSON.parse(localStorage.getItem('strips') || '{}');
    if (!currentData[currentList.id]) return;
    if (!currentData[nextList.id]) currentData[nextList.id] = [];

    // loop until we find strip with correct callsign
    let stripToMove;
    for (const stripToCheck of currentData[currentList.id]) {
      if (stripToCheck.callsign == strip.callsign) {
        stripToMove = stripToCheck;
        this.remove(stripToCheck, currentList);
        this.add(stripToMove, nextList);
        break;
      }
    }
  } */
}
