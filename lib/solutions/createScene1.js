/* eslint no-unused-vars: "off" */
const createLines = require('./createLines');
const drawArc = require('./drawArc');

module.exports = function (app) {
  // global time counter in seconds
  let time = 0;

  return {
    draw
  };

  function draw (dt) {
    time += dt / 1000;

    // get app properties
    const { width, height, context } = app;

    // this is how much we will scale our circle by
    const radialScale = (1 / 3) * Math.min(width, height);

    // draw a circle
    context.beginPath();
    context.arc(width / 2, height / 2, radialScale, 0, Math.PI * 2);
    context.lineWidth = 4;
    context.strokeStyle = 'black';
    context.stroke();
  }
};
