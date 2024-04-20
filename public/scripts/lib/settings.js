let defaultOptions = {};

class Settings {
  static set(key, value) {
    let settings = JSON.parse(localStorage.getItem('settings')) || defaultOptions;
    settings[key] = value;
    localStorage.setItem('settings', JSON.stringify(settings));
  }

  static get(key) {
    let settings = JSON.parse(localStorage.getItem('settings')) || defaultOptions;
    return settings[key];
  }

  static loadAndPopulate() {
    // load default values for options that dont exist yet bcs of updates
    let settingElements = document.querySelectorAll('[data-setting]');
    settingElements.forEach(el => {
      defaultOptions[el.id] = false;
      let value = this.get(el.id);
      el.checked = value;
    });
  }
}

Settings.loadAndPopulate();
if (document.body.id == 'main') {
  $('#settingsButton').click(() => {
    $('.settingsOverlay').fadeIn(100);

    $('.settingsOverlay').click(e => {
      if (typeof e.target.className !== 'string') return;
      if (e.target?.className?.includes('settingsOverlay')) {
        $('.settingsOverlay').fadeOut(100);
      }
    });
  });
}
