const radarCanvas = document.getElementById('radar');
const windowSize = 500;
const resolutionScale = 1;
const canvasSize = windowSize * resolutionScale;
const defaultLineWidth = 2;
/** @type {CanvasRenderingContext2D} */
const ctx = radarCanvas.getContext('2d');
