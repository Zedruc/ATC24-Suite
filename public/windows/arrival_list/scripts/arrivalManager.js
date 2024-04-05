window.addEventListener('message', ev => {
  let msg = ev.data;
  if (msg.type == 'new_arrival') {
    console.log(msg.arrival);
    addArrivalToList(msg.arrival);
  }
});

// this will keep the connection between opener and atis window
window.requestAnimationFrame(alertParentWindow);

function alertParentWindow() {
  window.requestAnimationFrame(alertParentWindow);
  opener.arrivalWindow = window;
}

let list = document.getElementById('item-container');

/**
 * @typedef Arrival
 * @type {object}
 * @property {string} rwy
 * @property {string} cs
 * @property {string} type
 * @property {string} eta
 * @property {string} stand
 * @property {string} stripId
 */

/**
 *
 * @param {Arrival} arrival
 */
function addArrivalToList(arrival) {
  let newItem = document.getElementById('template-item').cloneNode(true);
  newItem.id = arrival.stripId;
  newItem.addEventListener('click', e => {
    e.target.remove();
    window.opener.postMessage({
      type: 'arrival_accepted',
      callsign: e.target.id,
    });
  });
  newItem.querySelector('#rwy').innerText = arrival.rwy;
  newItem.querySelector('#cs').innerText = arrival.cs;
  newItem.querySelector('#type').innerText = arrival.type;
  newItem.querySelector('#eta').innerText = arrival.eta;
  newItem.querySelector('#stand').innerText = arrival.stand;

  list.prepend(newItem);
}
