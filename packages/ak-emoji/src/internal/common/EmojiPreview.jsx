import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import styles from 'style!../../style.less';
import AkButton from 'ak-button';
import Emoji from '../../Emoji';
import ToneSelector from './ToneSelector';
import EmojiPropTypes from '../ak-emoji-prop-types';

export default class EmojiPreview extends PureComponent {
  static propTypes = {
    emoji: EmojiPropTypes.emoji,
    toneEmoji: EmojiPropTypes.emoji,
    selectedTone: PropTypes.number,
    onToneSelected: PropTypes.func,
  };

  state = {
    selectingTone: false,
  };

  onToneButtonClick = () => {
    this.setState({
      selectingTone: true,
    });
  };

  onToneSelected = (toneValue) => {
    this.setState({
      selectingTone: false,
    });

    if (this.props.onToneSelected) {
      this.props.onToneSelected(toneValue);
    }
  };

  onMouseLeave = () => {
    this.setState({
      selectingTone: false,
    });
  };

  renderTones = () => {
    if (!this.props.toneEmoji || !this.props.emoji) {
      return null;
    }

    if (this.state.selectingTone) {
      const toneEmoji = this.props.toneEmoji || this.props.emoji;
      return (
        <div className={styles.toneSelectorContainer}>
          <ToneSelector
            emoji={toneEmoji}
            selectedTone={this.props.selectedTone}
            onToneSelected={this.onToneSelected}
          />
        </div>
      );
    }

    let previewEmoji = this.props.toneEmoji;
    if (this.props.selectedTone) {
      previewEmoji = {
        ...previewEmoji,
        representation: previewEmoji.skinVariations[this.props.selectedTone - 1],
      };
    }

    return (
      <div className={styles.buttons}>
        <AkButton
          id="toneSelectorButton"
          appearance="subtle"
          iconBefore={<Emoji {...previewEmoji} />}
          onClick={this.onToneButtonClick}
          spacing="none"
        />
      </div>
    );
  };

  renderEmojiPreview = () => {
    const emoji = this.props.emoji;

    if (!emoji) {
      return null;
    }

    const previewClasses = classNames({
      [styles.preview]: true,
      [styles.withToneSelector]: !!this.props.toneEmoji,
    });

    const previewTextClasses = classNames({
      [styles.previewText]: true,
      [styles.previewSingleLine]: !emoji.name,
    });

    return (
      <div className={previewClasses}>
        <Emoji {...emoji} />
        <div className={previewTextClasses}>
          <div className={styles.name}>{emoji.name}</div>
          <div className={styles.shortname}>{emoji.shortcut}</div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div
        className={styles.emojiPreview}
        onMouseLeave={this.onMouseLeave}
      >
        {this.renderEmojiPreview()}
        {this.renderTones()}
      </div>
    );
  }
}
