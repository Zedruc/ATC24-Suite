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
  static MEMBER_COUNT_CHANGE = 'member_count_change';

  static STRIP_DATA = 'strip_data';
  static ROOM_STRIPS = 'room_strips';

  static STRIP_MOVE = 'strip_move';
  static STRIP_MOVE_LIST = 'strip_move_list';

  static STRIP_SYNC = 'strip_sync';

  static USER_LEFT = 'user_left';
  static USER_JOINED = 'user_joined';

  static OWNER_CHANGE = 'owner_change';
}

const joinRoomButton = document.getElementById('joinButton');
joinRoomButton.innerText = 'Join Room'; // popup
joinRoomButton.setAttribute('onclick', 'joinRoom()');

const createRoomButton = document.getElementById('create-room-button');
const createRoomButtonClone = createRoomButton.cloneNode(true);
let createRoomButtonContainer = createRoomButton.parentElement;

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
    if (!data.id) data.id = localStorage.getItem('discord_id') || undefined;
    data.origin = data.id;
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
        createRoomButtonContainer.innerHTML = `Code: ${roomId}`;

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
        roomStatusText.innerText = `Connected - 1 Member(s)`;
        joinRoomButton.innerText = 'Leave Room';
        joinRoomButton.setAttribute('onclick', 'leaveRoom()');

        wsManager.sendMessage({
          type: MessageTypes.ROOM_STRIPS,
          room: roomId,
          id: localStorage.getItem('discord_id'),
          data: JSON.parse(localStorage.getItem('strips')) || {},
        });
        break;
      case MessageTypes.ROOM_JOIN: {
        if (data.status == 404) {
          console.log('404');
          return Toastify({
            text: `Room with this code does not exist`,
            duration: 5000,
            newWindow: true,
            close: true,
            gravity: 'bottom', // `top` or `bottom`
            position: 'right', // `left`, `center` or `right`
          }).showToast();
        }
        let { ownerName, roomId, memberCount } = data;
        window.room = roomId;
        roomStatusText.innerText = `Connected - ${memberCount} Member(s)`;
        joinRoomButton.innerText = 'Leave Room';
        joinRoomButton.setAttribute('onclick', 'leaveRoom()');
        createRoomButtonContainer.innerHTML = `Code: ${roomId}`;
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
          text: 'Left Room',
          duration: 5000,
          newWindow: true,
          close: true,
          gravity: 'bottom', // `top` or `bottom`
          position: 'right', // `left`, `center` or `right`
        }).showToast();
        break;
      case MessageTypes.ALREADY_IN_ROOM:
        break;
      case MessageTypes.MEMBER_COUNT_CHANGE: {
        let { memberCount } = data;
        roomStatusText.innerText = `Connected - ${memberCount} Member(s)`;
        break;
      }
      case MessageTypes.OWNER_CHANGE: {
        Toastify({
          text: 'You are now the room owner',
          duration: 5000,
          newWindow: true,
          close: true,
          gravity: 'bottom', // `top` or `bottom`
          position: 'right', // `left`, `center` or `right`
        }).showToast();
        break;
      }
      case MessageTypes.STRIP_DATA: {
        let { data: stripData, listId, deletion, origin } = data;
        if (deletion) {
          if (document.getElementById(data.stripId)) {
            StripSaveManager.remove(
              document.getElementById(data.stripId),
              document.getElementById(listId)
            );
            document.getElementById(data.stripId).remove();
            break;
          }
          break;
        }

        let stripId = stripData.info.stripId;

        // if (!document.getElementById(stripId)) {
        handleStripUpdate(listId, stripId, stripData);
        // }
        break;
      }
      case MessageTypes.ROOM_STRIPS: {
        let { data: newData } = data;

        document.querySelectorAll('.strip').forEach(strip => {
          StripSaveManager.remove(strip, strip.parentElement, false);
          strip.remove();
        });

        localStorage.setItem('strips', JSON.stringify(newData));
        StripSaveManager.loadFromStorageAndPopulate();

        break;
      }
      case MessageTypes.STRIP_MOVE: {
        let { stripId, listId, direction, origin } = data;
        if (origin == localStorage.getItem('discord_id')) return;

        // get keybind function to execute on client
        if (direction == 'up') {
          for (const objectKey in keybinds) {
            let keybind = keybinds[objectKey];
            if (keybind.key == 'w')
              keybind.action(document.getElementById(stripId), document.getElementById(listId));
          }
        } else if (direction == 'down') {
          for (const objectKey in keybinds) {
            let keybind = keybinds[objectKey];
            if (keybind.key == 's')
              keybind.action(document.getElementById(stripId), document.getElementById(listId));
          }
        }
        break;
      }
      case MessageTypes.STRIP_SYNC: {
        let { storage } = data;
        // this syncs ALL clients no matter what, disregarding possible data loss
        localStorage.setItem('strips', JSON.stringify(storage));
        break;
      }
      default:
        if (data?.status && !data?.status.toString().startsWith('200')) {
          WSManager.handleError(data);
        }
        break;
    }

    document.querySelectorAll('.textInput').forEach(input => {
      if (input.getAttribute('data-fp')) input.value = input.getAttribute('data-fp');
      if (input?.id == 'flightplan') return;
      input.addEventListener('focusout', event => {
        StripSaveManager.updateStrip(
          input.parentElement.parentElement,
          input.parentElement.parentElement.parentElement
        );
      });
    });

    document.querySelectorAll('#callsign').forEach(callsignField => {
      detectCallsign(callsignField);
    });

    document.querySelectorAll('.strip').forEach(strip => {
      let clearance = strip.getAttribute('data-fp');
      strip.querySelector('#flightplan').value = clearance || '';
    });
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

function leaveRoom() {
  roomStatusText.innerText = 'Offline';
  createRoomButtonContainer.innerHTML = '';
  createRoomButtonContainer.appendChild(createRoomButtonClone);
  wsManager.sendMessage({
    type: MessageTypes.ROOM_LEAVE,
    id: localStorage.getItem('discord_id'),
    roomId: window.room,
  });
  window.room = '';
}

function handleStripUpdate(listId, stripId, saveData) {
  let strip = document.getElementById(stripId);
  if (!strip) {
    let generatedStrip = generatePrepopulatedStrip(saveData);
    document.getElementById(listId).appendChild(generatedStrip);
    return;
  }

  clearanceFromFlightPlan(strip, saveData?.ws, saveData);

  if (strip.querySelector('#callsign'))
    strip.querySelector('#callsign').value = saveData?.info
      ? saveData.info.callsign
      : saveData.callsign;
  if (strip.querySelector('#squawk'))
    strip.querySelector('#squawk').value = saveData?.info ? saveData.info.squawk : saveData.squawk;
  if (strip.querySelector('#departure'))
    strip.querySelector('#departure').value = saveData?.info
      ? saveData.info.departure
      : saveData.departure;
  if (strip.querySelector('#arrival'))
    strip.querySelector('#arrival').value = saveData?.info
      ? saveData.info.arrival
      : saveData.arrival;
  if (strip.querySelector('#aircraft'))
    strip.querySelector('#aircraft').value = saveData?.info
      ? saveData.info.aircraft
      : saveData.aircraft;
  if (strip.querySelector('#altitude'))
    strip.querySelector('#altitude').value = saveData?.info
      ? saveData.info.altitude
      : saveData.altitude;
  if (strip.querySelector('#gate'))
    strip.querySelector('#gate').value = saveData?.info ? saveData.info.gate : saveData.gate;
  if (strip.querySelector('#status'))
    strip.querySelector('#status').value = saveData?.info ? saveData.info.status : saveData.status;
  if (strip.querySelector('#info'))
    strip.querySelector('#info').value = saveData?.info ? saveData.info.info : saveData.info;
  if (strip.querySelector('#runway'))
    strip.querySelector('#runway').value = saveData?.info ? saveData.info.runway : saveData.runway;
  if (strip.querySelector('#sidstar'))
    strip.querySelector('#sidstar').value = saveData?.info
      ? saveData.info.sidstar
      : saveData.sidstar;
  if (strip.querySelector('#notes'))
    strip.querySelector('#notes').value = saveData?.info ? saveData.info.notes : saveData.notes;
  if (strip.querySelector('#route'))
    strip.querySelector('#route').value = saveData?.info ? saveData.info.route : saveData.route;
  if (strip.querySelector('#flightplan'))
    strip.querySelector('#flightplan').value = saveData?.info
      ? saveData.info.flightplan
      : saveData.flightplan;
}
