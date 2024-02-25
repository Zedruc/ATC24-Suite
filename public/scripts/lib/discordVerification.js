let discordId = localStorage.getItem('discord_id') || undefined;

function verifyDiscord() {
  if (discordId == undefined) {
    // check if we just authorized
    const urlParams = new URLSearchParams(window.location.search);
    let userId = urlParams.get('user_id');
    if (userId) {
      wsManager.setUserId(userId);
      localStorage.setItem('discord_id', userId);
      Toastify({
        text: 'Logged in with Discord!',
        duration: 5000,
        newWindow: true,
        close: true,
        gravity: 'bottom', // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
      }).showToast();
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
