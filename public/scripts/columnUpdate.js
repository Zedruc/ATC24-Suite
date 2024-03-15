//TODO: Implement columnUpdate function
function columnUpdate(listNameElement) {
  let newId = listNameElement.value;
  let oldId = listNameElement.parentElement.parentElement.id;
  if (document.getElementById(newId)) return;
  listNameElement.parentElement.parentElement.id = newId;

  // rename list in storage
  let localStorageStrips = localStorage.getItem('strips');
  let currentData;
  if (localStorageStrips == undefined || localStorageStrips == 'undefined') currentData = {};
  else currentData = JSON.parse(localStorageStrips);
  if (!currentData[oldId]) {
    // if it doesnt exist, just create list with new id
    currentData[newId] = [];
    localStorage.setItem('strips', JSON.stringify(currentData));
  } else {
    // if it does, copy data to new id and delete old one
    localStorage.setItem(
      'strips',
      JSON.stringify(renameObjKey({ oldObj: currentData, oldKey: oldId, newKey: newId }))
    );
  }

  let storageColumns = localStorage.getItem('columns');
  if (storageColumns == null)
    localStorage.setItem('columns', JSON.stringify(['delivery', 'ground', 'tower', 'app/dep']));
  else {
    storageColumns = JSON.parse(storageColumns);
    let index = storageColumns.indexOf(oldId);
    storageColumns[index] = newId;
    localStorage.setItem('columns', JSON.stringify(storageColumns));
  }

  if (window.room) {
    wsManager.sendMessage({
      type: 'column_change',
      oldId: oldId.toLowerCase(),
      newId: newId.toLowerCase(),
      roomId: window.room,
      origin: localStorage.getItem('discord_id'),
    });
  }
}

const renameObjKey = ({ oldObj, oldKey, newKey }) => {
  const keys = Object.keys(oldObj);
  const newObj = keys.reduce((acc, val) => {
    if (val === oldKey) {
      acc[newKey] = oldObj[oldKey];
    } else {
      acc[val] = oldObj[val];
    }
    return acc;
  }, {});
  delete newObj[oldKey];
  return newObj;
};
