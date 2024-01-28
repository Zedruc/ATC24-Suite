radarCanvas.height = canvasSize;
radarCanvas.width = canvasSize;
radarCanvas.style.height = canvasSize;
radarCanvas.style.width = canvasSize;
let radarAirport = 'irfd';
let activeRunway = '36L';
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
      radarCanvas.style.backgroundImage = `url(../radars/${newAirport}.png)`;
    window.requestAnimationFrame(redrawRadarScreen);
  } else if (msg.type == 'runway_change') {
    let newRunway = msg.runway;
    activeRunway = newRunway;
    window.requestAnimationFrame(redrawRadarScreen);
  }
});

window.requestAnimationFrame(redrawRadarScreen);
window.requestAnimationFrame(alertParentWindow);

function alertParentWindow() {
  window.requestAnimationFrame(alertParentWindow);
  opener.radarWindow = window;
}
