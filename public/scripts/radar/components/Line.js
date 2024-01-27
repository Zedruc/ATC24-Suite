class Line {
  static draw(x, y, dx, dy, color = mainColor, width = defaultLineWidth) {
    if (!x || !y || !dx || !dy) return;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(dx, dy);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.closePath();
  }
}
