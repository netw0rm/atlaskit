import React, { Component, PropTypes } from 'react';

import EmojiPropTypes from '../src/internal/ak-emoji-prop-types';
import EmojiPicker from '../src/EmojiPicker';
import { lorem } from './story-data';

export default class EmojiPickerTextInput extends Component {
  static propTypes = {
    onSelection: PropTypes.func.isRequired,
    emojiService: EmojiPropTypes.emojiService,
    position: PropTypes.string,
  }

  static defaultProps = {
    onSelection: () => {},
  }

  render() {
    const { emojiService, position, onSelection } = this.props;

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
          emojiService={emojiService}
        />
      </div>
    );
  }

}
