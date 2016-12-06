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
     * @description Position of a layer relative to its target.
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
     * will flip positions if the autoPosition prop is set.
     *
     * Valid values are "window" and "viewport"
     * If not set the boundary will be the current viewport.
     * @memberof Layer
     * @instance
     * @default "viewport"
     * @type String
     * @example @html <Layer autoPosition boundariesElement="window"></Layer>
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
     * @example @html <Layer autoPosition={true}></Layer>
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
     * @description HTML content to display in the layer. Will be aligned to the target according to
     * the `position` prop.
     * @memberof Layer
     * @instance
     * @type ReactElement
     * @example @html
     * const myContent = (<div>Some content</div>);
     *
     * ReactDOM.render(<Layer position="right middle" content={myContent}>
     *   <div>I'm the target!</div>
     * </Layer>, container);
     */
    content: PropTypes.node,
    /**
     * @description Callback that is used to know when the `flipped` state of Layer changes. This
     * occurs when placing a Layered element in the requested position would cause Layer to be
     * rendered outside of the boundariesElement (usually viewport).
     *
     * The callback will be passed an object with the following properties:
     * | Key       | Type    | Description                                                      |
     * | --------- | ------- | ---------------------------------------------------------------- |
     * | flipped   | boolean | whether the Layer has been moved away from its original position |
     * | actualPosition      | string  | the current position of the Layer ("top left", etc)    |
     * | originalPosition    | string | the position that Layer originally tried to position to |
     *
     * @memberof Layer
     * @instance
     * @type Function
     * @example @html
     * const handleFlipChange = ({ flipped, actualPosition, originalPosition }) => { ... };
     *
     * ReactDOM.render(<Layer position="right middle" onFlippedChange={handleFlipChange}>
     *   <div>I'm the target!</div>
     * </Layer>, container);
     */
    onFlippedChange: PropTypes.func,
    children: PropTypes.node,
  }

  static defaultProps = {
    position: POSITION_ATTRIBUTE_ENUM.default,
    boundariesElement: 'viewport',
    autoPosition: true,
    offset: '0 0',
    content: null,
    onFlippedChange: () => {},
    children: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      position: null,
      transform: null,
      flipped: false,
      actualPosition: null,
      originalPosition: null,
    };
  }

  componentDidMount() {
    this.applyPopper(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.applyPopper(nextProps);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.flipped !== this.state.flipped) {
      this.props.onFlippedChange({
        flipped: this.state.flipped,
        actualPosition: this.state.actualPosition,
        originalPosition: this.state.originalPosition,
      });
    }
  }

  componentWillUnmount() {
    if (this.popper) {
      this.popper.destroy();
    }
  }

  applyPopper(props) {
    if (!this.targetRef || !this.contentRef) {
      return;
    }
    if (this.popper) {
      this.popper.destroy();
    }
    // we wrap our target in a div so that we can safely get a reference to it, but we pass the
    // actual target to popper
    const actualTarget = this.targetRef.firstChild;

    this.popper = new Popper(actualTarget, this.contentRef, {
      placement: positionPropToPopperPosition(props.position),
      boundariesElement: this.props.boundariesElement,
      modifiers: {
        applyStyle: {
          enabled: false,
        },
        hide: {
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
          // position: fixed or absolute
          CssPosition: state.offsets.popper.position,
          transform: `translate3d(${left}px, ${top}px, 0px)`,
          // state.flipped is either true or undefined
          flipped: !!state.flipped,
          actualPosition: state.position,
          originalPosition: state.originalPosition,
        });
      }
    };

    this.popper.onCreate(extractStyles);
    this.popper.onUpdate(extractStyles);
  }

  render() {
    const { CssPosition, transform } = this.state;
    return (
      <div>
        <div ref={ref => (this.targetRef = ref)}>
          {this.props.children}
        </div>
        <div
          ref={ref => (this.contentRef = ref)}
          style={{ top: 0, left: 0, position: CssPosition, transform }}
        >
          {this.props.content}
        </div>
      </div>
    );
  }
}

/* eslint-enable react/no-unused-prop-types */
