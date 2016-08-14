import Tether from 'atlassian-tether';

/**
 * @description Helper class for positioning elements on a page
 * @class Alignment
 * @example @js import Alignment from 'akutil-common';
 * const alignment = new Alignment({});
 */
export default class Alignment {
  /**
   * @description Create an alignment.
   * @param {object} elem - Options
   */
  constructor(elem) {
    this.disabled = false;
    this.update(elem);
  }
  /**
   * @description Disable positioning
   * @example @js alignment.disable();
   */
  disable() {
    if (this.tether) {
      this.disabled = true;
      this.tether.disable();
    }
    return this;
  }
  /**
   * @description Disable positioning and destroy element.
   * Being used in the ak-layer component on the 'detached' event
   * @example @js alignment.destroy();
   */
  destroy() {
    if (this.tether) {
      this.disabled = true;
      this.tether.destroy();
    }

    return this;
  }
  /**
   * @description Enable positioning after disabling
   * @example @js alignment.enable();
   */
  enable() {
    if (this.tether) {
      this.disabled = false;
      this.tether.enable();
    }
    return this;
  }
  /* eslint-disable max-len  */
  /**
   * @description Update the positioning.
   * It either creates a new Tether object or updates the current object with the new options.
   * If the positioning is disabled or there is no target element, then this function will do nothing.
   * @example @js alignment.update(elem);
   * @param {object} elem - Options
   */
  /* eslint-enable max-len */
  update(elem) {
    const { defaultPosition, defaultConstraint, getElement, attachmentMap } = this.constructor;

    if (this.disabled || !elem.target || !getElement(elem.target)) {
      return this;
    }

    const position = attachmentMap[elem.position] || attachmentMap[defaultPosition];
    const opts = {
      element: elem,
      target: getElement(elem.target),
      attachment: position.el,
      targetAttachment: position.target,
      constraints: [
        {
          to: elem.attachment || defaultConstraint,
          attachment: 'together',
        },
      ],
    };

    opts.optimizations = {
      doNotMoveInDOM: true,
    };

    if (!this.tether) {
      this.tether = new Tether(opts);
    } else {
      this.tether.setOptions(opts);
    }

    this.tether.position();

    return this;
  }

  /**
   * @description Manually trigger the repositioning
   * @example @js alignment.update(elem);
   */
  reposition() {
    if (this.tether) {
      this.tether.position();
    }
    return this;
  }
  /**
   * @description Returns a position from the Tether-classes.
   * @example @js const position = alignment.getPositionFromClasses(stringWithClassesOnAnElement);
   */
  getPositionFromClasses(classes) {
    if (!classes) return '';
    const { attachmentMap } = this.constructor;
    const cl = classes.split(/\s+/g);
    let position = '';
    let targetClasses;
    let elementClasses;

    targetClasses = cl.filter((val) => val.search('tether-target-attached') === 0);
    targetClasses = targetClasses.map((val) => val.replace('tether-target-attached-', ''));
    elementClasses = cl.filter((val) => val.search('tether-element-attached') === 0);
    elementClasses = elementClasses.map((val) => val.replace('tether-element-attached-', ''));

    const elementClassesString = elementClasses.join(' ');
    const elementClassesStringReverse = elementClasses.reverse().join(' ');
    const targetClassesString = targetClasses.join(' ');
    const targetClassesStringReverse = targetClasses.reverse().join(' ');

    Object.keys(attachmentMap).forEach((i) => {
      const el = attachmentMap[i].el;
      const target = attachmentMap[i].target;

      if ((el === elementClassesString
        || el === elementClassesStringReverse)
        && (target === targetClassesString
        || target === targetClassesStringReverse)) {
        position = i;
      }
    });

    return position;
  }
  /* eslint-disable max-len  */
  /**
   * @description Returns an element from a selector or the element itself if it was passed as an argument
   * @example @js Alignment.getElement('#TargetId');
   */
  /* eslint-enable max-len */
  static getElement(node) {
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
  /**
   * @description Default position
   * @return {String} A string with the default position
   */
  static get defaultPosition() {
    return 'right middle';
  }
  /**
   * @description Default constraint
   * @return {String} A string with the default constraint
   */
  static get defaultConstraint() {
    return 'window';
  }
  /**
   * @description Transformation map from position to Tether-required points
   * @return {Object} Map of transformations
   */
  static get attachmentMap() {
    return {
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
  }
}
