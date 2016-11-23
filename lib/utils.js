module.exports.computeStepsForArc = computeStepsForArc;
function computeStepsForArc (radius, angleStart = 0, angleEnd = (Math.PI * 2)) {
  var dist = Math.abs(angleStart - angleEnd);
  if (angleStart > angleEnd) {
    dist = 2 * Math.PI - dist;
  }
  const smoothness = 0.75;
  return Math.max(6, Math.floor(Math.pow(radius, smoothness) * dist));
}

module.exports.wrapAngle = wrapAngle;
function wrapAngle (angle) {
  const max = Math.PI * 2;
  // reduce the angle
  angle = angle % max;
  // force it to be the positive remainder, so that 0 <= angle < max
  angle = (angle + max) % max;
  return angle;
}

module.exports.distanceBetweenAngles = distanceBetweenAngles;
function distanceBetweenAngles (angleStart, angleEnd) {
  return Math.atan2(Math.sin(angleEnd - angleStart), Math.cos(angleEnd - angleStart));
}
