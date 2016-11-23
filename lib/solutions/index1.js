const createLoop = require('raf-loop');

// get Canvas2D
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

// pixel density, no higher than 2x for performance
const pixelRatio = Math.min(2, window.devicePixelRatio);

// an object holding our application state
const app = {
  canvas,
  context,
  pixelRatio,
  width: 0, // will be set on resize()
  height: 0
};

// listen for window resizing
window.addEventListener('resize', resize);

// set initial sizes before setting up scene & loop
resize();

// start a draw loop
createLoop(draw).start();

function resize () {
  // set up a retina-scaled canvas
  app.width = window.innerWidth;
  app.height = window.innerHeight;
  canvas.width = Math.floor(app.width * pixelRatio);
  canvas.height = Math.floor(app.height * pixelRatio);
  canvas.style.width = `${app.width}px`;
  canvas.style.height = `${app.height}px`;
}

function draw (dt) {
  const { width, height } = app;

  // push context transform state
  context.save();

  // scale everything so it works with pixel ratio
  context.scale(pixelRatio, pixelRatio);

  // clear canvas every frame
  context.clearRect(0, 0, width, height);

  // draw something
  context.fillRect(0, 20, 50, 25);

  // pop context transform state
  context.restore();
}
