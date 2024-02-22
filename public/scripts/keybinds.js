const stations = ['del', 'gnd', 'twr', 'app/dep'];

const keybinds = [
  {
    key: 'x',
    action: (strip, deletionConfirmed, list) => {
      if (!strip) return;
      if (deletionConfirmed == 'true') {
        strip.remove();
        StripSaveManager.remove(strip, list);
      } else {
        strip.setAttribute('data-deletion-confirmed', 'true');
      }
    },
    data: 'data-deletion-confirmed',
  },
  {
    key: 'i',
    action: list => {
      let newStrip = generateStrip('inbound', true, list.id);
      list.appendChild(newStrip);
      StripSaveManager.add(newStrip, list);
    },
  },
  {
    key: 'o',
    action: list => {
      let newStrip = generateStrip('outbound', true, list.id);
      list.appendChild(newStrip);
      StripSaveManager.add(newStrip, list);
    },
  },
  {
    key: 'v',
    action: list => {
      let newStrip = generateStrip('vfr', false, list.id);
      list.appendChild(newStrip);
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
      let nextStripListIndex = stations.indexOf(list.id) + 1;
      if (nextStripListIndex > stations.length - 1) return;
      let nextStripList = document.getElementById(stations[nextStripListIndex]);
      let stripClone = strip.cloneNode(true);
      strip.remove();
      nextStripList.appendChild(stripClone);
      StripSaveManager.moveBetweenLists(strip, list, nextStripList);
    },
  },
  {
    key: 'a',
    action: (list, strip) => {
      let nextStripListIndex = stations.indexOf(list.id) - 1;
      if (nextStripListIndex < 0) return;
      let nextStripList = document.getElementById(stations[nextStripListIndex]);
      let stripClone = strip.cloneNode(true);
      strip.remove();
      nextStripList.appendChild(stripClone);
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
    action: (list, strip) => {
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

      if (stripChildren.indexOf(strip) + 1 > stripChildren.length) return;

      // if (list.childNodes[currentIndex - 1].id == 'listName') return;
      // if (currentIndex < 2) return;

      // list.insertBefore(stripClone, list.childNodes[[...list.childNodes].indexOf(strip) + 1]);
      let index = [...list.childNodes].indexOf(strip) + 2;
      if (index > list.childNodes.length) {
        list.appendChild(stripClone);
      } else {
        list.insertBefore(stripClone, list.childNodes[index]);
      }
      strip.remove();

      // list.childNodes = moveInArray([...list.childNodes], currentIndex, newIndex);
    },
  },
];

document.addEventListener('keypress', e => {
  if (document.activeElement.nodeName == 'INPUT') return;
  let hovered = document.querySelectorAll(':hover');

  let usedKeybind;

  for (const keybind of keybinds) {
    if (keybind.key == e.key) {
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
      if (!strip) return;
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
