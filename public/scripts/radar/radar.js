radarCanvas.height = canvasSize;
radarCanvas.width = canvasSize;
radarCanvas.style.height = canvasSize;
radarCanvas.style.width = canvasSize;
let radarAirport = window.opener.currentAirport;
let activeArrRunway = window.opener.activeArrRunway;
let activeDepRunway = window.opener.activeDepRunway;
// make window fit content
window.resizeBy(windowSize - window.innerWidth, windowSize - window.innerHeight);

// let mainColor = '#8bf688';
let mainColor = 'white';

window.addEventListener('message', ev => {
  let msg = ev.data;
  if (msg.type == 'airport_change') {
    let newAirport = msg.airport;
    radarAirport = newAirport;
    if (Settings.get('loadRadarChart'))
      // radarCanvas.style.backgroundImage = `url(../charts/${newAirport}/${newAirport}%20Ground%20Chart.png.webp)`;
      radarCanvas.style.backgroundImage = `url(../radars/${newAirport}.png)`;
    window.requestAnimationFrame(redrawRadarScreen);
  } else if (msg.type == 'arr_runway_change') {
    let newRunway = msg.runway;
    activeArrRunway = newRunway;
    window.requestAnimationFrame(redrawRadarScreen);
  } else if (msg.type == 'dep_runway_change') {
    let newRunway = msg.runway;
    activeDepRunway = newRunway;
    window.requestAnimationFrame(redrawRadarScreen);
  }
});

window.requestAnimationFrame(redrawRadarScreen);
window.requestAnimationFrame(alertParentWindow);

function alertParentWindow() {
  window.requestAnimationFrame(alertParentWindow);
  opener.radarWindow = window;
}
