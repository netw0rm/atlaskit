import * as React from 'react';
import { PureComponent } from 'react';

import {
  ButtonsStyle,
  PreviewEmojiStyle,
  PreviewImgStyle,
  PreviewStyle,
  PreviewTextNameStyle,
  PreviewTextShortNameStyle,
  PreviewTextStyle,
  ToneSelectedContainerStyle,
} from './styles';
import AkButton from '@atlaskit/button';
import Emoji from '../../components/common/Emoji';
import EmojiPlaceholder from '../../components/common/EmojiPlaceholder';
import ToneSelector from './ToneSelector';
import { EmojiDescription, EmojiDescriptionWithVariations, OnToneSelected } from '../../types';
import { isEmojiLoaded } from '../../type-helpers';

export interface Props {
  emoji?: EmojiDescription;
  toneEmoji?: EmojiDescriptionWithVariations;
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

  private renderTones() {
    const { emoji, toneEmoji, selectedTone } = this.props;
    if (!toneEmoji || !emoji) {
      return null;
    }

    if (this.state.selectingTone) {
      return (
        <ToneSelectedContainerStyle>
          <ToneSelector
            emoji={toneEmoji}
            onToneSelected={this.onToneSelected}
          />
        </ToneSelectedContainerStyle>
      );
    }

    let previewEmoji = toneEmoji;
    if (selectedTone && previewEmoji.skinVariations) {
      previewEmoji = previewEmoji.skinVariations[(selectedTone || 1) - 1];
    }

    return (
      <ButtonsStyle>
        <AkButton
          id="toneSelectorButton"
          appearance="subtle"
          iconBefore={<Emoji emoji={previewEmoji} />}
          onClick={this.onToneButtonClick}
          spacing="none"
        />
      </ButtonsStyle>
    );
  }

  renderEmojiPreview() {
    const emoji = this.props.emoji;
    if (!emoji) {
      return null;
    }

    const previewSingleLine = !emoji.name;
    let emojiComponent;

    if (isEmojiLoaded(emoji)) {
      emojiComponent = (
        <Emoji
          emoji={emoji}
          preview={true}
        />
      );
    } else {
      const { shortName, name } = emoji;
      emojiComponent = (
        <EmojiPlaceholder shortName={shortName} name={name} size={32} />
      );
    }

    return (
      <PreviewEmojiStyle>
        <PreviewImgStyle>
          {emojiComponent}
        </PreviewImgStyle>
        <PreviewTextStyle
          withToneSelector={!!this.props.toneEmoji}
          previewSingleLine={previewSingleLine}
        >
          <PreviewTextNameStyle previewSingleLine={previewSingleLine}>
            {emoji.name}
          </PreviewTextNameStyle>
          <PreviewTextShortNameStyle previewSingleLine={previewSingleLine}>
            {emoji.shortName}
          </PreviewTextShortNameStyle>
        </PreviewTextStyle>
      </PreviewEmojiStyle>
    );
  }

  render() {
    return (
      <PreviewStyle onMouseLeave={this.onMouseLeave}>
        {this.renderEmojiPreview()}
        {this.renderTones()}
      </PreviewStyle>
    );
  }
}
