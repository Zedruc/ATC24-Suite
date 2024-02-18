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
    console.log(err);
    swal({
      title: 'Whoops!',
      text: 'An error was encountered trying to fetch the requested data. Please try again later.',
      icon: 'error',
    });
  });

function checkChangelog() {
  let lastChangelogTime = localStorage.getItem('lastChangelogTime') || 0;
  let receivedChangelogTime = new Date(window.changelog.time);
  if (receivedChangelogTime.getTime() > lastChangelogTime) {
    localStorage.setItem('lastChangelogTime', receivedChangelogTime.getTime());
    showChangelog();
  }
}

function showChangelog() {
  let changelogTime = new Date(window.changelog.time);
  console.log(changelogTime);
  let dateString = `${changelogTime.getDate()}.${changelogTime.getMonth()}.${changelogTime
    .getFullYear()
    .toString()
    .substring(2, 4)}`;
  swal({
    title: `🚀 Update ${window.appVersion} (${dateString})`,
    text: window.changelog.message,
  });
}
