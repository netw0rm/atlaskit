import styles from 'style!../styles/profilecard-trigger.less';

const getActualPosition = (position, isFlipped) => {
  const flippedPositions = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  };

  return isFlipped ? flippedPositions[position] : position;
};

// eslint-disable-next-line import/prefer-default-export
export function getAnimationClass(position, isFlipped) {
  const animationMapping = {
    top: styles.slideUpAnimation,
    bottom: styles.slideDownAnimation,
    left: styles.slideLeftAnimation,
    right: styles.slideRightAnimation,
  };

  const adjustedPosition = getActualPosition(position, isFlipped);

  return animationMapping[adjustedPosition] ? animationMapping[adjustedPosition] : null;
}
