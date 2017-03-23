import * as React from 'react';
import { PureComponent } from 'react';

import { EmojiProvider } from '../src/api/EmojiResource';
import EmojiPicker from '../src/components/picker/EmojiPicker';
import { OnEmojiEvent, RelativePosition } from '../src/types';
import { lorem } from './story-data';

export interface Props {
  onSelection?: OnEmojiEvent;
  emojiProvider: Promise<EmojiProvider>;
  position?: RelativePosition;
}

export default class EmojiPickerTextInput extends PureComponent<Props, undefined> {
  static defaultProps = {
    onSelection: () => {},
  };

  render() {
    const { emojiProvider, position, onSelection } = this.props;

    return (
      <div style={{ padding: '10px' }} >
        <p><input
          id="picker-input"
          style={{
            height: '20px',
            margin: '10px',
          }}
        /></p>
        <p style={{ width: '400px' }}>{lorem}</p>
        <EmojiPicker
          onSelection={onSelection}
          position={position}
          target="#picker-input"
          emojiProvider={emojiProvider}
        />
      </div>
    );
  }

}
