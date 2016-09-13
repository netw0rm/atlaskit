import { vdom, define, prop } from 'skatejs';
import { reCreateAlignmentIfNeeded, createNewAlignment } from './internal/helpers';
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
      set: reCreateAlignmentIfNeeded,
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
    target: {
      attribute: true,
      set: reCreateAlignmentIfNeeded,
    },
    /**
     * @description Callback function that is called whenever layer is rendered.
     * The Layer element will be passed in as an argument.
     * @memberof Layer
     * @instance
     * @type function
     * @example @js layer.onRender = (elem) => { console.log(elem); };
     */
    onRender: {},
    /**
     * @description Element to act as a boundary for the Layer.
     * The Layer will not sit outside this element if it can help it.
     * If, through it's normal positoning, it would end up outside the boundary the layer
     * will flip positions if the enableFlip prop is set.
     * Can either be an element or a selector of an element.
     * If not set the boundary will be the current viewport.
     * @memberof Layer
     * @instance
     * @type HTMLElement | String
     * @example @html <ak-layer enableFlip boundariesElement="#container"></ak-layer>
     * @example @js layer.taboundariesElementrget = document.body.querySelector('#container');
     * @example @js layer.enableFlip = true;
     */
    boundariesElement: {
      attribute: true,
      set: reCreateAlignmentIfNeeded,
    },
    /**
     * @description Sets whether a Layer will flip it's position if there is not enough space in
     * the requested position.
     * i.e. if a layer is set to position="top middle" but placing it there would cause
     * it to be outside the viewport (or the boundariesElement if that is set)
     * the Layer will instead be positioned in "bottom middle".
     * @memberof Layer
     * @instance
     * @type Boolean
     * @example @html <ak-layer enableFlip></ak-layer>
     * @example @js layer.enableFlip = true;
     */
    enableFlip: prop.boolean({
      attribute: true,
      set: reCreateAlignmentIfNeeded,
    }),
    /**
     * @description A string representing the offsets from the target element in the format
     * "[x-offset] [y-offset]", measured in pixels.
     * @memberof Layer
     * @instance
     * @type String
     * @example @html <ak-layer offset="0 2"></ak-layer>
     * @example @js layer.offset = '0 2';
     */
    offset: {
      attribute: true,
      set: reCreateAlignmentIfNeeded,
    },
    // internal property, no docs required
    _isFlipped: prop.boolean(),
  },
  prototype: {
    /**
     * @description Forces the Inline-Dialog to recalculate and reposition itself on the page.
     * This should not usually be required as any modifications to the Layer itself should also
     * cause reposition to be called.
     * @memberof InlineDialog
     * @function
     * @instance
     * @return undefined
     * @example @js inlineDialog.reposition();
    */
    reposition() {
      if (this.alignment) {
        this.alignment.reposition();
      }

      return this;
    },
    /**
     * @description Will be true if a Layer has been flipped from its original position.
     * @memberof InlineDialog
     * @instance
     * @return Boolean
     * @example @js const isFlipped = elem.isFlipped;
    */
    get isFlipped() {
      return !!this._isFlipped; // eslint-disable-line no-underscore-dangle
    },
  },
  attached(elem) {
    elem.alignment = createNewAlignment(elem);
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
      <div ref={(el) => (elem.positionedDOM = el)}>
        <slot />
      </div>
    );
  },
});
