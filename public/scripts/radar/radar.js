radarCanvas.height = canvasSize;
radarCanvas.width = canvasSize;
radarCanvas.style.height = canvasSize;
radarCanvas.style.width = canvasSize;
// make window fit content
window.resizeBy(windowSize - window.innerWidth, windowSize - window.innerHeight);

let mainColor = '#8bf688';

window.requestAnimationFrame(redrawRadarScreen);
