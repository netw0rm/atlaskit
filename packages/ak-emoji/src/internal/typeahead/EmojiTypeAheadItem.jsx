import styles from 'style!../../style.less';

import classNames from 'classnames';
import React, { PropTypes, PureComponent } from 'react';

import EmojiPreview from '../common/EmojiPreview';
import EmojiPropTypes from '../ak-emoji-prop-types';
import { leftClick } from '../mouse';

export default class EmojiTypeAheadItem extends PureComponent {
  static propTypes = {
    onMouseMove: PropTypes.func,
    onSelection: PropTypes.func,
    selected: PropTypes.bool,
    emoji: EmojiPropTypes.emoji,
  };

  // internal, used for callbacks
  onEmojiSelected = (event) => {
    if (leftClick(event) && this.props.onSelection) {
      event.preventDefault();
      this.props.onSelection(this.props);
    }
  }

  onEmojiMenuItemMouseMove = (event) => {
    if (this.props.onMouseMove) {
      this.props.onMouseMove(event);
    }
  }

  render() {
    const { selected, emoji } = this.props;
    const classes = classNames({
      'ak-emoji-typeahead-item': true,
      [styles.akEmojiItem]: true,
      [styles.selected]: selected,
    });

    return (
      <div
        className={classes}
        onMouseDown={this.onEmojiSelected}
        onMouseMove={this.onEmojiMenuItemMouseMove}
        data-emoji-id={emoji.shortcut}
      >
        <div className={styles.row}>
          <EmojiPreview
            emoji={emoji}
          />
        </div>
      </div>
    );
  }
}
