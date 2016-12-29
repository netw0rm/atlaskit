import { action } from '@kadira/storybook';
import React, { Component, PropTypes } from 'react';

import EmojiPropTypes from '../src/internal/ak-emoji-prop-types';
import EmojiTypeAhead from '../src/EmojiTypeAhead';
import debug from '../src/internal/logger';
import SearchTextInput from './demo-search-text-input';

class EmojiTextInput extends Component {
  static propTypes = {
    label: PropTypes.string,
    onSelection: PropTypes.func.isRequired,
    emojiService: EmojiPropTypes.emojiService,
  }

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      query: '',
    };
  }

  showEmojiPopup = () => {
    this.setState({
      active: true,
    });
  }

  hideEmojiPopup = () => {
    this.setState({
      active: false,
    });
  }

  handleSelection = (emoji) => {
    this.hideEmojiPopup();
    if (this.props.onSelection) {
      this.props.onSelection(emoji);
    }
  }

  updateSearch = (event) => {
    if (this.state.active) {
      this.setState({
        query: event.target.value || '',
      });
    }
  }

  render() {
    debug('demo-emoji-text-input.render');
    /* eslint no-unused-vars: 0 */
    const { label, onSelection, emojiService } = this.props;
    const searchInput = (
      <SearchTextInput
        inputId="demo-input"
        label={label}
        onChange={query => this.updateSearch(query)}
        onUp={() => this.emojiListRef.selectPrevious()}
        onDown={() => this.emojiListRef.selectNext()}
        onEnter={() => this.emojiListRef.chooseCurrentSelection()}
        onEscape={this.hideEmojiPopup}
        onFocus={this.showEmojiPopup}
        xonBlur={this.hideEmojiPopup}
      />
    );

    let emojiPicker = null;

    if (this.state.active) {
      emojiPicker = (
        <EmojiTypeAhead
          onSelection={(event) => { this.handleSelection(event); }}
          onOpen={action('picker opened')}
          onClose={action('picker closed')}
          ref={(ref) => { this.emojiListRef = ref; }}
          query={this.state.query}
          emojiService={emojiService}
        />
      );
    }

    return (
      <div style={{ padding: '10px' }} >
        {searchInput}
        {emojiPicker}
      </div>
    );
  }
}

export default EmojiTextInput;
