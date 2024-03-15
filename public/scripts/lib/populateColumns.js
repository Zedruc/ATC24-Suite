// let templateList = document.getElementById('templateList');
function populateColumns() {
  let columns = JSON.parse(localStorage.getItem('columns'));
  let stripContainer = document.querySelector('.stripContainer');
  if (stripContainer.childNodes.length > 0) {
    console.log('removing');
    stripContainer.childNodes.forEach(e => {
      if (e.nodeName == 'DIV') e.remove();
    });
  }
  for (let i = 0; i < columns.length; i++) {
    const columnName = columns[i];
    let list = templateList.cloneNode(true);
    list.id = columnName;
    list.querySelector('#listNameInput').value = columnName;
    stripContainer.appendChild(list);
  }
}
