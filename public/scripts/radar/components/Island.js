class Island {
  static draw(points, dashed, color = '#393939') {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    let firstPoint = Vec.multiply(new Vec(points[0].x, points[0].y), resolutionScale);
    // we need to connect last and first in the end
    let lastPoint = Vec.multiply(
      new Vec(points[points.length - 1].x, points[points.length - 1].y),
      resolutionScale
    );

    ctx.moveTo(firstPoint.x, firstPoint.y);

    for (let i = 0; i < points.length; i++) {
      if (!points[i + 1]) break;
      const point = Vec.multiply(new Vec(points[i].x, points[i].y), resolutionScale);

      const nextPoint = Vec.multiply(new Vec(points[i + 1].x, points[i + 1].y), resolutionScale);
      /* const point = points[i];
      const nextPoint = points[i + 1]; */
      /* if (dashed) Line.drawDashed(point, nextPoint, color, 1);
      else Line.draw(point, nextPoint, color, 1); */
      ctx.lineTo(nextPoint.x, nextPoint.y);

      /* ctx.fillStyle = '#fff';
      ctx.fillText(i, point.x, point.y);
      ctx.fillStyle = color; */
    }
    /* if (dashed) Line.drawDashed(lastPoint, firstPoint, color, 1);
    else Line.draw(lastPoint, firstPoint, color, 1); */
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(firstPoint.x, firstPoint.y);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }
}
