function columnUpdate(listNameElement) {
  let newId = listNameElement.value.toUpperCase();
  console.log(newId);
  let oldId = listNameElement.parentElement.parentElement.id.toUpperCase();
  console.log(oldId);
  if(oldId.toUpperCase() == newId.toUpperCase()) return;
  if (document.getElementById(newId)) {
    listNameElement.value = oldId; // Keep old name to not desync

    Toastify({
      text: `Cannot have two lists with same name.`,
      duration: 5000,
      newWindow: true,
      close: true,
      gravity: 'bottom', // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
    }).showToast();

    return;
  };
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
    localStorage.setItem('columns', JSON.stringify(['DELIVERY', 'GROUND', 'TOWER', 'APP/DEP']));
  else {
    storageColumns = JSON.parse(storageColumns);
    let index = storageColumns.indexOf(oldId);
    storageColumns[index] = newId;
    localStorage.setItem('columns', JSON.stringify(storageColumns));
  }

  if (window.room) {
    wsManager.sendMessage({
      type: 'column_change',
      oldId: oldId.toUpperCase(),
      newId: newId.toUpperCase(),
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
