function getStripChildren(list) {
  let children = [];
  for (let i = 0; i < list.childNodes.length; i++) {
    const node = list.childNodes[i];
    if (node.className == 'strip') {
      children.push(node);
    }
  }
  return children;
}

const keybinds = [
  {
    key: 'x',
    action: (arrivalListItem, deletionConfirmed) => {
      if (!arrivalListItem) return;
      if (deletionConfirmed) {
        arrivalListItem.remove();
      } else {
        arrivalListItem.dataset.deletionConfirmed = 'true';
      }
    },
  },
  {
    key: 'c',
    action: (arrivalListItem, deletionConfirmed) => {
      if (!arrivalListItem) return;
      if (deletionConfirmed) {
        arrivalListItem.dataset.deletionConfirmed = 'false';
      }
    },
  },
];

document.addEventListener('keypress', e => {
  if (document.activeElement.nodeName == 'INPUT') return;
  let hovered = document.querySelectorAll(':hover');

  let usedKeybind;

  for (const keybind of keybinds) {
    if (keybind.key == e.key.toLowerCase()) {
      usedKeybind = keybind;
    }
  }

  if (!usedKeybind) return;

  switch (usedKeybind.key) {
    case 'x':
    case 'c': {
      let arrivalListItem;
      for (let i = 0; i < hovered.length; i++) {
        const element = hovered[i];
        if (i > 7) break;
        if (element.classList.contains('table-items') && element.id !== 'template-item')
          arrivalListItem = element;
      }
      console.log(arrivalListItem);
      if (!arrivalListItem) return;
      usedKeybind.action(arrivalListItem, arrivalListItem.dataset.deletionConfirmed == 'true');
      break;
    }

    default:
      break;
  }
});
