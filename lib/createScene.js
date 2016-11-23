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

    // draw something
    context.fillStyle = 'black';
    context.fillRect(0, 20, 50, 25);

    // pop the context transform state
    context.restore();
  }
};
