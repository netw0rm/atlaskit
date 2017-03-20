import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';

import RemoveIcon from './RemoveIcon';

export default class RemoveButton extends PureComponent {
  static propTypes = {
    removeText: PropTypes.string.isRequired,
    onHoverChange: PropTypes.func,
    onRemoveAction: PropTypes.func,
  }

  onKeyPress = (e) => {
    if (e.charCode === 32 || e.charCode === 13) {
      e.stopPropagation();
      this.props.onRemoveAction();
    }
  }

  onMouseOver = () => {
    this.props.onHoverChange(true);
  };

  onMouseOut = () => {
    this.props.onHoverChange(false);
  }

  render() {
    return (
      <button
        className={styles.button} aria-label={this.props.removeText}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        onClick={this.props.onRemoveAction}
        onKeyPress={this.onKeyPress}
        type="button"
      >
        <RemoveIcon />
      </button>
    );
  }
}
