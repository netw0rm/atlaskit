import React, { Component, PropTypes } from 'react';
import Popper from 'popper.js';

import {
  POSITION_ATTRIBUTE_ENUM,
  createNewPopper,
  positionPropToPopperPosition
} from './internal/helpers';

/* eslint-disable react/no-unused-prop-types */


export default class extends Component {
  static get propTypes() {
    return {
      position: PropTypes.oneOf(POSITION_ATTRIBUTE_ENUM.values),
      boundariesElement: PropTypes.node,
      enableFlip: PropTypes.bool,
      offset: PropTypes.string, // possibly look at refactoring this
      onUpdate: PropTypes.func,
      children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
      ]),
    };
  }

  static get defaultProps() {
    return {
      position: POSITION_ATTRIBUTE_ENUM.missingDefault,
      target: '',
      boundariesElement: null,
      enableFlip: true,
      offset: '',
      onUpdate: () => {},
      children: null,
    };
  }

  componentDidMount() {
    this.applyPopper();
  }

  componentDidUpdate() {
    this.applyPopper();
  }

  applyPopper() {
    if (this.popper) {
      this.popper.destroy();
    }

    this.popper = new Popper(this.refs.targetRef, this.refs.contentRef, {
      placement: positionPropToPopperPosition(this.props.position),
      modifiers: {
        applyStyle: {
          enabled: false
        }
      },
    });

    const applyStyle = (state) => {
      if (!state) {
        return {};
      }

      const left = Math.round(state.offsets.popper.left);
      const top = Math.round(state.offsets.popper.top);

      Object.assign(this.refs.contentRef.style, {
        position: state.offsets.popper.position,
        transform: `translate3d(${left}px, ${top}px, 0px)`,
        top: 0,
        left: 0,
      });
    };

    this.popper.onCreate(applyStyle);
    this.popper.onUpdate(applyStyle);
  }

  componentWillUnmount() {
    if (this.popper) {
      this.popper.destroy();
    }
  }

  render() {
    return (
      <div>
        <div ref='targetRef'>
          {this.props.children[0]}
        </div>
        <div ref='contentRef'>
          {this.props.children[1]}
        </div>
      </div>
    );
  }
}

/**
 * @description The layer is responsible for the positioning of an element on a page.
 * @class Layer
 * @example @html <ak-layer target="#target"></ak-layer>
 * @example @js import Layer from 'ak-layer';
 * const myLayer = new Layer();
 */

/**
 * @description Position of a layer relative to it's target.
 * The position attribute takes two positional arguments in the
 * format `position="edge edge-position"`, where `edge` specifies what edge to align the layer
 * to, and `edge-position` specifies where on that edge the layer should appear.
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
/**
 * @description Element to act as a boundary for the Layer.
 * The Layer will not sit outside this element if it can help it.
 * If, through it's normal positoning, it would end up outside the boundary the layer
 * will flip positions if the enable-flip prop is set.
 * Can either be an element or a selector of an element.
 * If not set the boundary will be the current viewport.
 * @memberof Layer
 * @instance
 * @type HTMLElement | String
 * @example @html <ak-layer enable-flip boundaries-element="#container"></ak-layer>
 * @example @js layer.boundariesElement = document.body.querySelector('#container');
 * @example @js layer.enableFlip = true;
 */
/**
 * @description Sets whether a Layer will flip it's position if there is not enough space in
 * the requested position.
 * i.e. if a layer is set to position="top middle" but placing it there would cause
 * it to be outside the viewport (or the boundariesElement if that is set)
 * the Layer will instead be positioned in "bottom middle".
 * @memberof Layer
 * @instance
 * @type Boolean
 * @example @html <ak-layer enable-flip></ak-layer>
 * @example @js layer.enableFlip = true;
 */
/**
 * @description A string representing the offsets from the target element in the format
 * "[x-offset] [y-offset]", measured in pixels.
 * @memberof Layer
 * @instance
 * @type String
 * @example @html <ak-layer offset="0 2"></ak-layer>
 * @example @js layer.offset = '0 2';
 */
/**
 * @description Callback function that is called whenever layer is updated (it is rendered, it
 * flips positition because it does not have enough space, etc).
 * The callback will receive an object with the following properties:
 * * `isFlipped` - boolean representing whether a layer has flipped from its original position.
 * * `originalPosition` - the position the element was supposed to be rendered.
 * * `actualPositon` - the position the element is actually in now after the update.
 * @memberof Layer
 * @instance
 * @type function
 * @example @js layer.onUpdate = (data) => { console.log(data.isFlipped); };
 */

/**
 * @description Forces the Layer to recalculate and reposition itself on the page.
 * This should not usually be required as any modifications to the Layer itself should also
 * cause reposition to be called.
 * @memberof Layer
 * @function
 * @instance
 * @return Layer
 * @example @js layer.reposition();
*/
/**
 * @description Will be true if a Layer has been flipped from its original position.
 * @memberof Layer
 * @instance
 * @type Boolean
 * @example @js const isFlipped = elem.isFlipped;
*/
