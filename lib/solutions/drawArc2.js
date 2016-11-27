/* eslint no-unused-vars: "off" */
const simplex = new (require('simplex-noise'))();

const {
  computeStepsForArc,
  distanceBetweenAngles
} = require('./utils');

module.exports = function (context, line, radius, angleStart, angleEnd, time = 0) {
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
};
