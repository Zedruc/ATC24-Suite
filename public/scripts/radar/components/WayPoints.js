class RNAV {
  constructor(xyVector, name) {
    this.xyVector = xyVector;
    this.name = name;
  }

  draw() {
    let iconDimensions = 10; // 100 x 100
    // given xy is center of triangle
    let topPoint = new Vec(this.xyVector.x, this.xyVector.y - iconDimensions / 2);
    let bottomPoint = new Vec(this.xyVector.x, this.xyVector.y + iconDimensions / 2);
    let bottomLeftPoint = new Vec(bottomPoint.x - iconDimensions / 2, bottomPoint.y);
    let bottomRightPoint = new Vec(bottomPoint.x + iconDimensions / 2, bottomPoint.y);

    Text.draw(
      this.name,
      bottomPoint.x * resolutionScale,
      (bottomPoint.y + iconDimensions) * resolutionScale,
      false,
      'black',
      10
    );

    Shape.draw([topPoint, bottomLeftPoint, bottomRightPoint], false, 'white');
  }
}

class VOR {
  constructor(xyVector, name) {
    this.xyVector = xyVector;
    this.name = name;
  }

  draw() {
    let iconDimensions = 30;
    var img = new Image();
    img.onload = function () {
      ctx.drawImage(
        img,
        (this.xyVector.x - iconDimensions / 4) * resolutionScale,
        (this.xyVector.y + iconDimensions / 4) * resolutionScale
      );
    }.bind(this);
    img.src = '../scripts/radar/icons/vor.svg';

    Text.draw(
      this.name,
      this.xyVector.x * resolutionScale,
      (this.xyVector.y + iconDimensions) * resolutionScale,
      false,
      'black',
      10
    );
  }
}

class VORTAC {
  constructor(xyVector, name) {
    this.xyVector = xyVector;
    this.name = name;
  }

  draw() {
    let iconDimensions = 30;
    var img = new Image();
    img.onload = function () {
      ctx.drawImage(
        img,
        (this.xyVector.x - iconDimensions / 4) * resolutionScale,
        (this.xyVector.y + iconDimensions / 4) * resolutionScale
      );
    }.bind(this);
    img.src = '../scripts/radar/icons/vortac.svg';

    Text.draw(
      this.name,
      this.xyVector.x * resolutionScale,
      (this.xyVector.y + iconDimensions) * resolutionScale,
      false,
      'black',
      10
    );
  }
}

class VORDME {
  constructor(xyVector, name) {
    this.xyVector = xyVector;
    this.name = name;
  }

  draw() {
    let iconDimensions = 30;
    var img = new Image();
    img.onload = function () {
      ctx.drawImage(
        img,
        (this.xyVector.x - iconDimensions / 4) * resolutionScale,
        (this.xyVector.y + iconDimensions / 4) * resolutionScale
      );
    }.bind(this);
    img.src = '../scripts/radar/icons/vordme.svg';

    Text.draw(
      this.name,
      this.xyVector.x * resolutionScale,
      (this.xyVector.y + iconDimensions) * resolutionScale,
      false,
      'black',
      10
    );
  }
}
