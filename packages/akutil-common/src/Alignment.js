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

function Alignment(elem) {
  this.disabled = false;

  this.update(elem);
  return this;
}

Alignment.prototype = {
  disable() {
    if (this.tether) {
      this.disabled = true;
      this.tether.disable();
    }
    return this;
  },

  enable() {
    if (this.tether) {
      this.disabled = false;
      this.tether.enable();
    }
    return this;
  },

  update(elem) {
    if (this.disabled || !elem.position || !elem.target) {
      return this;
    }

    let opts = {
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
    };

    if (!this.tether) {
      this.tether = new Tether(opts);
    } else {
      this.tether.setOptions(opts);
    }

    this.tether.position();

    return this;
  },

  reposition() {
    if (this.tether) {
      this.tether.position();
    }
    return this;
  },
};

export default Alignment;
