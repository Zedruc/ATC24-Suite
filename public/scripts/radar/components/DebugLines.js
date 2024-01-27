class DebugLines {
  static draw() {
    ctx.beginPath();
    ctx.moveTo(canvasSize / 2, 0);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.lineTo(canvasSize / 2, canvasSize);
    ctx.moveTo(0, canvasSize / 2);
    ctx.lineTo(canvasSize, canvasSize / 2);
    ctx.stroke();
    ctx.closePath();
  }
}
