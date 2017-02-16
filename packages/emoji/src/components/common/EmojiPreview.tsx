import * as React from 'react';
import { PureComponent } from 'react';
import classNames from 'classnames';

import * as styles from './styles';
import AkButton from '@atlaskit/button';
import Emoji from '../../components/common/Emoji';
import ToneSelector from './ToneSelector';
import { EmojiDescription, OnToneSelected } from '../../types';

export interface Props {
  emoji?: EmojiDescription;
  toneEmoji?: EmojiDescription;
  selectedTone?: number;
  onToneSelected?: OnToneSelected;
}

export interface State {
  selectingTone: boolean;
}

export default class EmojiPreview extends PureComponent<Props, State> {

  state = {
    selectingTone: false,
  };

  onToneButtonClick = () => {
    this.setState({
      selectingTone: true,
    });
  }

  onToneSelected = (toneValue) => {
    this.setState({
      selectingTone: false,
    });

    if (this.props.onToneSelected) {
      this.props.onToneSelected(toneValue);
    }
  }

  onMouseLeave = () => {
    this.setState({
      selectingTone: false,
    });
  }

  renderTones() {
    const { emoji, toneEmoji, selectedTone } = this.props;
    if (!toneEmoji || !emoji) {
      return null;
    }

    if (this.state.selectingTone) {
      return (
        <div className={styles.toneSelectorContainer}>
          <ToneSelector
            emoji={toneEmoji}
            onToneSelected={this.onToneSelected}
          />
        </div>
      );
    }

    let previewEmoji = emoji;
    if (selectedTone && previewEmoji.skinVariations) {
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
          iconBefore={<Emoji emoji={previewEmoji} />}
          onClick={this.onToneButtonClick}
          spacing="none"
        />
      </div>
    );
  }

  renderEmojiPreview() {
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
        <Emoji emoji={emoji} />
        <div className={previewTextClasses}>
          <div className={styles.name}>{emoji.name}</div>
          <div className={styles.shortName}>:{emoji.shortcut}:</div>
        </div>
      </div>
    );
  }

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
