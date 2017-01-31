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
    idx: PropTypes.number,
  };

  static defaultProps = {
    onMouseMove: () => {},
    onSelection: () => {},
  }

  // internal, used for callbacks
  onEmojiSelected = (event) => {
    const { emoji, idx } = this.props;
    if (leftClick(event)) {
      event.preventDefault();
      this.props.onSelection(emoji, idx);
    }
  }

  onEmojiMenuItemMouseMove = (event) => {
    const { emoji, idx } = this.props;
    this.props.onMouseMove(event, emoji, idx);
  }

  render() {
    const { selected, emoji } = this.props;
    const classes = classNames({
      'ak-emoji-typeahead-item': true,
      [styles.typeAheadItem]: true,
      [styles.typeAheadItemSelected]: this.props.selected,
    });

    return (
      <div
        className={classes}
        onMouseDown={this.onEmojiSelected}
        onMouseMove={this.onEmojiMenuItemMouseMove}
        data-emoji-id={emoji.shortcut}
      >
        <div className={styles.typeAheadItemRow}>
          <EmojiPreview
            emoji={emoji}
            selected={selected}
          />
        </div>
      </div>
    );
  }
}
