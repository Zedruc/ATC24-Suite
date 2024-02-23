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
      stripId: strip.id,
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
      flightplan: strip.querySelector('#flightplan')?.value.replaceAll('\n', '#') || '',
    },
  };

  return extract;
};

let saveData_moveScripts = (data, stripId, oldListId, newListId) => {
  localStorage.setItem('strips', JSON.stringify(data));
  if (window?.room?.length >= 7) {
    for (let i = 0; i < data[listId].length; i++) {
      const strip = data[listId][i];
      if (strip.info.stripId == stripId) {
        let payload = {
          type: 'strip_move_list',
          stripId: stripId,
          oldListId: oldListId,
          newListId: newListId,
          data: strip,
          deletion: false,
          roomId: window.room,
        };
        wsManager.sendMessage(payload);

        break;
      }
    }
  }
};

// save JSON data as string into localStorage
let saveData = (data, stripId, listId, deletion = false) => {
  localStorage.setItem('strips', JSON.stringify(data));
  // let stripData = 'NOT FOUND';
  if (window?.room?.length >= 7) {
    if (deletion) {
      let payload = {
        type: 'strip_data',
        stripId: stripId,
        listId: listId,
        deletion: true,
        roomId: window.room,
      };
      wsManager.sendMessage(payload);
      return;
    }
    for (let i = 0; i < data[listId].length; i++) {
      const strip = data[listId][i];
      if (strip.info.stripId == stripId) {
        let payload = {
          type: 'strip_data',
          stripId: stripId,
          listId: listId,
          data: strip,
          deletion: false,
          roomId: window.room,
        };
        wsManager.sendMessage(payload);

        // stripData = strip;
        break;
      }
    }
  }
};
class StripSaveManager {
  // add strip to list
  static add(strip, list, shouldSave = true) {
    let currentData = JSON.parse(localStorage.getItem('strips') || '{}');
    if (!currentData[list.id]) currentData[list.id] = [];
    currentData[list.id].push(extractInfo(strip));
    if (shouldSave) {
      saveData(currentData, strip.id, list.id);
    }
  }

  // remove strip from list
  static remove(strip, list, shouldSave = true) {
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
    if (shouldSave) {
      saveData(currentData, strip.id, list.id, true);
    }
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
        this.remove(strip, currentList); /* , false, false */
        this.add(strip, nextList); /* , true, true */
        break;
      }
    }
  }

  static updateStrip(strip, list) {
    let currentData = JSON.parse(localStorage.getItem('strips') || '{}');
    let stripId = strip.id;
    if (!currentData[list.id]) {
      return;
    }
    let stripToUpdateData = extractInfo(strip);
    for (let i = 0; i < currentData[list.id].length; i++) {
      const dataStrip = currentData[list.id][i];
      if (dataStrip.info.stripId == stripId) {
        currentData[list.id][i] = stripToUpdateData;
        break;
      }
    }

    saveData(currentData, strip.id, list.id);
  }

  static loadFromStorageAndPopulate() {
    let stripData = JSON.parse(localStorage.getItem('strips') || {});
    if (Object.keys(stripData).length == 0) return;
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
