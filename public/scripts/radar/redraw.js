let lastMousePos = {
  x: canvasSize / 2,
  y: canvasSize / 2,
};

let circleCenterAndRadius = canvasSize / 2;
let trueHeading = 360;

function redrawRadarScreen() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  // draw debug and radar circle
  // DebugLines.draw();
  RadarCircle.draw(lastMousePos);

  // draw at mouse and PAY ATTENTION TO ORDER
  // first line, then circle
  Line.draw(canvasSize / 2, canvasSize / 2, lastMousePos.x, lastMousePos.y);
  // GeneralCircle.draw(lastMousePos.x, lastMousePos.y);
  Text.draw(
    trueHeading + '°',
    lastMousePos.x - ctx.measureText(trueHeading + '°').width / 2,
    lastMousePos.y
  );
}

radarCanvas.addEventListener('mousemove', ev => {
  /** only request redraw on mousemove
   *  so we dont run all the angle calculations
   *  every frame
   */
  window.requestAnimationFrame(redrawRadarScreen);

  lastMousePos = getMousePos(radarCanvas, ev);

  let heading = getAngle(
    circleCenterAndRadius,
    circleCenterAndRadius,
    lastMousePos.x,
    lastMousePos.y
  );

  trueHeading = Math.ceil(getTrueHeading(heading));
});

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width, // relationship bitmap vs. element for x
    scaleY = canvas.height / rect.height; // relationship bitmap vs. element for y

  return {
    x: (evt.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
    y: (evt.clientY - rect.top) * scaleY, // been adjusted to be relative to element
  };
}

function getTrueHeading(heading) {
  console.log('Original', heading);
  if (heading == 90 && lastMousePos.y < 250) return 360;
  if (heading >= 270 && heading <= 360) return heading - 270;
  if (heading >= 0 && heading <= 90) return heading + 90;
  if (heading >= 90 && heading <= 180) return heading + 90;
  if (heading >= 180 && heading <= 270) return heading + 90;
}
