module.exports = function (app) {
  let background = '#fff';

  return {
    draw
  };

  function draw (dt) {
    // get app properties
    const { width, height, context } = app;

    // push the canvas transform state
    context.save();

    // fill background rectangle
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);

    // make (0, 0) the center of the screen
    const cx = width / 2;
    const cy = height / 2;
    context.translate(cx, cy);

    // this is how much we will scale our circle by
    const radialScale = (1 / 3) * Math.min(width, height);

    // draw some circles
    context.lineWidth = 4;
    context.strokeStyle = '#000';
    context.beginPath();
    context.arc(0, 0, radialScale, 0, Math.PI * 2);
    context.stroke();

    // pop the context transform state
    context.restore();
  }
};
