const vOrigin = new Vec(circleCenterAndRadius, circleCenterAndRadius);

class Runway {
  static draw(middle, width, length, rwy, hasILS) {
    let rwyHeading = +rwy.courses.split('/')[0];
    let topMiddle = movePointAlongAngle(middle, length / 2, rwyHeading);
    let bottomMiddle = movePointAlongAngle(middle, -(length / 2), rwyHeading);
    let corners = {
      bottomLeft: movePointAlongAngle(bottomMiddle, width / 2, rwyHeading - 90),
      bottomRight: movePointAlongAngle(bottomMiddle, width / 2, rwyHeading + 90),
      topLeft: movePointAlongAngle(topMiddle, width / 2, rwyHeading - 90),
      topRight: movePointAlongAngle(topMiddle, width / 2, rwyHeading + 90),
    };

    Line.draw(bottomMiddle, corners.bottomLeft, runwayColor);
    Line.draw(bottomMiddle, corners.bottomRight, runwayColor);
    Line.draw(topMiddle, corners.topLeft, runwayColor);
    Line.draw(topMiddle, corners.topRight, runwayColor);
    Line.draw(corners.topLeft, corners.bottomLeft, runwayColor);
    Line.draw(corners.topRight, corners.bottomRight, runwayColor);

    /* if (hasILS) {
      // check active runway side
      let currentRunwayIdentifier = rwy.id;
      console.log(activeRunway, currentRunwayIdentifier);
      if (activeRunway == currentRunwayIdentifier) {
        console.log('active is current ==========');
        // ILS.draw(bottomMiddle, rwyHeading, length);
      } else {
        console.log('active is different ========');
        // move middle point to other end and flip hdg
        let newHeading = flipHeading(rwyHeading);
        // console.log('Old heading: ', rwyHeading, ' New heading: ', newHeading);
        let newMiddle = movePointAlongAngle(bottomMiddle, length, rwyHeading);
        ILS.draw(newMiddle, newHeading, length);
      }
    } */
  }
}
