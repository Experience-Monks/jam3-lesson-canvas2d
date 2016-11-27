const randomFloat = require('random-float');

module.exports = function () {
  // Create N "line" objects which will rotate
  // around the center of the screen.
  const lineCount = 50;
  let lines = [];
  for (let i = 0; i < lineCount; i++) {
    lines[i] = createLine();
  }

  return lines;

  // creates a "line" object with some random properties
  function createLine () {
    return {
      angleStart: randomFloat(-Math.PI * 2, Math.PI * 2),
      angleLength: randomFloat(Math.PI * 0.01, Math.PI * 0.5),
      thickness: randomFloat(0.5, 1),
      opacity: randomFloat(0.1, 0.15),
      distanceFromCenter: randomFloat(0.5, 1),
      rotation: randomFloat(-Math.PI * 2, Math.PI * 2),
      rotationDirection: randomFloat(1) > 0.5 ? 1 : -1,
      rotationSpeed: randomFloat(0.0, 0.05)
    };
  }
};
