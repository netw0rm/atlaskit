import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';

import RemoveIcon from '@atlaskit/icon/glyph/cross';

export default class RemoveButton extends PureComponent {
  static propTypes = {
    removeText: PropTypes.string.isRequired,
    isRounded: PropTypes.bool,
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
    const buttonStyles = classNames(styles.button, {
      [styles.rounded]: this.props.isRounded,
    });
    return (
      <button
        className={buttonStyles} aria-label={this.props.removeText}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        onClick={this.props.onRemoveAction}
        onKeyPress={this.onKeyPress}
        type="button"
      >
        <RemoveIcon label={this.props.removeText} size="small" />
      </button>
    );
  }
}
