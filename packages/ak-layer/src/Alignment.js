function getReverseDirection(pos) { // eslint-disable-line consistent-return
  switch (pos) {  // eslint-disable-line default-case
    case 'left':
      return 'right';
    case 'right':
      return 'left';
    case 'top':
      return 'bottom';
    case 'bottom':
      return 'top';
  }
}

function getTargetsFromPosition(position, isReverse) {
  const pos = position.split(' ');
  let vertical;
  let horizontal;

  if (pos[0] === 'left' || pos[0] === 'right') {
    vertical = pos[1];
    horizontal = isReverse ? getReverseDirection(pos[0]) : pos[0];
  } else {
    vertical = isReverse ? getReverseDirection(pos[0]) : pos[0];
    horizontal = pos[1];
  }

  return `${vertical} ${horizontal}`;
}

function getAlignmentSnap(target, container) {
  let snapHorizontal = 'right';

  if (!container || container === window || container === document) {
    container = document.documentElement; // eslint-disable-line no-param-reassign
  }

  if (container && container.nodeType && container.nodeType === Node.ELEMENT_NODE) {
    const containerBounds = container.getBoundingClientRect();
    const targetBounds = target.getBoundingClientRect();

    if (targetBounds.left > containerBounds.right / 2) {
      snapHorizontal = 'left';
    }
  }

  return {
    horizontal: snapHorizontal,
  };
}


export default {
  getTarget: getTargetsFromPosition,
  getAlignmentSnap,
};
