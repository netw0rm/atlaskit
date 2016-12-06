import React, { PureComponent, PropTypes } from 'react';
import Layer from 'ak-layer';

import styles from 'style!./styles.less';
import { positionToPopperPosition, getAnimationClass } from './internal/helpers';

/* eslint-disable react/no-unused-prop-types */

/**
 * @description React component used to display floating tooltips next to a component.
 * @class Tooltip
 * @example @html <AKTooltip description="Foo!" position="right"><div>Foo</div></AKTooltip>
 */
export default class StatelessTooltip extends PureComponent {
  static propTypes = {
    /**
     * @description The location of where the tooltip will appear, relative to the component it
     * is bound to.
     * Allowed values: top, bottom, left and right.
     * @memberof Tooltip
     * @instance
     * @type {string}
     * @default bottom
    */
    position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    /**
     * @description The text to display in the tooltip when a user hovers or focuses on the
     * wrapped element.
     * @memberof Tooltip
     * @instance
     * @type {string}
     * @default ''
    */
    description: PropTypes.string,
    /**
     * @description Whether or not the tooltip is open and visible on the page.
     * @memberof Tooltip
     * @instance
     * @type {boolean}
     * @default false
    */
    visible: PropTypes.bool,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    children: PropTypes.node,
  }

  static defaultProps = {
    position: 'bottom',
    description: '',
    visible: false,
    onMouseOver: () => {},
    onMouseOut: () => {},
    children: null,
  }

  constructor(props) {
    super(props);
    this.state = { isFlipped: false };
  }

  handleLayerFlipChange = ({ flipped }) => {
    this.setState({ isFlipped: flipped });
  }

  render() {
    const props = this.props;
    const animationClass = getAnimationClass(props.position, this.state.isFlipped);
    const content = props.visible ?
      (<div className={`${styles.tooltip} ${animationClass}`}>{props.description}</div>) :
      null;

    return (
      <div onMouseOver={props.onMouseOver} onMouseOut={props.onMouseOut}>
        <Layer
          position={positionToPopperPosition(props.position)}
          autoPosition
          content={content}
          onFlippedChange={this.handleLayerFlipChange}
        >
          {this.props.children}
        </Layer>
      </div>
    );
  }
}

/* eslint-enable react/no-unused-prop-types */

