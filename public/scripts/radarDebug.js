let pointCollectorEnabled = false;
let points = [];
let pointClickHandler = ev => {
  let pos = getMousePos(radarCanvas, ev);
  // bring it to x1 scale
  points.push({
    x: pos.x / resolutionScale,
    y: pos.y / resolutionScale,
  });
};

window.addEventListener('keypress', ev => {
  if (ev.key == 'p') {
    if (pointCollectorEnabled) {
      document.body.style.overflow = 'hidden';
      console.log('[DEBUG] disabled point clicker');
      pointCollectorEnabled = false;
      if (points.length == 1) console.log(points[0]);
      else console.log(points);
      points = [];
      window.removeEventListener('mousedown', pointClickHandler);
    } else {
      document.body.style.overflow = 'scroll';
      console.log('[DEBUG] enabled point clicker');
      pointCollectorEnabled = true;
      window.addEventListener('mousedown', pointClickHandler);
    }
  }
});
