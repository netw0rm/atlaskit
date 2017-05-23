import * as React from 'react';
import { PureComponent } from 'react';

import { PickerFooterStyle } from './styles';
import EmojiPreview from '../common/EmojiPreview';
import { EmojiDescription, OnToneSelected } from '../../types';

export interface Props {
  selectedEmoji?: EmojiDescription;
  selectedTone?: number;
  onToneSelected?: OnToneSelected;
}

export default class EmojiPickerFooter extends PureComponent<Props, undefined> {
  render() {
    const { selectedEmoji, selectedTone, onToneSelected } = this.props;

    return (
      <PickerFooterStyle>
        <EmojiPreview
          emoji={selectedEmoji}
          selectedTone={selectedTone}
          onToneSelected={onToneSelected}
        />
      </PickerFooterStyle>
    );
  }

}
