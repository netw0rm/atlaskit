// eslint-disable-next-line import/prefer-default-export
export function positionToPopperPosition(position) {
  const allowedPositions = {
    top: 'top center',
    bottom: 'bottom center',
    left: 'left middle',
    right: 'right middle',
  };
  if (allowedPositions[position]) {
    return allowedPositions[position];
  }
  return allowedPositions.bottom;
}
