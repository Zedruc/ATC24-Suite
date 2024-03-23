// let templateList = document.getElementById('templateList');
function populateColumns() {
  let columns = JSON.parse(localStorage.getItem('columns'));
  let stripContainer = document.querySelector('.stripContainer');
  while (stripContainer.firstChild) {
    stripContainer.removeChild(stripContainer.lastChild);
  }
  for (let i = 0; i < columns.length; i++) {
    const columnName = columns[i];
    let list = templateList.cloneNode(true);
    list.id = columnName;
    list.querySelector('#listNameInput').value = columnName;
    stripContainer.appendChild(list);
  }
}
