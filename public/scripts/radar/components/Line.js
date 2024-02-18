class Line {
  static draw(x, y, dx, dy, color = mainColor, width = defaultLineWidth) {
    if (typeof x == 'object' && typeof y == 'object') {
      if (!x?.x || !x?.y || !y?.x || !y?.y) {
        return;
      }
      ctx.beginPath();
      ctx.moveTo(x.x, x.y);
      ctx.lineTo(y.x, y.y);
      ctx.strokeStyle = dx;
      ctx.lineWidth = dy;
      ctx.stroke();
      ctx.closePath();
      ctx.strokeStyle = mainColor;
      ctx.lineWidth = defaultLineWidth;
      return;
    }
    if (x == null || y == null || dx == null || dy == null) {
      return;
    }
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(dx, dy);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle = mainColor;
    ctx.lineWidth = defaultLineWidth;
  }

  static drawDashed(x, y, dx, dy, color, width = defaultLineWidth) {
    let dash = color || [3, 3];
    ctx.setLineDash(dash);
    if (typeof x == 'object' && typeof y == 'object') {
      if (!x?.x || !x?.y || !y?.x || !y?.y) {
        return;
      }
      ctx.beginPath();
      ctx.moveTo(x.x, x.y);
      ctx.lineTo(y.x, y.y);
      ctx.strokeStyle = dx;
      ctx.lineWidth = dy;
      ctx.stroke();
      ctx.closePath();
      ctx.strokeStyle = mainColor;
      ctx.lineWidth = defaultLineWidth;
      ctx.setLineDash([]);
      return;
    }
    if (x == null || y == null || dx == null || dy == null) {
      return;
    }
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(dx, dy);
    ctx.strokeStyle = color || mainColor;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle = mainColor;
    ctx.lineWidth = defaultLineWidth;
    ctx.setLineDash([]);
  }
}
