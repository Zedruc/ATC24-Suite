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
    notificationQueue.queue({
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

  let dateString = `${changelogTime.getDate()}.${changelogTime.getMonth() + 1}.${changelogTime
    .getFullYear()
    .toString()
    .substring(2, 4)}`;
  var reader = new commonmark.Parser();
  var writer = new commonmark.HtmlRenderer();
  fetch('./changelog.md')
    .then(res => res.text())
    .then(txt => {
      var parsed = reader.parse(txt); // parsed is a 'Node' tree
      // transform parsed if you like...
      var result = writer.render(parsed); // result is a String
      notificationQueue.queue({
        title: `🚀 Update ${window.appVersion} (${dateString})`,
        html: result,
      });
    });
}
