class Text {
  static draw(content = 'PLACEHOLDER', x = 0, y = 0, size = 15, color = mainColor) {
    let textMeasurements = ctx.measureText(content);
    ctx.lineWidth = defaultLineWidth;
    ctx.font = `${size}px JetBrains Mono`;
    ctx.fillStyle = color;
    ctx.fillText(content, x - textMeasurements.width / 2, y + size / 2.5);
  }
}
