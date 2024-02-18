class ILS {
  static draw(middle, rwyHeading, rwyObject) {
    /* if (rwyHeadingIdentifier !== activeRunway) {
      let runway = getRunway(activeRunway);
      bottomMiddle = runway.bottomMiddle;
      // rwyHeading = runway.heading;

      let possibleHeadings = runway.courses.split('/');
      let rwyHeading = possibleHeadings.forEach(hdg => {
        if (activeRunway == hdg) return hdg;
      });
    } */

    // let runwayHeading = rwyHeading.toString().substring(0, 2);
    const ilsDrawDirection = rwyHeading - 180;
    let rwyLength = feetToPixel(rwyObject.length);

    let startPoint = movePointAlongAngle(middle, rwyLength / 2, ilsDrawDirection);
    let endPoint = movePointAlongAngle(middle, nmToPixel(ilsDistance), ilsDrawDirection);

    // console.log(runwayHeading, approachCourse, endPoint);

    Line.drawDashed(startPoint, endPoint, ilsColor, defaultLineWidth, ilsDashSequence);

    let markerPoints = getThreeMileMarkerPoints(middle, ilsDrawDirection);
    for (const markerSet of markerPoints) {
      Line.draw(markerSet[0], markerSet[1], ilsColor, threeMileMarkerThickness);
    }
  }
}

function getThreeMileMarkerPoints(bottomMiddle, approachCourse) {
  let markers = [];
  for (let i = 3; i <= ilsDistance; i++) {
    if (i % 3 != 0) continue;
    let markerMiddle = movePointAlongAngle(bottomMiddle, nmToPixel(i), approachCourse);
    let left = movePointAlongAngle(
      markerMiddle,
      nmToPixel(threeMileMarkerWidth),
      approachCourse - 90
    );
    let right = movePointAlongAngle(
      markerMiddle,
      nmToPixel(threeMileMarkerWidth),
      approachCourse + 90
    );

    markers.push([left, right]);
  }
  return markers;
}
