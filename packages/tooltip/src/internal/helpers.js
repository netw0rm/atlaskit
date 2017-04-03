import styles from '../styles.less';

// This hack is to make sure that styles.locals exists when style loading is a noop (when we are
// running tests).
// TODO: Remove in AK-2025
styles.locals = styles.locals || {};

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

export function getAnimationClass(position, isFlipped) {
  const animationMapping = {
    top: styles.locals.slideUpAnimation,
    bottom: styles.locals.slideDownAnimation,
    left: styles.locals.slideLeftAnimation,
    right: styles.locals.slideRightAnimation,
  };
  const flippedPositions = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  };

  const adjustedPosition = isFlipped ? flippedPositions[position] : position;
  return animationMapping[adjustedPosition] ? animationMapping[adjustedPosition] : null;
}
