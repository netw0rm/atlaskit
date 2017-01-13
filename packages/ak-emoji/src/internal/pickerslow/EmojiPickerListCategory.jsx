import React, { PureComponent, PropTypes } from 'react';

import styles from 'style!../../style.less';
import EmojiPropTypes from '../ak-emoji-prop-types';
import EmojiButton from '../common/EmojiButton';

export default class EmojiPickerListCategory extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    emojis: PropTypes.arrayOf(EmojiPropTypes.emoji),
    selectedEmojiShortcut: PropTypes.string,
    onEmojiSelected: PropTypes.func,
    onEmojiMouseEnter: PropTypes.func,
    className: PropTypes.string,
  };

  static defaultProps = {
    style: {},
    onEmojiSelected: () => {},
    onEmojiMouseEnter: () => {},
  }

  handleEmojiOnClick = (emoji) => {
    this.props.onEmojiSelected(emoji);
  }

  handleEmojiOnMouseEnter = (emoji) => {
    this.props.onEmojiMouseEnter(emoji);
  }

  render() {
    console.log('EmojiPickerListCategory render', this.props.title, this.props.selectedEmojiShortcut);

    const { id, selectedEmojiShortcut, emojis, title } = this.props;

    return (
      <div
        id={id}
        data-category-id={title}
        className={this.props.className}
      >
        <div className={styles.categoryTitle} >
          {title}
        </div>
        <div className={styles.categoryEmojis} >
          {emojis.map((emoji) => {
            const selected = selectedEmojiShortcut === emoji.shortcut;

            return (
              <EmojiButton
                {...emoji}
                selected={selected}
                onClick={this.handleEmojiOnClick}
                onMouseEnter={this.handleEmojiOnMouseEnter}
                key={emoji.shortcut}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
