/* eslint no-unused-vars: "off" */
const createLines = require('./createLines');
const drawArc = require('./drawArc');
const palettes = require('nice-color-palettes/500').slice(400);
const shuffle = require('array-shuffle');

module.exports = function (app) {
  const lines = createLines();

  // global time counter in seconds
  let firstRender = true;
  let time = 0;
  let background, colors;
  swapColors();
  window.addEventListener('mousedown', swapColors);

  return {
    draw
  };

  function swapColors () {
    // colors = ['#fff', 'hsl(0, 0%, 70%)', 'hsl(0, 0%, 20%)', 'hsl(0, 0%, 50%)']
    colors = shuffle(palettes[Math.floor(Math.random() * palettes.length)]).slice();
    background = '#fff'//colors.shift();
    firstRender = true;
  }

  function clear (alpha = 1) {
    const { width, height, context } = app;
    context.globalAlpha = alpha;
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);
  }

  function draw (dt) {
    time += dt / 1000;

    // get app properties
    const { width, height, context } = app;

    // push the canvas transform state
    context.save();

    context.globalAlpha = 1;
    if (firstRender) {
      clear();
      firstRender = false;
    } else {
      // clear(0.025);
    }

    // make (0, 0) the center of the screen
    const cx = width / 2;
    const cy = height / 2;
    context.translate(cx, cy);

    // this is how much we will scale our circle by
    const radialScale = 0.25 * Math.min(width, height);

    // now draw each line
    lines.forEach((line, i) => {
      // set up line properties before we draw it
      context.strokeStyle = colors[i % colors.length];
      context.fillStyle = colors[i % colors.length];
      context.lineWidth = line.thickness;
      context.lineJoin = 'round';
      context.lineCap = 'square';

      // where to draw the line
      const distance = line.distanceFromCenter;
      const radius = distance * radialScale;
      const angleStart = line.angleStart;
      const angleEnd = angleStart + line.angleLength;

      // draw the line with a stroke
      drawArc(context, line, i, radius, angleStart, angleEnd, time);

      // rotate in one direction or another
      var deltaRotation = line.rotationSpeed * dt / 1000;
      line.rotation += deltaRotation * line.rotationDirection;
    });

    // pop the context transform state
    context.restore();
  }
};
