import React, { PureComponent, PropTypes } from 'react';
import Popper from 'popper.js';

import { POSITION_ATTRIBUTE_ENUM, positionPropToPopperPosition } from './internal/helpers';

/* eslint-disable react/no-unused-prop-types */

/**
 * @description The layer is responsible for the positioning of an element on a page relative to
 * another element.
 * @class Layer
 */
export default class Layer extends PureComponent {
  static propTypes = {
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
     * @default "right middle"
     * @type String
     * @example @html <Layer position="top left"></Layer>
     */
    position: PropTypes.oneOf(POSITION_ATTRIBUTE_ENUM.values),
    /**
     * @description Element to act as a boundary for the Layer.
     * The Layer will not sit outside this element if it can help it.
     * If, through it's normal positoning, it would end up outside the boundary the layer
     * will flip positions if the enable-flip prop is set.
     *
     * Valid values are "window" and "viewport"
     * If not set the boundary will be the current viewport.
     * @memberof Layer
     * @instance
     * @default "viewport"
     * @type String
     * @example @html <Layer shouldFlip boundariesElement="window"></Layer>
     */
    boundariesElement: PropTypes.oneOf(['viewport', 'window']),
    /**
     * @description Sets whether a Layer will flip it's position if there is not enough space in
     * the requested position.
     * i.e. if a layer is set to position="top middle" but placing it there would cause
     * it to be outside the viewport (or the boundariesElement if that is set)
     * the Layer will instead be positioned in "bottom middle".
     * @memberof Layer
     * @instance
     * @type Boolean
     * @example @html <Layer autoPosition></Layer>
    */
    autoPosition: PropTypes.bool,
    /**
     * @description A string representing the offsets from the target element in the format
     * "[x-offset] [y-offset]", measured in pixels.
     * @memberof Layer
     * @instance
     * @type String
     * @example @html <Layer offset="0 2"></Layer>
    */
    offset: PropTypes.string,
    /**
     * @description Target of a layer.
     * Element on a page relative to which layer should be positioned.
     * @memberof Layer
     * @instance
     * @type String
     * @example @html <Layer target={this.targetRef}></Layer>
     */
    target: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    position: POSITION_ATTRIBUTE_ENUM.default,
    boundariesElement: 'viewport',
    autoPosition: true,
    offset: '',
    target: null,
    children: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      position: null,
      transform: null,
    };
  }

  componentDidMount() {
    this.applyPopper(this.props);
  }

  componentWillUnmount() {
    if (this.popper) {
      this.popper.destroy();
    }
  }

  componentWillRecieveProps(nextProps) {
    this.applyPopper(nextProps);
  }

  applyPopper(props) {
    if (!this.targetRef || !this.contentRef) {
      return;
    }
    if (this.popper) {
      this.popper.destroy();
    }

    this.popper = new Popper(this.targetRef, this.contentRef, {
      placement: positionPropToPopperPosition(props.position),
      boundariesElement: this.props.boundariesElement,
      modifiers: {
        applyStyle: {
          enabled: false,
        },
        offset: {
          enabled: true,
          offset: this.props.offset,
        },
        flip: {
          enabled: this.props.autoPosition,
          flipVariations: true,
        },
        preventOverflow: {
          enabled: this.props.autoPosition,
          moveWithTarget: true,
        },
      },
    });

    const extractStyles = (state) => {
      if (state) {
        const left = Math.round(state.offsets.popper.left);
        const top = Math.round(state.offsets.popper.top);

        this.setState({
          position: state.offsets.popper.position,
          transform: `translate3d(${left}px, ${top}px, 0px)`,
        });
      }
    };

    this.popper.onCreate(extractStyles);
    this.popper.onUpdate(extractStyles);
  }

  render() {
    const { position, transform } = this.state;
    return (
      <div>
        <div ref={ref => (this.targetRef = ref)}>
          {this.props.target}
        </div>
        <div ref={ref => (this.contentRef = ref)} style={{ top: 0, left: 0, position, transform }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

/* eslint-enable react/no-unused-prop-types */
