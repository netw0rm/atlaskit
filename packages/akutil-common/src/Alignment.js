import Tether from 'tether';

const attachmentMap = {
  'top left': { el: 'bottom left', target: 'top left', animation: 'top' },
  'top center': { el: 'bottom center', target: 'top center', animation: 'top' },
  'top right': { el: 'bottom right', target: 'top right', animation: 'top' },
  'right top': { el: 'top left', target: 'top right', animation: 'right' },
  'right middle': { el: 'middle left', target: 'middle right', animation: 'right' },
  'right bottom': { el: 'bottom left', target: 'bottom right', animation: 'right' },
  'bottom left': { el: 'top left', target: 'bottom left', animation: 'bottom' },
  'bottom center': { el: 'top center', target: 'bottom center', animation: 'bottom' },
  'bottom right': { el: 'top right', target: 'bottom right', animation: 'bottom' },
  'left top': { el: 'top right', target: 'top left', animation: 'left' },
  'left middle': { el: 'middle right', target: 'middle left', animation: 'left' },
  'left bottom': { el: 'bottom right', target: 'bottom left', animation: 'left' },
};

function getPositionFromClasses(classes) {
  const cl = classes.split(' ');
  let position = '';
  let targetClasses;
  let elementClasses;

  targetClasses = cl.filter((val) => val.search('tether-target-attached') === 0);
  targetClasses = targetClasses.map((val) => val.replace('tether-target-attached-', ''));
  elementClasses = cl.filter((val) => val.search('tether-element-attached') === 0);
  elementClasses = elementClasses.map((val) => val.replace('tether-element-attached-', ''));

  Object.keys(attachmentMap).forEach((i) => {
    const el = attachmentMap[i].el;
    const target = attachmentMap[i].target;

    if ((el === elementClasses.join(' ')
      || el === elementClasses.reverse().join(' '))
      && (target === targetClasses.join(' ')
      || target === targetClasses.reverse().join(' '))) {
      position = i;
    }
  });

  return position;
}

function getElement(node) {
  if (typeof node === 'string') {
    const elements = document.querySelectorAll(node);
    if (process.env.NODE_ENV === 'development') {
      if (elements.length > 1) {
        console.warn('Found more than one node, using first.'); // eslint-disable-line no-console
      }
    }
    return elements[0];
  }

  return node || document.body;
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

  destroy() {
    if (this.tether) {
      this.disabled = true;
      this.tether.destroy();
      if (this.renderElement && this.renderElement.parentNode) {
        this.renderElement.parentNode.removeChild(this.renderElement);
        delete this.renderElement;
      }
      this.renderNode = null;
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

    if (!this.renderElement) {
      this.renderElement = elem.renderElement || elem;
    }

    if (!this.renderNode) {
      this.renderNode = getElement(elem.renderElementTo);
      this.renderNode.appendChild(this.renderElement);
    }

    const opts = {
      element: this.renderElement,
      target: getElement(elem.target),
      attachment: attachmentMap[elem.position].el,
      targetAttachment: attachmentMap[elem.position].target,
      constraints: [
        {
          to: elem.attachment || 'window',
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
export { attachmentMap, getPositionFromClasses };
