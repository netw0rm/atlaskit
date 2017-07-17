import * as React from 'react';

import LoadingEmojiComponent, { Props as LoadingProps, State as LoadingState } from '../common/LoadingEmojiComponent';
import EmojiPickerComponent, { PickerRefHandler } from './EmojiPickerComponent';
import { OnEmojiEvent } from '../../types';
import { EmojiProvider } from '../../api/EmojiResource';

export interface Props extends LoadingProps {
  onSelection?: OnEmojiEvent;
  onPickerRef?: PickerRefHandler;
}

export default class EmojiPicker extends LoadingEmojiComponent<Props,LoadingState> {

  constructor(props) {
    super(props, {});
  }

  renderLoaded(loadedEmojiProvider: EmojiProvider) {
    const { emojiProvider, ...otherProps } = this.props;

    return (
      <EmojiPickerComponent
        emojiProvider={loadedEmojiProvider}
        {...otherProps}
      />
    );
  }
}
