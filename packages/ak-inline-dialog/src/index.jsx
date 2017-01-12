import Layer from 'ak-layer';
import React, { PureComponent, PropTypes } from 'react';

import shadowStyles from 'style!./styles.less';

/* eslint-disable react/no-unused-prop-types */
export default class AKInlineDialog extends PureComponent {
  static propTypes = {
    position: PropTypes.oneOf([
      'top left', 'top center', 'top right', 'right top', 'right middle', 'right bottom',
      'bottom left', 'bottom center', 'bottom right', 'left top', 'left middle', 'left bottom',
    ]),
    open: PropTypes.bool,
    content: PropTypes.node,
    enableFlip: PropTypes.bool,
  }

  static defaultProps = {
    position: 'bottom center',
    open: false,
    content: null,
    enableFlip: false,
  }

  render() {
    const props = this.props;
    const content = (<div className={shadowStyles.inlineDialogContainer}>
      {props.content}
    </div>);

    return (<div>
      <Layer
        content={props.open ? content : null}
        position={props.position}
        enableFlip={props.enableFlip}
        offset="0 8"
      >
        <div >
          {props.children}
        </div>
      </Layer>
    </div>);
  }
}

/* eslint-enable react/no-unused-prop-types */

/*
    constrain: enumeration(CONSTRAIN_ATTRIBUTE_ENUM)({
      attribute: true,
    }),

    boxShadow: prop.string({
      attribute: true,
    }),

    borderColor: prop.string({
      attribute: true,
    }),

    borderRadius: prop.string({
      attribute: true,
    }),

    padding: prop.string({
      attribute: true,
    }),

    hasBlanket: prop.boolean({
      attribute: true,
      default: true,
    }),

    isBlanketClickable: prop.boolean({
      attribute: true,
      default: true,
    }),

    isBlanketTinted: prop.boolean({
      attribute: true,
    }),

    isClosableOnEsc: prop.boolean({
      attribute: true,
    }),

    boundariesElement: { attribute: true },

  */
