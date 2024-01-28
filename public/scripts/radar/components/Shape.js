class Shape {
  static draw(points) {
    let firstPoint = Vec.multiply(new Vec(points[0].x, points[0].y), resolutionScale);
    // we need to connect last and first in the end
    let lastPoint = Vec.multiply(
      new Vec(points[points.length - 1].x, points[points.length - 1].y),
      resolutionScale
    );

    for (let i = 0; i < points.length; i++) {
      if (!points[i + 1]) break;
      const point = Vec.multiply(new Vec(points[i].x, points[i].y), resolutionScale);
      const nextPoint = Vec.multiply(new Vec(points[i + 1].x, points[i + 1].y), resolutionScale);
      /* const point = points[i];
      const nextPoint = points[i + 1]; */
      Line.drawDashed(point, nextPoint, runwayColor, 1);
    }
    Line.drawDashed(lastPoint, firstPoint, runwayColor, 1);
  }
}
