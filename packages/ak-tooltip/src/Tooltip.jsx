import React, { PureComponent, PropTypes } from 'react';
import Layer from 'ak-layer';

import styles from 'style!./styles.less';


function positionToPopperPosition(position) {
  const allowedPositions = {
    top: 'top center',
    bottom: 'bottom center',
    left: 'left middle',
    right: 'right middle',
  };
  if (allowedPositions[position]) {
    return allowedPositions[position];
  }
  return allowedPositions.bottom;
}

/* eslint-disable react/no-unused-prop-types */

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class Tooltip
 * @example @html <ak-tooltip id='myTooltip'></ak-tooltip>
 * @example @js import Tooltip from 'ak-tooltip';
 * const tooltip = new Tooltip();
 * tooltip.id = 'myTooltip';
 */
export default class StatelessTooltip extends PureComponent {
  static propTypes = {
    /**
     * @description The location of where the tooltip will appear, relative to the component it
     * is bound to. This is usually set by an ak-tooltip-trigger.
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
     * This is normally set by an ak-tooltip-trigger.
     * @memberof Tooltip
     * @instance
     * @type {string}
     * @default none
    */
    description: PropTypes.string,
    /**
     * @description Whether or not the tooltip is open and visible on the page.
     * This is normally set by an ak-tooltip-trigger.
     * @memberof Tooltip
     * @instance
     * @type {boolean}
     * @default none
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

  render() {
    const props = this.props;
    const content = props.visible ?
      (<div className={styles.tooltip}>{props.description}</div>) :
      null;

    return (
      <div onMouseOver={props.onMouseOver} onMouseOut={props.onMouseOut} data-foo="f">
        <Layer
          position={positionToPopperPosition(props.position)}
          autoPosition
          content={content}
        >
          {this.props.children}
        </Layer>
      </div>
    );
  }
}

/* eslint-enable react/no-unused-prop-types */

