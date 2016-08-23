import { vdom, define, prop } from 'skatejs';
import Alignment from './Alignment';
import { enumeration } from 'akutil-common';

export const POSITION_ATTRIBUTE_ENUM = {
  attribute: 'position',
  values: [
    'top left', 'top center', 'top right', 'right top', 'right middle', 'right bottom',
    'bottom left', 'bottom center', 'bottom right', 'left top', 'left middle', 'left bottom',
  ],
  missingDefault: 'right middle',
  invalidDefault: 'right middle',
};

export const CONSTRAIN_ATTRIBUTE_ENUM = {
  attribute: 'constrain',
  values: [
    'window', 'scrollParent',
  ],
  missingDefault: 'window',
  invalidDefault: 'window',
};

/**
 * @description The definition for the Layer component.
 * @class Layer
 * @example @html <ak-layer target="#target"></ak-layer>
 * @example @js import Layer from 'ak-layer';
 * const myLayer = new Layer();
 */
export default define('ak-layer', {
  props: {
    /* eslint-disable max-len */
    /**
     * @description Position of a layer relative to it's target.
     * The position attribute takes two positional arguments in the format `position="edge edge-position"`,
     * where `edge` specifies what edge to align the layer to, and `edge-position` specifies where on that edge the layer should appear.
     * Refer to the table below for examples:
     *
     * |             | top left    | top center    | top right    |              |
     * |-------------|-------------|---------------|--------------|--------------|
     * | left top    |             |               |              | right top    |
     * | left middle |             |    target     |              | right middle |
     * | left bottom |             |               |              | right bottom |
     * |             | bottom left | bottom center | bottom right |              |
     * @memberof Layer
     * @instance
     * @default right middle
     * @type {string}
     * @example @html <ak-layer position="top left"></ak-layer>
     * @example @js layer.position = 'top left';
     */
    /* eslint-enable max-len */
    position: enumeration(POSITION_ATTRIBUTE_ENUM)({
      attribute: true,
    }),
    /**
     * @description Constrain a layer to a scrollable parent or the window
     * @memberof Layer
     * @instance
     * @default 'window'
     * @type String
     * @example @html <ak-layer constrain="scrollParent"></ak-layer>
     * @example @js layer.constrain = 'scrollParent'
     */
    constrain: enumeration(CONSTRAIN_ATTRIBUTE_ENUM)({
      attribute: true,
    }),
    /**
     * @description Target of a layer.
     * Selector or element on a page relative to which layer should be positioned
     * @memberof Layer
     * @instance
     * @type String
     * @example @html <ak-layer target="#target"></ak-layer>
     * @example @js layer.target = document.body.querySelector('#target');
     * @example @js layer.target = '#target'
     */
    target: { attribute: true },
    onRender: {},
    boundariesElement: { attribute: true },
    enableFlip: prop.boolean({
      attribute: true,
    }),
  },
  prototype: {
    reposition() {
      if (this.alignment) {
        this.alignment.reposition();
      }

      return this;
    },
  },
  attached(elem) {
    const options = {
      elem: elem.positionedDOM,
      target: elem.target,
      position: elem.position,
      enableFlip: elem.enableFlip,
    };

    if (elem.boundariesElement) {
      options.boundariesElement = elem.boundariesElement;
    }

    elem.alignment = new Alignment(options);
  },
  detached(elem) {
    if (elem.alignment) {
      elem.alignment.destroy();
    }
  },
  render(elem) {
    if (elem.alignment) {
      elem.alignment.reposition();
    }

    if (elem.onRender) {
      elem.onRender(elem);
    }

    return (
      <div
        ref={(el) => {
          elem.positionedDOM = el;
        }}
      >
        <slot />
      </div>
    );
  },
});
