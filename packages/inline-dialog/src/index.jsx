import Layer from '@atlaskit/layer';
import React, { PureComponent, PropTypes } from 'react';
import { akGridSize } from '@atlaskit/util-shared-styles';

import styles from 'style!./styles.less';

// remove the 'px' from the grid size, 10 is the radix
const akGridSizeValue = parseInt(akGridSize, 10);
// this offset is passed to popper as two space separated numbers representing the offset from the
// target the first is distance along the same axis you are on (top or bottom aligned would move
// left/right) and the second is on the perpendicular axis (how far 'away' you are from the target)
// both are measured in pixels
const dialogOffset = `0 ${akGridSizeValue}`;

/* eslint-disable react/no-unused-prop-types */
export default class AKInlineDialog extends PureComponent {
  static propTypes = {
    // TODO: expose these from Layer and pull in here
    position: PropTypes.oneOf([
      'top left', 'top center', 'top right', 'right top', 'right middle', 'right bottom',
      'bottom left', 'bottom center', 'bottom right', 'left top', 'left middle', 'left bottom',
    ]),
    isOpen: PropTypes.bool,
    content: PropTypes.node,
    shouldFlip: PropTypes.bool,
    onContentClick: PropTypes.func,
    onContentFocus: PropTypes.func,
    onContentBlur: PropTypes.func,
  }

  static defaultProps = {
    position: 'bottom center',
    isOpen: false,
    content: null,
    shouldFlip: false,
    onContentClick: () => {},
    onContentFocus: () => {},
    onContentBlur: () => {},
  }

  /* eslint-disable jsx-a11y/no-static-element-interactions */
  render() {
    const { props } = this;
    const content = (<div className={styles.inlineDialogContainer} tabIndex="-1">
      {props.content}
    </div>);

    return (
      <Layer
        content={props.isOpen ?
          <div
            onClick={props.onContentClick}
            onFocusCapture={props.onContentFocus}
            onBlurCapture={props.onContentBlur}
          >
            {content}
          </div>
          : null}
        position={props.position}
        autoPosition={props.shouldFlip}
        offset={dialogOffset}
      >
        <div>
          {props.children}
        </div>
      </Layer>);
  }
  /* eslint-enable jsx-a11y/no-static-element-interactions */
}

/* eslint-enable react/no-unused-prop-types */
