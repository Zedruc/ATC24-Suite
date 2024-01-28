class ILS {
  static draw(bottomMiddle, rwyHeading, rwyLength) {
    if (rwyHeading !== activeRunway) {
      let runway = getRunway(activeRunway);
      bottomMiddle = runway.bottomMiddle;
      // rwyHeading = runway.heading;

      let possibleHeadings = runway.courses.split('/');
      let rwyHeading = possibleHeadings.forEach(hdg => {
        if (activeRunway == hdg) return hdg;
      });
      console.log(rwyHeading);

      rwyLength = runway.length;
    }

    let runwayHeading = rwyHeading.toString().substring(0, 2);
    const approachCourse = runwayHeading - 180;
    let endPoint = movePointAlongAngle(bottomMiddle, nmToPixel(ilsDistance), approachCourse);
    Line.drawDashed(bottomMiddle, endPoint, ilsColor, defaultLineWidth, ilsDashSequence);

    let markerPoints = getThreeMileMarkerPoints(bottomMiddle, approachCourse);
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
