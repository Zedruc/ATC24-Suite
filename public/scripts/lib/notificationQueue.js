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
      if (notiOptions?.type == 'discord_auth') {
        if (result.isConfirmed) document.location = window.DISCORD_OAUTH2_URI;
      } else if (notiOptions?.type == 'join_room') {
        if (result.isConfirmed) {
          let roomCode = document.getElementById('roomCode').value;
          wsManager.sendMessage({
            type: MessageTypes.ROOM_JOIN,
            id: localStorage.getItem('discord_id'),
            roomId: roomCode,
          });
        }
      }
      this.notifications.shift();
      if (this.notifications.length) {
        this.#display(this.notifications[0]);
      }
    });
  }
}

const notificationQueue = new NotificationQueue();
