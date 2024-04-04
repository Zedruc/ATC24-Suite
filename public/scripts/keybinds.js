// const stations = ['del', 'gnd', 'twr', 'app/dep'];
let listIndex = 0; // to keep created list's names unique
let templateList = document.getElementById('templateList');

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

/**
 *
 * @param {HTMLElement} strip
 * @param {HTMLElement} list
 */
function insertAsFirstChild(strip, list) {
  console.log(getStripChildren(list));
  let stripChildren = getStripChildren(list);

  if (stripChildren.length < 1) {
    list.appendChild(strip);
    return;
  }
  let childrenArray = [...list.childNodes];

  let index = childrenArray.indexOf(stripChildren[0]);

  let toInsertBefore = list.childNodes[index];
  list.insertBefore(strip, toInsertBefore);
}

const keybinds = [
  {
    key: 'x',
    action: (strip, deletionConfirmed, list) => {
      if (!strip) return;
      if (deletionConfirmed == 'true') {
        StripSaveManager.remove(strip, list);
        strip.remove();
      } else {
        strip.setAttribute('data-deletion-confirmed', 'true');
      }
    },
    data: 'data-deletion-confirmed',
  },
  {
    key: 'i',
    /**
     *
     * @param {HTMLElement} list
     */
    action: list => {
      let newStrip = generateStrip('inbound', true, list.id);
      // list.appendChild(newStrip);
      // list.prepend(newStrip);
      insertAsFirstChild(newStrip, list);
      StripSaveManager.add(newStrip, list);
    },
  },
  {
    key: 'o',
    action: list => {
      let newStrip = generateStrip('outbound', true, list.id);
      // list.appendChild(newStrip);
      // list.prepend(newStrip);
      insertAsFirstChild(newStrip, list);
      StripSaveManager.add(newStrip, list);
    },
  },
  {
    key: 'v',
    action: list => {
      console.log(list);
      let newStrip = generateStrip('vfr', false, list.id);
      // list.appendChild(newStrip);
      // list.prepend(newStrip);
      insertAsFirstChild(newStrip, list);
      StripSaveManager.add(newStrip, list);
    },
  },
  {
    key: 'c',
    action: (strip, deletionConfirmed) => {
      if (!strip) return;
      if (deletionConfirmed == 'true') {
        strip.setAttribute('data-deletion-confirmed', 'false');
      }
    },
    data: 'data-deletion-confirmed',
  },
  {
    key: 'd',
    action: (list, strip) => {
      let stripContainer = document.querySelector('.stripContainer');
      console.log(stripContainer);
      stripContainer.childNodes.forEach(el => {
        if (el.nodeName !== 'DIV') {
          el.remove();
        }
      });
      let stations = [...stripContainer.childNodes];
      let nextStripListIndex = stations.indexOf(document.getElementById(list.id)) + 1;
      if (nextStripListIndex > stations.length - 1) return;
      let nextStripList = document.getElementById(stations[nextStripListIndex].id);
      let stripClone = strip.cloneNode(true);

      stripClone.querySelectorAll('.textInput').forEach(input => {
        if (input.getAttribute('data-fp')) input.value = input.getAttribute('data-fp');
        // if (input?.id == 'flightplan') return;
        self = input;
        input.removeEventListener('focusout', focusOutEvent);
        input.addEventListener('focusout', focusOutEvent);
      });

      strip.remove();
      // nextStripList.appendChild(stripClone);
      // nextStripList.prepend(stripClone);
      insertAsFirstChild(stripClone, nextStripList);
      StripSaveManager.moveBetweenLists(strip, list, nextStripList);
    },
  },
  {
    key: 'a',
    action: (list, strip) => {
      let stripContainer = document.querySelector('.stripContainer');
      console.log(stripContainer);
      stripContainer.childNodes.forEach(el => {
        if (el.nodeName !== 'DIV') {
          el.remove();
        }
      });
      let stations = [...stripContainer.childNodes];
      let nextStripListIndex = stations.indexOf(document.getElementById(list.id)) - 1;
      if (nextStripListIndex < 0) return;
      let nextStripList = document.getElementById(stations[nextStripListIndex].id);
      let stripClone = strip.cloneNode(true);

      stripClone.querySelectorAll('.textInput').forEach(input => {
        if (input.getAttribute('data-fp')) input.value = input.getAttribute('data-fp');
        // if (input?.id == 'flightplan') return;
        self = input;
        input.removeEventListener('focusout', focusOutEvent);
        input.addEventListener('focusout', focusOutEvent);
      });

      strip.remove();
      // nextStripList.appendChild(stripClone);
      // nextStripList.prepend(stripClone);
      insertAsFirstChild(stripClone, nextStripList);

      StripSaveManager.moveBetweenLists(strip, list, nextStripList);
    },
  },
  {
    key: 'w',
    action: (list, strip) => {
      let listChildren = list.childNodes;
      let stripChildren = [];
      let skipped = 0;
      listChildren.forEach(el => {
        if (el?.id == 'templateStrip') return skipped++;
        if (el?.classList?.contains('strip')) {
          stripChildren.push(el);
        } else skipped++;
      });

      let stripClone = strip.cloneNode(true);
      stripClone.querySelectorAll('.textInput').forEach(input => {
        if (input.getAttribute('data-fp')) input.value = input.getAttribute('data-fp');
        // if (input?.id == 'flightplan') return;
        self = input;
        input.removeEventListener('focusout', focusOutEvent);
        input.addEventListener('focusout', focusOutEvent);
      });

      if (stripChildren.indexOf(strip) - 1 < 0) return;

      // if (list.childNodes[currentIndex - 1].id == 'listName') return;
      // if (currentIndex < 2) return;

      list.insertBefore(stripClone, list.childNodes[[...list.childNodes].indexOf(strip) - 1]);
      strip.remove();

      // list.childNodes = moveInArray([...list.childNodes], currentIndex, newIndex);
    },
  },
  {
    key: 's',
    action: (list, strip, wsAction = false) => {
      if ([...list.childNodes].indexOf(strip) == list.childNodes.length - 1) return;

      let listChildren = list.childNodes;
      let stripChildren = [];
      let skipped = 0;
      listChildren.forEach(el => {
        if (el?.id == 'templateStrip') return skipped++;
        if (el?.classList?.contains('strip')) {
          stripChildren.push(el);
        } else skipped++;
      });

      let stripClone = strip.cloneNode(true);

      stripClone.querySelectorAll('.textInput').forEach(input => {
        if (input.getAttribute('data-fp')) input.value = input.getAttribute('data-fp');
        // if (input?.id == 'flightplan') return;
        self = input;
        input.removeEventListener('focusout', focusOutEvent);
        input.addEventListener('focusout', focusOutEvent);
      });

      if (stripChildren.indexOf(strip) + 1 > stripChildren.length) return;

      // if (list.childNodes[currentIndex - 1].id == 'listName') return;
      // if (currentIndex < 2) return;

      // list.insertBefore(stripClone, list.childNodes[[...list.childNodes].indexOf(strip) + 1]);
      let index = [...list.childNodes].indexOf(strip) + 2;
      if (index > list.childNodes.length) {
        // list.appendChild(stripClone);
        list.prepend(stripClone);
      } else {
        list.insertBefore(stripClone, list.childNodes[index]);
      }
      strip.remove();

      // list.childNodes = moveInArray([...list.childNodes], currentIndex, newIndex);
    },
  },
  {
    key: 'l',
    action: (wsAction = false, listId) => {
      let newList = templateList.cloneNode(true);
      let placeholderName = wsAction ? listId : `new list ${++listIndex}`;
      newList.id = placeholderName;
      newList.querySelector('#listNameInput').value = placeholderName;
      console.log(newList);

      document.querySelector('.stripContainer').appendChild(newList);

      let storageColumns = localStorage.getItem('columns');
      if (storageColumns == null)
        localStorage.setItem('columns', JSON.stringify(['delivery', 'ground', 'tower', 'app/dep']));
      else {
        storageColumns = JSON.parse(storageColumns);
        storageColumns.push(newList.id);
        localStorage.setItem('columns', JSON.stringify(storageColumns));
      }

      if (!wsAction && window.room) {
        wsManager.sendMessage({
          type: MessageTypes.COLUMN_CREATE,
          listId: newList.id,
          origin: localStorage.getItem('discord_id'),
          roomId: window.room,
        });
      }
    },
  },
  {
    key: 'b',
    action: (list, deletionConfirmed, wsAction = false) => {
      console.log(deletionConfirmed);
      if (deletionConfirmed !== 'true') {
        if (wsAction == false) {
          list.setAttribute('data-deletion-confirmed', 'true');
          return;
        }
      }
      let listId = list.id;
      list.remove();
      listIndex--;

      let storageColumns = localStorage.getItem('columns');
      if (storageColumns == null)
        localStorage.setItem('columns', JSON.stringify(['delivery', 'ground', 'tower', 'app/dep']));
      else {
        storageColumns = JSON.parse(storageColumns);
        let index = storageColumns.indexOf(list.id);
        storageColumns.splice(index, 1);
        localStorage.setItem('columns', JSON.stringify(storageColumns));
      }

      if (!wsAction && window.room) {
        wsManager.sendMessage({
          type: MessageTypes.COLUMN_DELETE,
          listId: listId,
          origin: localStorage.getItem('discord_id'),
          roomId: window.room,
        });
      }
    },
  },
  {
    key: 'e',
    action: strip => {
      let statusField = strip.querySelector('#status');
      let currentStatus = statusField.value;
      let stripType = strip.getAttribute('data-type');
      let possibleStatuses = stripStatuses[stripType];
      let nextStatusIndex = possibleStatuses.indexOf(currentStatus) + 1;
      if (nextStatusIndex > possibleStatuses.length - 1)
        nextStatusIndex = possibleStatuses.length - 1;

      statusField.value = possibleStatuses[nextStatusIndex];

      StripSaveManager.updateStrip(strip, strip.parentElement);
    },
  },
  {
    key: 'q',
    action: strip => {
      let statusField = strip.querySelector('#status');
      let currentStatus = statusField.value;
      let stripType = strip.getAttribute('data-type');
      let possibleStatuses = stripStatuses[stripType];
      let nextStatusIndex = possibleStatuses.indexOf(currentStatus) - 1;
      if (nextStatusIndex < 0) nextStatusIndex = 0;

      statusField.value = possibleStatuses[nextStatusIndex];

      StripSaveManager.updateStrip(strip, strip.parentElement);
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
      let list;
      for (let i = 0; i < hovered.length; i++) {
        const element = hovered[i];
        if (i > 7) break;
        if (element.classList.contains('stripList')) list = element;
      }
      if (!list) return;
      let strip;
      for (let i = 0; i < hovered.length; i++) {
        const element = hovered[i];
        if (i > 6) break;
        if (element.classList.contains('strip')) strip = element;
      }
      if (!strip) {
        if (usedKeybind.key == 'c') {
          // if not strip then try list deletion cancel
          usedKeybind.action(list, list.getAttribute('data-deletion-confirmed'), list);
          return;
        } else return;
      }
      usedKeybind.action(strip, strip.getAttribute('data-deletion-confirmed'), list);
      break;
    }

    case 'i':
    case 'o':
    case 'v': {
      let list;
      for (let i = 0; i < hovered.length; i++) {
        const element = hovered[i];
        if (i > 7) break;
        if (element.classList.contains('stripList')) list = element;
      }
      if (!list) return;
      usedKeybind.action(list);
      break;
    }

    case 'd':
    case 'a': {
      let strip;
      for (let i = 0; i < hovered.length; i++) {
        const element = hovered[i];
        if (i > 6) break;
        if (element.classList.contains('strip')) strip = element;
      }
      if (!strip) return;
      let list;
      for (let i = 0; i < hovered.length; i++) {
        const element = hovered[i];
        if (i > 7) break;
        if (element.classList.contains('stripList')) list = element;
      }
      if (!strip) return;

      usedKeybind.action(list, strip);
      break;
    }

    case 'w':
    case 's': {
      let strip;
      for (let i = 0; i < hovered.length; i++) {
        const element = hovered[i];
        if (i > 6) break;
        if (element.classList.contains('strip')) strip = element;
      }
      if (!strip) return;
      let list;
      for (let i = 0; i < hovered.length; i++) {
        const element = hovered[i];
        if (i > 7) break;
        if (element.classList.contains('stripList')) list = element;
      }
      if (!strip) return;

      usedKeybind.action(list, strip);
      if (window?.room) {
        let payload = {
          id: localStorage.getItem('discord_id'),
          type: 'strip_move',
          stripId: strip.id,
          listId: list.id,
          roomId: window.room,
        };
        if (usedKeybind.key.toLowerCase() == 'w') {
          payload.direction = 'up';
          wsManager.sendMessage(payload);
        } else if (usedKeybind.key.toLowerCase() == 's') {
          payload.direction = 'down';
          wsManager.sendMessage(payload);
        }
      }
      break;
    }

    case 'l': {
      usedKeybind.action();
      break;
    }

    case 'b': {
      let list;
      for (let i = 0; i < hovered.length; i++) {
        const element = hovered[i];
        if (i > 7) break;
        if (element.classList.contains('stripList')) list = element;
      }
      if (!list) return;
      usedKeybind.action(list, list.getAttribute('data-deletion-confirmed'));
      break;
    }

    case 'e': {
      let strip;
      for (let i = 0; i < hovered.length; i++) {
        const element = hovered[i];
        if (i > 6) break;
        if (element.classList.contains('strip')) strip = element;
      }
      if (!strip) return;
      usedKeybind.action(strip);
      break;
    }

    case 'q': {
      let strip;
      for (let i = 0; i < hovered.length; i++) {
        const element = hovered[i];
        if (i > 6) break;
        if (element.classList.contains('strip')) strip = element;
      }
      if (!strip) return;
      usedKeybind.action(strip);
      break;
    }

    default:
      break;
  }
});

function moveInArray(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
}
