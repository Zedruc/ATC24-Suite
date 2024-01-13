class Settings {
  static set(key, value) {
    localStorage.setItem(key, value);
  }

  static get(key) {
    return localStorage.getItem(key);
  }
}

$('#settingsButton').click(() => {
  $('.settingsOverlay').fadeIn(100);

  $('.settingsOverlay').click(e => {
    if (typeof e.target.className !== 'string') return;
    if (e.target?.className?.includes('settingsOverlay')) {
      $('.settingsOverlay').fadeOut(100);
    }
  });
});
