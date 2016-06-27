import Tether from 'tether';

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

function Alignment(elem) {
  this.tether = new Tether({
    element: elem.movable ? elem.movable : elem,
    target: document.querySelector(elem.target),
    attachment: getTargetsFromPosition(elem.position, 'reverse'),
    targetAttachment: getTargetsFromPosition(elem.position),
    constraints: [
      {
        to: 'window',
        attachment: 'together',
      },
    ],
  });

  return this;
}

Alignment.prototype = {
  destroy() {
    if (this.tether) {
      this.tether.destroy();
    }
    return this;
  },

  disable() {
    if (this.tether) {
      this.tether.disable();
    }
    return this;
  },

  enable() {
    if (this.tether) {
      this.tether.enable();
    }
    return this;
  },

  update(elem) {
    if (this.tether) {
      this.tether.setOptions({
        element: elem.movable ? elem.movable : elem,
        target: document.querySelector(elem.target),
        attachment: getTargetsFromPosition(elem.position, 'reverse'),
        targetAttachment: getTargetsFromPosition(elem.position),
      });
    }
    return this;
  },

  reposition() {
    if (this.tether) {
      this.tether.position();
    }
    return this;
  },

  getAlignmentSnap,
};

export default Alignment;
