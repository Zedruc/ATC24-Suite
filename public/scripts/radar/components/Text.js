class Text {
  static draw(
    content = 'PLACEHOLDER',
    x = 0,
    y = 0,
    shouldStroke = false,
    strokeColor = 'black',
    strokeSize = 2.5,
    size = 15,
    color = mainColor
  ) {
    ctx.lineWidth = defaultLineWidth;
    ctx.font = `${size * resolutionScale}px JetBrains Mono`;
    ctx.fillStyle = color;
    let textMeasurements = ctx.measureText(content);
    if (shouldStroke) {
      ctx.strokeStyle = strokeColor;
      ctx.strokeText(content, x - textMeasurements.width / 2, y + size / 2.5);
    }
    ctx.fillText(content, x - textMeasurements.width / 2, y + size / 2.5);
  }
}
