class MessageTypes {
  static AUTH = 'auth';
  static PING = 'ping';
  static PING_RESPONSE = 'ping_response';
  static CLOSING = 'closing';
  static ROOM_CREATE = 'room_create';
  static ROOM_JOIN = 'room_join';
  static ROOM_LEAVE = 'room_leave';
  static ROOM_CREATED = 'room_created';
  static NO_ERROR = 'no_error';
  static ALREADY_IN_ROOM = 'already_in_room';
}

const joinRoomButton = document.getElementById('joinButton');
joinRoomButton.innerText = 'Join Room'; // popup
joinRoomButton.setAttribute('onclick', 'joinRoom()');

const roomStatusText = document.getElementById('room-status');

class WSManager {
  #init() {
    this.wss.onerror = this.onError;
    this.wss.onmessage = this.onMessage;
    this.wss.onclose = this.onClose;
    window.onbeforeunload = function (e) {
      this.sendMessage({ id: this.id, type: MessageTypes.CLOSING });
    }.bind(this);
    this.connectionAlive = true;

    if (this.id) {
      this.authorizeUser();
    }
  }

  constructor(url, id = localStorage.getItem('discord_id') || undefined) {
    if (!url) throw Error('No Websocket URL provided');
    this.wss = new WebSocket(url);
    this.url = url;
    this.id = id;
    this.wss.onopen = this.#init.bind(this);
  }

  sendMessage(data) {
    /**
     * EVERY message has to be JSON
     */
    this.wss.send(JSON.stringify(data));
  }

  /**
   *
   * @param {string} payload Message sent from WebSocket Server
   */
  onMessage({ data: payload }) {
    let data = JSON.parse(payload);

    let { type } = data;
    switch (type) {
      case MessageTypes.PING:
        let { id: pingId } = data;
        this.sendMessage({ id: this.id, type: MessageTypes.PING_RESPONSE, pingId: pingId });
        break;
      case MessageTypes.ROOM_CREATED:
        let { status, roomId } = data;
        console.log(status);
        if (status == 409) {
          return notificationQueue.queue({
            title: 'Error',
            icon: 'error',
            html: 'Can not create another room.',
          });
        }
        window.room = roomId;
        Toastify({
          text: 'Room Created',
          duration: 5000,
          newWindow: true,
          close: true,
          gravity: 'bottom', // `top` or `bottom`
          position: 'right', // `left`, `center` or `right`
        }).showToast();
        roomStatusText.innerText = `Connected - {} Members`;
        joinRoomButton.innerText = 'Leave Room';
        joinRoomButton.setAttribute('onclick', 'leaveRoom()');

        break;
      case MessageTypes.ROOM_JOIN: {
        if (data.status == 404) {
          return Toastify({
            text: `Room with this code does not exist`,
            duration: 5000,
            newWindow: true,
            close: true,
            gravity: 'bottom', // `top` or `bottom`
            position: 'right', // `left`, `center` or `right`
          }).showToast();
        }
        let { ownerName, roomId } = data;
        window.room = roomId;
        joinRoomButton.innerText = 'Leave Room';
        joinRoomButton.setAttribute('onclick', 'leaveRoom()');
        Toastify({
          text: `Joined ${ownerName.endsWith('s') ? `${ownerName}'` : `${ownerName}'s`} Room`,
          duration: 5000,
          newWindow: true,
          close: true,
          gravity: 'bottom', // `top` or `bottom`
          position: 'right', // `left`, `center` or `right`
        }).showToast();
        break;
      }
      case MessageTypes.ROOM_LEAVE:
        joinRoomButton.innerText = 'Join Room';
        joinRoomButton.setAttribute('onclick', 'joinRoom()');
        Toastify({
          text: 'Left NAMES Room',
          duration: 5000,
          newWindow: true,
          close: true,
          gravity: 'bottom', // `top` or `bottom`
          position: 'right', // `left`, `center` or `right`
        }).showToast();
        break;
      case MessageTypes.ALREADY_IN_ROOM:
        break;
      default:
        if (data?.status && !data?.status.toString().startsWith('200')) {
          console.log('Error');
          WSManager.handleError(data);
        }
        break;
    }
  }

  authorizeUser() {
    if (!this.id) return console.warn('[WsManager] Set user ID before authorizing');
    this.sendMessage({ id: this.id, type: MessageTypes.AUTH });
  }

  setUserId(id) {
    this.id = id;
  }

  reconnect() {
    if (this.connectionAlive) return;
    this.wss = new WebSocket(this.url);
    this.#init();
    this.connectionAlive = true;
  }

  //TODO: Implement
  onError() {}

  onClose({ code }) {
    console.log(code);
    switch (code) {
      case 1011:
        notificationQueue.queue({
          title: 'Error!',
          icon: 'error',
          html: 'The ATC24-Suite has unexpectedly closed the connection.<br/>This is an issue caused by ATC24-Suite, please try connecting again later.',
          footer: `If this problem persists, please <a href="https://github.com/Zedruc/ATC24-Suite-Feedback/issues/new/choose" target="_blank">file a bug report here</a>`,
        });
        break;
      case 1006:
        notificationQueue.queue({
          title: 'Error!',
          icon: 'error',
          html: 'Could not connect to ATC24-Suite<br/>Please try connecting again later.',
          footer: `If this problem persists, please <a href="https://github.com/Zedruc/ATC24-Suite-Feedback/issues/new/choose" target="_blank">file a bug report here</a>`,
        });
        break;
      default:
        notificationQueue.queue({
          title: 'Error!',
          icon: 'error',
          html: 'The ATC24-Suite has unexpectedly closed the connection.<br/>This is an issue caused by ATC24-Suite, please try connecting again later.',
          footer: `If this problem persists, please <a href="https://github.com/Zedruc/ATC24-Suite-Feedback/issues/new/choose" target="_blank">file a bug report here</a>`,
        });
        break;
    }
    this.connectionAlive = false;
  }

  static handleError(errorMessage) {
    roomStatusText.innerText = 'offline';
    joinRoomButton.innerText = 'Join Room';
    joinRoomButton.setAttribute('onclick', 'joinRoom()');
    window.room = null;

    let { status } = errorMessage;
    switch (status) {
      case 401: // Unauthorized
        notificationQueue.queue({
          title: 'Error!',
          icon: 'error',
          html: 'There was an error logging into the ATC24-Suite, please try again.',
          footer:
            'If this problem persists, please <a href="https://github.com/Zedruc/ATC24-Suite-Feedback/issues/new/choose" target="_blank">file a bug report here</a>',
        });
        break;
      case 409: // Already logged in with given ID
        notificationQueue.queue({
          title: 'Error!',
          icon: 'error',
          html: 'It seems you are already logged into the ATC24-Suite.<br/><br/>If you are sure you do not have any other windows open please make sure nobody else has access to your Discord account.',
          footer:
            'If this problem persists and you are the only one using this Discord account, please <a href="https://github.com/Zedruc/ATC24-Suite-Feedback/issues/new/choose" target="_blank">file a bug report here</a>',
        });
        break;
      case 500:
        notificationQueue.queue({
          title: 'Error!',
          icon: 'error',
          html: 'The ATC24-Suite has unexpectedly closed the connection.<br/>This is an issue caused by ATC24-Suite, please try connecting again later.<br/><br/>Please try to connect again later.',
          footer: `If this problem persists, please <a href="https://github.com/Zedruc/ATC24-Suite-Feedback/issues/new/choose" target="_blank">file a bug report here</a><br/><br/>Server message: ${errorMessage.message}`,
        });
        break;
      default:
        console.log('Error not identified');
        break;
    }
  }
}

window.wsManager = new WSManager('ws://127.0.0.1:81');

function createRoom() {
  wsManager.sendMessage({
    type: MessageTypes.ROOM_CREATE,
    id: localStorage.getItem('discord_id'),
  });
}

function joinRoom() {
  notificationQueue.queue({
    type: 'join_room',
    title: '💻 Join Room',
    html: `
    <div style="display:flex;justify-content:center;flex-direction:column;align-items:center">
    Enter the room code:<br/>
    <input id="roomCode" type="text" placeholder="550e8400-e29b..."/>
    </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Join',
    cancelButtonText: 'Cancel',
  });
}

//TODO: Implement leaveRoom
function leaveRoom() {
  roomStatusText.innerText = 'Offline';
  wsManager.sendMessage({
    type: MessageTypes.ROOM_LEAVE,
    id: localStorage.getItem('discord_id'),
    roomId: window.room,
  });
}
