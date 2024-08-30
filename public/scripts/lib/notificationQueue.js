var soundfile = "../../sound/error-8-206492.mp3";
class NotificationQueue {
  constructor() {
    this.notifications = [];
  }

  queue(swalNoti) {
    this.notifications.push(swalNoti);
    if (this.notifications.length == 1) this.#display(this.notifications[0]);
  }

  #display(notiOptions) {
    if (!notiOptions) return;

    swal.fire(notiOptions).then(result => {
      // Play sound on both confirm and cancel actions
      //clickSoundPlayer.play();

      if (result.isConfirmed) {
        // Confirm button was clicked
        if (notiOptions?.type === 'discord_auth') {
          document.location = window.DISCORD_OAUTH2_URI;
        } else if (notiOptions?.type === 'join_room') {
          let roomCode = document.getElementById('roomCode').value;
          localStorage.setItem('room_code', roomCode);
          wsManager.sendMessage({
            type: MessageTypes.ROOM_JOIN,
            id: localStorage.getItem('discord_id'),
            roomId: roomCode,
          });
        } else if (notiOptions?.type === 'first_visit') {
          localStorage.setItem('firstTimeVisit', 'true');
        } else if (notiOptions?.type === 'error') {
          location.reload();
        } else if (notiOptions?.type === 'auth_error') {
          window.onbeforeunload = () => {};
          window.onunload = () => {};
          document.location = window.DISCORD_OAUTH2_URI;
        }
      } else if (result.isDismissed) {

        error.play();
      }

      this.notifications.shift();
      if (this.notifications.length) {
        this.#display(this.notifications[0]);
      }
    });
  }
}

const notificationQueue = new NotificationQueue();
