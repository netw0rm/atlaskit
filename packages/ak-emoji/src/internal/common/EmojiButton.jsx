import classNames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../../style.less';
import EmojiPropTypes from '../ak-emoji-prop-types';
import Emoji from '../../Emoji';

const leftClick = event => (
  event.button === 0
    && !event.altKey
    && !event.ctrlKey
    && !event.metaKey
    && !event.shiftKey
);

// eslint-disable-next-line
export default class EmojiButton extends PureComponent {
  static propTypes = {
    ...EmojiPropTypes.emojiPropType,
    onClick: PropTypes.func,
  };

  handleMouseDown = (event) => {
    event.preventDefault();
    if (this.props.onClick && leftClick(event)) {
      this.props.onClick(event);
    }
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { onClick, ...emojiProps } = this.props;

    const classes = [styles.emojiButton];

    return (
      <button
        className={classNames(classes)}
        onMouseDown={this.handleMouseDown}
      >
        <Emoji {...emojiProps} />
      </button>
    );
  }
}
