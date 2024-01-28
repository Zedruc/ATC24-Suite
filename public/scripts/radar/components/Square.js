class Square {
  static draw(x, y, w, h, color = mainColor) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  }
}
