class Settings {
  static set(key, value) {
    let settings = JSON.parse(localStorage.getItem('settings')) || {};
    settings[key] = value;
    localStorage.setItem('settings', JSON.stringify(settings));
  }

  static get(key) {
    let settings = JSON.parse(localStorage.getItem('settings')) || {};
    return settings[key];
  }

  static loadAndPopulate() {
    let settingElements = document.querySelectorAll('[data-setting]');
    for (let i = 0; i < settingElements.length; i++) {
      const settingElement = settingElements[i];
      let value = this.get(settingElement.id);
      settingElement.checked = value;
    }
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
