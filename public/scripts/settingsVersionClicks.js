let appVersionText = document.querySelector('.appVersion');
let settingsListElement = document.querySelector('.settingsList');
let clickCount = 0;
let clickTimeout = setTimeout(() => {
  clickCount = 0;
}, 200);

appVersionText.addEventListener('click', () => {
  clickCount += 1;
  window.clearTimeout(clickTimeout);
  clickTimeout = setTimeout(() => {
    clickCount = 0;
  }, 200);

  if (clickCount >= 6) {
    settingsListElement.innerHTML = `<h1 style="margin: 0">Debug - strip data</h1><pre><code class="language-json">${JSON.stringify(
      JSON.parse(localStorage.getItem('strips')),
      null,
      2
    )}</code></pre>`;
    hljs.highlightAll();
  }
});
