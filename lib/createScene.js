const createLines = require('./createLines');
const drawArc = require('./drawArc');

module.exports = function (app) {
  const lines = createLines();

  // global time counter in seconds
  let time = 0;

  return {
    draw
  };

  function draw (dt) {
    time += dt / 1000;

    // get app properties
    const { width, height, context } = app;

    // push the canvas transform state
    context.save();

    // make (0, 0) the center of the screen
    const cx = width / 2;
    const cy = height / 2;
    context.translate(cx, cy);

    // this is how much we will scale our circle by
    const radialScale = (1 / 3) * Math.min(width, height);

    // now draw each line
    lines.forEach((line, i) => {
      // set up line properties before we draw it
      context.strokeStyle = '#000';
      context.lineWidth = line.thickness;
      context.lineJoin = 'round';
      context.lineCap = 'square';

      // where to draw the line
      const radius = line.distanceFromCenter * radialScale;
      const angleStart = line.angleStart;
      const angleEnd = angleStart + line.angleLength;

      // draw the line with a stroke
      drawArc(context, line, radius, angleStart, angleEnd, time);

      // rotate in one direction or another
      var deltaRotation = line.rotationSpeed * dt / 1000;
      line.rotation += deltaRotation * line.rotationDirection;
    });

    // pop the context transform state
    context.restore();
  }
};
