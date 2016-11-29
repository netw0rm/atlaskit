import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';

import RemoveIcon from './RemoveIcon';

/* eslint-disable react/prefer-stateless-function */
export default class RemoveButton extends PureComponent {
  static propTypes = {
    removeText: PropTypes.string.isRequired,
    onHoverChange: PropTypes.func,
    onRemoveAction: PropTypes.func,
  }

  render = () => (<button
    className={styles.button} aria-label={this.props.removeText}
    onMouseOver={() => this.props.onHoverChange(true)}
    onMouseOut={() => this.props.onHoverChange(false)}
    onClick={this.props.onRemoveAction}
  >
    <RemoveIcon />
  </button>)
}
