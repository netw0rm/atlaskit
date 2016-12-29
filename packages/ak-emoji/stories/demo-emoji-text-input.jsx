import { action } from '@kadira/storybook';
import React, { Component, PropTypes } from 'react';

import EmojiPropTypes from '../src/internal/ak-emoji-prop-types';
import EmojiTypeAhead from '../src/EmojiTypeAhead';
import debug from '../src/internal/logger';
import SearchTextInput from './demo-search-text-input';
import { lorem } from './story-data';

class EmojiTextInput extends Component {
  static propTypes = {
    label: PropTypes.string,
    onSelection: PropTypes.func.isRequired,
    emojiService: EmojiPropTypes.emojiService,
    position: PropTypes.string,
    beforeContent: PropTypes.bool,
    afterContent: PropTypes.bool,
  }

  static defaultProps = {
    onSelection: () => {},
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
    this.props.onSelection(emoji);
  }

  updateSearch = (event) => {
    if (this.state.active) {
      this.setState({
        query: event.target.value || '',
      });
    }
  }

  render() {
    const { label, emojiService, position, beforeContent, afterContent } = this.props;
    debug('demo-emoji-text-input.render', position);
    const target = position ? 'demo-input' : null;
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
          target={target}
          position={position}
          onSelection={(event) => { this.handleSelection(event); }}
          onOpen={action('picker opened')}
          onClose={action('picker closed')}
          ref={(ref) => { this.emojiListRef = ref; }}
          query={this.state.query}
          emojiService={emojiService}
        />
      );
    }

    const loremContent = (
      <div>
        <p style={{ width: '400px' }}>{lorem}</p>
        <p style={{ width: '400px' }}>{lorem}</p>
      </div>
    );
    const before = beforeContent ? loremContent : null;
    const after = afterContent ? loremContent : null;

    return (
      <div style={{ padding: '10px' }} >
        {before}
        {searchInput}
        {emojiPicker}
        {after}
      </div>
    );
  }
}

export default EmojiTextInput;
