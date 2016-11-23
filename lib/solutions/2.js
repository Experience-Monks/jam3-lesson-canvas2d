const randomFloat = require('random-float');
const shuffle = require('array-shuffle');
const palettes = require('nice-color-palettes');

module.exports = function (app) {
  // Create N "line" objects which will rotate
  // around the center of the screen.
  const lineCount = 200;
  let lines = [];
  for (let i = 0; i < lineCount; i++) {
    lines[i] = createLine();
  }

  // set initial palette
  let colors = [ '#000' ];
  let background = '#fff';

  // swap colors on click
  window.addEventListener('click', randomize);

  return {
    draw
  };

  function randomize () {
    // choose a random palette, shuffle it, then use 1st color as background
    colors = shuffle(palettes[Math.floor(randomFloat(palettes.length))].slice());
    background = colors.shift();
  }

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

    context.lineWidth = 4;
    context.strokeStyle = colors[0];
    context.beginPath();
    context.arc(0, 0, radialScale, 0, Math.PI * 2);
    context.stroke();

    // pop the context transform state
    context.restore();
  }

  // creates a "line" object with some random properties
  function createLine () {
    return {
      angleStart: randomFloat(-Math.PI * 2, Math.PI * 2),
      angleLength: randomFloat(Math.PI * 0.01, Math.PI * 0.25),
      thickness: randomFloat(0.5, 2),
      distanceFromCenter: randomFloat(0.65, 1),
      rotation: randomFloat(-Math.PI * 2, Math.PI * 2),
      rotationDirection: randomFloat(1) > 0.5 ? 1 : -1,
      rotationSpeed: randomFloat(0.05, 0.25)
    };
  }
};
