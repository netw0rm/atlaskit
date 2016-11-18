import Popper from 'popper.js';
import assign from 'object-assign';
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
  constructor(options) {
    if (!options.target || !options.elem) return;
    const { defaultPosition, getElement, attachmentMap } = this.constructor;
    const opts = assign({
      position: defaultPosition,
    }, options);

    const position = attachmentMap[opts.position]
      ? attachmentMap[opts.position].position
      : attachmentMap[defaultPosition].position;

    const popperOptions = {
      placement: position,
      modifiers: {},
    };

    if (options.boundariesElement) {
      popperOptions.boundariesElement = getElement(options.boundariesElement);
    }

    if (options.offset) {
      popperOptions.modifiers.offset = {
        offset: options.offset,
      };
    }

    if (options.enableFlip) {
      popperOptions.modifiers.preventOverflow = {
        enabled: true,
        moveWithTarget: true,
      };
      popperOptions.modifiers.flip = {
        enabled: true,
        flipVariations: true,
      };
    } else {
      popperOptions.modifiers.preventOverflow = {
        enabled: false,
      };
      popperOptions.modifiers.flip = {
        enabled: false,
      };
    }

    /* eslint-disable no-console */
    console.log('new Popper(', popperOptions);

    this.popper = new Popper(
      getElement(opts.target),
      getElement(opts.elem),
      popperOptions
    );

    if (opts.onUpdate) {
      this.popper.onUpdate(opts.onUpdate);
    }

    if (opts.onCreate) {
      this.popper.onCreate(opts.onCreate);
    }
  }
  /**
   * @description Disable positioning and destroy element.
   * Being used in the ak-layer component on the 'detached' event
   * @example @js alignment.destroy();
   */
  destroy() {
    if (this.popper) {
      this.popper.destroy();
    }

    return this;
  }
  /**
   * @description Manually trigger the repositioning
   * @example @js alignment.reposition();
   */
  reposition() {
    if (this.popper) {
      this.popper.update();
    }
    return this;
  }

  /**
   * @description
   * Returns an element from a selector or the element itself if it was passed as an argument
   * @example @js Alignment.getElement('#TargetId');
   */
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
   * @description Transformation map from ak-positions to popper-positions
   * @return {Object} Map of transformations
   */
  static get attachmentMap() {
    return {
      'top left': { position: 'top-start', animation: 'top' },
      'top center': { position: 'top', animation: 'top' },
      'top right': { position: 'top-end', animation: 'top' },
      'right top': { position: 'right-start', animation: 'right' },
      'right middle': { position: 'right', animation: 'right' },
      'right bottom': { position: 'right-end', animation: 'right' },
      'bottom left': { position: 'bottom-start', animation: 'bottom' },
      'bottom center': { position: 'bottom', animation: 'bottom' },
      'bottom right': { position: 'bottom-end', animation: 'bottom' },
      'left top': { position: 'left-start', animation: 'left' },
      'left middle': { position: 'left', animation: 'left' },
      'left bottom': { position: 'left-end', animation: 'left' },
    };
  }
}
