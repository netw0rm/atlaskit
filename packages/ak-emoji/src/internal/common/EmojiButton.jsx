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

export default class EmojiButton extends PureComponent {
  static propTypes = {
    ...EmojiPropTypes.emojiPropType,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
  };

  static defaultProps = {
    onClick: () => {},
    onMouseEnter: () => {},
  }

  handleMouseDown = (event) => {
    // eslint-disable-next-line no-unused-vars
    const { onClick, onMouseEnter, ...emoji } = this.props;
    event.preventDefault();
    if (leftClick(event)) {
      onClick(emoji);
    }
  }

  handleMouseEnter = () => {
    // eslint-disable-next-line no-unused-vars
    const { onClick, onMouseEnter, ...emoji } = this.props;
    onMouseEnter(emoji);
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { onClick, onMouseEnter, ...emojiProps } = this.props;

    const classes = [styles.emojiButton];

    return (
      <button
        className={classNames(classes)}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
      >
        <Emoji {...emojiProps} />
      </button>
    );
  }
}
