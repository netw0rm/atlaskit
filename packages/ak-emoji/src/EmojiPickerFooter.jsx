import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!./style.less';
import AkButton from 'ak-button';
import Emoji from './Emoji';
import ToneSelector from './ToneSelector';
import EmojiPropTypes from './internal/ak-emoji-prop-types';
import { toneEmojiShortName } from './internal/constants';

// eslint-disable-next-line react/prefer-stateless-function
export default class extends PureComponent {
  static propTypes = {
    selectedEmoji: EmojiPropTypes.emoji,
    emojis: PropTypes.arrayOf(EmojiPropTypes.emoji),
    selectedTone: PropTypes.number,
    onToneSelected: PropTypes.func,
  };

  state = {
    selectingTone: false,
  };

  onButtonClick = () => {
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
    if (this.state.selectingTone) {
      return (
        <div className={styles.toneSelectorContainer}>
          <ToneSelector
            emojis={this.props.emojis}
            selectedTone={this.props.selectedTone}
            onToneSelected={this.onToneSelected}
          />
        </div>
      );
    }

    const filteredEmojis = this.props.emojis.filter(emoji => emoji.shortcut === toneEmojiShortName);

    let emoji = filteredEmojis[0];
    if (this.props.selectedTone) {
      emoji = Object.assign({}, emoji, {
        representation: emoji.skinVariations[this.props.selectedTone - 1],
      });
    }

    return (
      <div className={styles.buttons}>
        <AkButton
          id="toneSelectorButton"
          appearance="subtle"
          iconBefore={<Emoji {...emoji} />}
          onClick={this.onButtonClick}
          spacing="none"
        />
      </div>
    );
  };

  renderEmojiPreview = () => {
    if (!this.props.selectedEmoji) {
      return null;
    }

    return (
      <div className={styles.preview}>
        <Emoji {...this.props.selectedEmoji} />
        <div className={styles.previewText}>
          <div className={styles.name}>{this.props.selectedEmoji.name}</div>
          <div className={styles.shortname}>{`${this.props.selectedEmoji.shortcut}`}</div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div
        className={styles.emojiPickerFooter}
        onMouseLeave={this.onMouseLeave}
      >
        {this.renderEmojiPreview()}
        {this.renderTones()}
      </div>
    );
  }
}
