import Layer from 'ak-layer';
import React, { PureComponent, PropTypes } from 'react';

import shadowStyles from 'style!./styles.less';

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
  }

  static defaultProps = {
    position: 'bottom center',
    isOpen: false,
    content: null,
    shouldFlip: false,
  }

  render() {
    const props = this.props;
    const content = (<div className={shadowStyles.inlineDialogContainer}>
      {props.content}
    </div>);

    return (<div>
      <Layer
        content={props.isOpen ? content : null}
        position={props.position}
        autoPosition={props.shouldFlip}
        offset="0 8"
      >
        <div>
          {props.children}
        </div>
      </Layer>
    </div>);
  }
}

/* eslint-enable react/no-unused-prop-types */
