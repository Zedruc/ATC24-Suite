const vOrigin = new Vec(circleCenterAndRadius, circleCenterAndRadius);

class Runway {
  static draw(bottomMiddle, width, length, rwyHeading, hasILS) {
    let topMiddle = movePointAlongAngle(bottomMiddle, length, rwyHeading);
    console.log(rwyHeading);
    let corners = {
      bottomLeft: movePointAlongAngle(bottomMiddle, width / 2, rwyHeading - 90),
      bottomRight: movePointAlongAngle(bottomMiddle, width / 2, rwyHeading + 90),
      topLeft: movePointAlongAngle(topMiddle, width / 2, rwyHeading - 90),
      topRight: movePointAlongAngle(topMiddle, width / 2, rwyHeading + 90),
    };

    /* ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.setLineDash([9, 3]);
    ctx.moveTo(bottomMiddle.x, bottomMiddle.y);
    ctx.lineTo(topMiddle.x, topMiddle.y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = 'white';
    ctx.closePath(); */
    Line.draw(bottomMiddle, corners.bottomLeft, runwayColor);
    Line.draw(bottomMiddle, corners.bottomRight, runwayColor);
    Line.draw(topMiddle, corners.topLeft, runwayColor);
    Line.draw(topMiddle, corners.topRight, runwayColor);
    Line.draw(corners.topLeft, corners.bottomLeft, runwayColor);
    Line.draw(corners.topRight, corners.bottomRight, runwayColor);

    if (hasILS) {
      ILS.draw(bottomMiddle, rwyHeading, length);
    }
  }
}
