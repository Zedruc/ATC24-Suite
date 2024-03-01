let discordId = localStorage.getItem('discord_id') || undefined;
let userToken = localStorage.getItem('suite_token');

function verifyDiscord() {
  if (discordId == undefined || userToken == undefined) {
    // check if we just authorized
    const urlParams = new URLSearchParams(window.location.search);
    let userId = urlParams.get('user_id');
    let token = urlParams.get('token');
    // let firstAuth = urlParams.get('first_auth');
    if (userId) {
      console.log(localStorage.getItem('discord_id'));
      /* if (firstAuth !== 'true') {
        console.log('Not first auth, cancelling.');
        return;
      } */
      wsManager.setUserId(userId);
      localStorage.setItem('discord_id', userId);
      if (token) localStorage.setItem('suite_token', token);
      // wsManager.sendMessage({ id: userId, type: MessageTypes.CLOSING });
      console.log('reload');
      // remove window reload confirmation
      window.onbeforeunload = () => {};
      window.onunload = () => {};

      document.location =
        window.location.hostname == 'zedruc.net'
          ? 'https://zedruc.net/atc24-suite'
          : 'http://127.0.0.1:5500/public';
      /* notificationQueue.queue({
        type: 'dc_reload',
        title: 'Logged in with Discord!',
        html: 'The page will now reload to finish everything up.',
        confirmButtonText: 'Ok',
      }); */
    } else {
      notificationQueue.queue({
        type: 'discord_auth',
        title: '🔗 Link Discord with the ATC24-Suite',
        html: 'Linking Discord will enable you to use the<br/>shared room feature to condone split ATC operations',
        footer:
          'This is totally optional and will not hinder you from enjoying the ATC24-Suite. Only 2 bits of data are stored on a secure own ATC24-Suite database, those being your discord id and username',
        showCancelButton: true,
        confirmButtonText: 'Connect Discord',
        cancelButtonText: 'Continue without Discord',
      });
    }
  } else {
    let dcBtn = document.getElementById('connectDiscord');
    dcBtn.className = 'disabled';
    document.getElementById('discordConnectionStatus').innerText = 'Connected';
  }
}

verifyDiscord();
