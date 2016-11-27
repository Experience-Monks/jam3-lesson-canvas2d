/* eslint no-unused-vars: "off" */
const simplex = new (require('simplex-noise'))();

const {
  computeStepsForArc,
  distanceBetweenAngles
} = require('./utils');

module.exports = function (context, line, index, radius, angleStart, angleEnd, time = 0) {
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
    let noiseAngle = angle;
    // let noiseAngle = Math.abs(Math.asin(Math.sin(angle), Math.cos(angle)));
    // noiseAngle *= (simplex.noise2D(index, line.distanceFromCenter) * Math.PI * 2) / 4;
    const nx = (Math.cos(noiseAngle));
    const ny = (Math.sin(noiseAngle));

    // use the (x, y) coordinate to get a noise value
    let n = 0;
    const timeSpeed = 0.15;
    // const amp = Math.abs(simplex.noise2D(index, time)) * 50;
    let t = 1;
    n += noise(t, nx, ny, time * timeSpeed, 1.5, 50);
    n += noise(t, nx, ny, time * timeSpeed, 4.5, 20);
    n += noise(t, nx, ny, time * timeSpeed, 0.5, 10);
    // n = (n >= 0 ? 1 : -1) * 20;

    let radiusOffset = n;
    let xOff = 0;
    let yOff = 0;

    // draw an arc with the necessary radius
    const computedRadius = radius + n;
    const x = Math.cos(angle);
    const y = Math.sin(angle);
    context.lineTo(x * computedRadius + xOff, y * computedRadius + yOff);

    // increment angle each segment
    angle += angleDelta;
  }

  // context.closePath();
  context.globalAlpha = line.opacity;
  context.stroke();
};

function noise (i, x, y, time, frequency, amplitude) {
  let n = amplitude * simplex.noise3D(x * frequency, y * frequency, time);
  // n = n >= 0 ? amplitude : -amplitude;
  return n;
}
