class GeneralCircle {
  static draw(x = 0, y = 0, radius = 10, startAngle = 0, endAngle = 2 * Math.PI) {
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}
