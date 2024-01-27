let headingStep = 5;
class RadarCircle {
  static draw(lastMousePos) {
    // draw initial circle
    let circleCenterAndRadius = canvasSize / 2;
    ctx.beginPath();
    ctx.arc(circleCenterAndRadius, circleCenterAndRadius, circleCenterAndRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = mainColor;
    ctx.lineWidth = defaultLineWidth;
    ctx.stroke();

    // draw heading bugs
    let theta = 0;

    while (theta < 360) {
      theta += headingStep;
      if (theta % 90 == 0) {
        let lineWidth = 5;
        /**
         * rotatedX = (self.x - origin.x) * math.cos(radians) - (self.y - origin.y) * math.sin(radians) + origin.x
         * rotatedY = (self.x - origin.x) * math.sin(radians) - (self.y - origin.y) * math.cos(radians) + origin.y
         */
        let radians = degrees_to_radians(theta + 90); // +90 because of rendering counterclockwise offset by 90°
        let startingPoint = {
          x: circleCenterAndRadius,
          y: defaultLineWidth - 3,
        };

        let endPoint = {
          x: circleCenterAndRadius,
          y: defaultLineWidth + 20,
        };

        let rotatedStartingPoint = rotatePoint(
          startingPoint.x,
          startingPoint.y,
          circleCenterAndRadius,
          circleCenterAndRadius,
          radians
        );
        let rotatedEndPoint = rotatePoint(
          endPoint.x,
          endPoint.y,
          circleCenterAndRadius,
          circleCenterAndRadius,
          radians
        );

        Line.draw(
          rotatedStartingPoint.x,
          rotatedStartingPoint.y,
          rotatedEndPoint.x,
          rotatedEndPoint.y,
          mainColor,
          lineWidth
        );

        // text point
        let textPoint = {
          x: circleCenterAndRadius,
          y: defaultLineWidth + 35,
        };
        let rotatedTextPoint = rotatePoint(
          textPoint.x,
          textPoint.y,
          circleCenterAndRadius,
          circleCenterAndRadius,
          radians
        );
        Text.draw(theta, rotatedTextPoint.x, rotatedTextPoint.y);
      }
      if (theta % 30 == 0) {
        let radians = degrees_to_radians(theta);
        let startingPoint = {
          x: circleCenterAndRadius,
          y: defaultLineWidth - 3,
        };
        let endPoint = {
          x: circleCenterAndRadius,
          y: defaultLineWidth + 20,
        };

        let rotatedStartingPoint = rotatePoint(
          startingPoint.x,
          startingPoint.y,
          circleCenterAndRadius,
          circleCenterAndRadius,
          radians
        );
        let rotatedEndPoint = rotatePoint(
          endPoint.x,
          endPoint.y,
          circleCenterAndRadius,
          circleCenterAndRadius,
          radians
        );

        Line.draw(
          rotatedStartingPoint.x,
          rotatedStartingPoint.y,
          rotatedEndPoint.x,
          rotatedEndPoint.y
        );
      }

      if (theta % 5 == 0) {
        let radians = degrees_to_radians(theta);
        let startingPoint = {
          x: circleCenterAndRadius,
          y: defaultLineWidth - 3,
        };
        let endPoint = {
          x: circleCenterAndRadius,
          y: defaultLineWidth + 5,
        };

        let rotatedStartingPoint = rotatePoint(
          startingPoint.x,
          startingPoint.y,
          circleCenterAndRadius,
          circleCenterAndRadius,
          radians
        );
        let rotatedEndPoint = rotatePoint(
          endPoint.x,
          endPoint.y,
          circleCenterAndRadius,
          circleCenterAndRadius,
          radians
        );

        Line.draw(
          rotatedStartingPoint.x,
          rotatedStartingPoint.y,
          rotatedEndPoint.x,
          rotatedEndPoint.y
        );
      }

      // draw exact heading at mouse cursor
      /* let heading = getAngle(
        circleCenterAndRadius,
        circleCenterAndRadius,
        lastMousePos.x,
        lastMousePos.y
      );

      console.log(heading); */
    }
  }
}

function degrees_to_radians(degrees) {
  return degrees * (Math.PI / 180);
}

function radians_to_degrees(radians) {
  return radians * (180 / Math.PI);
}

function rotatePoint(x, y, originX, originY, radians) {
  let rotatedX = (x - originX) * Math.sin(radians) + (y - originY) * Math.cos(radians) + originX;
  let rotatedY = (x - originX) * Math.cos(radians) + (y - originY) * Math.sin(radians) + originY;

  return {
    x: rotatedX,
    y: rotatedY,
  };
}

function getAngle(x1, y1, x2, y2) {
  var w = x2 - x1;
  var h = y2 - y1;

  var atan = (Math.atan(h / w) / Math.PI) * 180;
  if (w < 0 || h < 0) atan += 180;
  if (w > 0 && h < 0) atan -= 180;
  if (atan < 0) atan += 360;

  return atan % 360;
}
