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
      saveStrips();
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
      saveStrips();
      StripSaveManager.previousList(strip, list, nextStripList);
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
    default:
      break;
  }
});
