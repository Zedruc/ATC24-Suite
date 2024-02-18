// request from api.zedruc.net/changelogs/atc24

fetch('https://api.zedruc.net/changelogs/atc24-suite', {
  method: 'GET',
  headers: {
    'X-API-Zedruc-Net-App': 'atc24-suite',
  },
})
  .then(response => response.json())
  .then(response => {
    window.changelog = response;
    checkChangelog();
  })
  .catch(err => {
    swal({
      title: 'Whoops!',
      text: 'An error was encountered trying to fetch the requested data. Please try again later.',
      icon: 'error',
    });
  });

function checkChangelog() {
  let lastChangelogReceived = localStorage.getItem('changelog') || undefined;
  if (lastChangelogReceived !== window.changelog) {
    localStorage.setItem('changelog', window, changelog);
  }
}

function showChangelog() {
  swal({
    title: `🚀 Changelog ${window.appVersion}`,
    text: window.changelog,
  });
}
