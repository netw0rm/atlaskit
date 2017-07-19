import * as React from 'react';
import { PureComponent } from 'react';
import * as classNames from 'classnames';

import * as styles from './styles';
import EmojiPreview from '../common/EmojiPreview';
import EmojiUploadPicker, { OnUploadEmoji } from '../common/EmojiUploadPicker';
import { EmojiDescription, OnToneSelected } from '../../types';

export interface Props {
  selectedEmoji?: EmojiDescription;
  selectedTone?: number;
  onToneSelected?: OnToneSelected;
  uploading: boolean;
  initialUploadName?: string;
  uploadErrorMessage?: string;
  onUploadCancelled: () => void;
  onUploadEmoji: OnUploadEmoji;
}

export default class EmojiPickerFooter extends PureComponent<Props, undefined> {
  render() {
    const {
      initialUploadName,
      onToneSelected,
      onUploadCancelled,
      onUploadEmoji,
      selectedEmoji,
      selectedTone,
      uploadErrorMessage,
      uploading,
    } = this.props;

    const previewFooterClassnames = classNames([
      styles.emojiPickerFooter,
      styles.emojiPickerFooterWithTopShadow,
    ]);

    if (uploading) {
      return (
        <div className={previewFooterClassnames}>
          <EmojiUploadPicker
            onUploadCancelled={onUploadCancelled}
            onUploadEmoji={onUploadEmoji}
            errorMessage={uploadErrorMessage}
            initialUploadName={initialUploadName}
          />
        </div>
      );
    }

    return (
      <div className={previewFooterClassnames}>
        <EmojiPreview
          emoji={selectedEmoji}
          selectedTone={selectedTone}
          onToneSelected={onToneSelected}
        />
      </div>
    );
  }

}
