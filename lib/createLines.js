const randomFloat = require('random-float');
module.exports = function () {
  // Create N "line" objects which will rotate
  // around the center of the screen.
  const lineCount = 200;
  let lines = [];
  for (let i = 0; i < lineCount; i++) {
    lines[i] = createLine();
  }

  return lines;

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
