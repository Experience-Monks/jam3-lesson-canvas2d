const randomFloat = require('random-float');
const shuffle = require('array-shuffle');
const palettes = require('nice-color-palettes');
const simplex = new (require('simplex-noise'))();

const {
  computeStepsForArc,
  distanceBetweenAngles
} = require('./utils');

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

  // global time counter in seconds
  let time = 0;

  // whether or not to offset lines with noise
  let useNoise = false;

  return {
    draw
  };

  function randomize () {
    // choose a random palette, shuffle it, then use 1st color as background
    colors = shuffle(palettes[Math.floor(randomFloat(palettes.length))].slice());
    background = colors.shift();
  }

  function draw (dt) {
    time += dt / 1000;

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

    // now draw each line
    lines.forEach((line, i) => {
      // set up line properties before we draw it
      context.strokeStyle = colors[i % colors.length];
      context.lineWidth = line.thickness;
      context.lineJoin = 'round';
      context.lineCap = 'square';

      // where to draw the line
      const radius = line.distanceFromCenter * radialScale;
      const angleStart = line.angleStart;
      const angleEnd = angleStart + line.angleLength;

      // draw the line with a stroke
      if (useNoise) drawArcNoise(context, line, radius, angleStart, angleEnd);
      else drawArc(context, line, radius, angleStart, angleEnd);

      // rotate in one direction or another
      var deltaRotation = line.rotationSpeed * dt / 1000;
      line.rotation += deltaRotation * line.rotationDirection;
    });

    // pop the context transform state
    context.restore();
  }

  function drawArc (context, line, radius, angleStart, angleEnd) {
    context.rotate(line.rotation);
    context.beginPath();
    context.arc(0, 0, radius, angleStart, angleEnd);
    context.stroke();
    context.rotate(-line.rotation);
  }

  function drawArcNoise (context, line, radius, angleStart, angleEnd) {
    context.beginPath();

    // figure out how many segments in this arc
    const steps = computeStepsForArc(radius, angleStart, angleEnd);

    // figure out how far to increment angle per segment
    const dist = distanceBetweenAngles(angleStart, angleEnd);
    const angleDelta = dist / steps;

    // initial angle for line
    let angle = angleStart + line.rotation;

    // now draw each segment in the arc
    for (let i = 0; i < steps; i++) {
      // point of the unit circle (-1 to 1)
      const x = Math.cos(angle);
      const y = Math.sin(angle);

      // use noise to offset the radius of the arc
      let frequency = 1.5;
      let amplitude = 50;
      let noiseSpeed = 0.25;

      // use the (x, y) coordinate to get a noise value
      let n = simplex.noise3D(x * frequency, y * frequency, time * noiseSpeed);

      // Try stepping the noise for an interesting result!
      // n = n < 0 ? -1 : 1;

      let radiusOffset = n * amplitude;

      // draw an arc with the necessary radius
      const computedRadius = radius + radiusOffset;
      context.lineTo(x * computedRadius, y * computedRadius);

      // increment angle each segment
      angle += angleDelta;
    }

    context.stroke();
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
