import React, { Component, PropTypes } from 'react';

import MentionPicker from '../src/components/ak-mention-picker';
import SearchTextInput from './demo-search-text-input';
import debug from '../src/util/logger';
import uniqueId from '../src/util/id';

class MentionTextInput extends Component {
  static propTypes = {
    label: PropTypes.string,
    onSelection: PropTypes.func.isRequired,
    resourceProvider: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    presenceProvider: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    relativePosition: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this._handleSelection = this._handleSelection.bind(this);
    this._hideMentionPopup = this._hideMentionPopup.bind(this);
    this._showMentionPopup = this._showMentionPopup.bind(this);
    this.state = {
      active: false,
      query: '',
    };
  }

  _showMentionPopup() {
    this.setState({
      active: true,
    });
  }

  _hideMentionPopup() {
    this.setState({
      active: false,
    });
  }

  _handleSelection(mention) {
    this._hideMentionPopup();
    if (this.props.onSelection) {
      this.props.onSelection(mention);
    }
  }

  _updateSearch(event) {
    if (this.state.active) {
      this.setState({
        query: event.target.value || '',
      });
    }
  }

  render() {
    debug('demo-mention-text-input.render');
    /* eslint no-unused-vars: 0 */
    const { label, onSelection, relativePosition, resourceProvider, presenceProvider } = this.props;
    const position = (relativePosition === 'above') ? 'top left' : 'bottom left';
    const searchInput = (
      <SearchTextInput
        label={label}
        onChange={query => this._updateSearch(query)}
        onUp={() => this._mentionListRef.selectPrevious()}
        onDown={() => this._mentionListRef.selectNext()}
        onEnter={() => this._mentionListRef.chooseCurrentSelection()}
        onEscape={this._hideMentionPopup}
        onFocus={this._showMentionPopup}
        onBlur={this._hideMentionPopup}
        inputRef={(ref) => { this._inputRef = ref; }}
      />
    );

    let mentionPicker = null;

    if (this.state.active && this._inputRef) {
      mentionPicker = (
        <MentionPicker
          target={this._inputRef}
          position={position}
          resourceProvider={resourceProvider}
          presenceProvider={presenceProvider}
          onSelection={(event) => { this._handleSelection(event); }}
          ref={(ref) => { this._mentionListRef = ref; }}
          query={this.state.query}
        />
      );
    }

    return (
      <div style={{ padding: '10px' }} >
        {searchInput}
        {mentionPicker}
      </div>
    );
  }
}

export default MentionTextInput;
