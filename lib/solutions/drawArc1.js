/* eslint no-unused-vars: "off" */
const simplex = new (require('simplex-noise'))();

const {
  computeStepsForArc,
  distanceBetweenAngles
} = require('./utils');

module.exports = function (context, line, radius, angleStart, angleEnd, time = 0) {
  context.rotate(line.rotation);
  context.beginPath();
  context.arc(0, 0, radius, angleStart, angleEnd);
  context.stroke();
  context.rotate(-line.rotation);
};
