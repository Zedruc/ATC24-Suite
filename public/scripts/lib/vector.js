class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static fromObject(obj) {
    return new Vec(obj.x, obj.y);
  }

  static add(v1, v2) {
    new Vec(v1.x + v2.x, v1.y + v2.y);
  }

  static subtract(v1, v2) {
    new Vec(v1.x - v2.x, v1.y - v2.y);
  }

  static multiply(v, scale) {
    return new Vec(v.x * scale, v.y * scale);
  }

  static inverse(v) {
    new Vec(v.x * -1, v.y * -1);
  }

  static from(point1, point2) {
    if (point2.x > point1.x) {
      let deltaY = point2.y - point1.y;
      let deltaX = point2.x - point1.x;
      return new Vec(deltaX, deltaY);
    } else {
      let deltaY = point1.y - point2.y;
      let deltaX = point1.x - point2.x;
      return new Vec(deltaX, deltaY);
    }
  }

  static distance(v1, v2) {
    if (v2.x > v1.x) {
      let deltaY = v2.y - v1.y;
      let deltaX = v2.x - v1.x;

      let d = Math.sqrt(deltaY ** 2 + deltaX ** 2);
      return d;
    } else {
      let deltaY = v1.y - v2.y;
      let deltaX = v1.x - v2.x;
      let d = Math.sqrt(deltaY ** 2 + deltaX ** 2);
      return d;
    }
  }
}
