import React, { PropTypes } from 'react';
import reactify from 'akutil-react';

import pfMentionPicker from '../src/wc/pf-mention-picker';
import SearchTextInput from './demo-search-text-input';
import { getWebComponent } from './util';
import debug from '../src/util/logger';
import uniqueId from '../src/util/id';

const MentionPicker = reactify(pfMentionPicker);

const MentionTextInput = React.createClass({

  displayName: 'MentionTextInput',

  propTypes: {
    label: PropTypes.string,
    onSelection: PropTypes.func.isRequired,
    resourceProvider: PropTypes.object.isRequired,
    presenceProvider: PropTypes.object,
    relativePosition: PropTypes.string,
  },

  getInitialState() {
    this._subscriberKey = uniqueId('demo-mention-text-input');
    return {
      active: false,
      visible: false,
      query: '',
    };
  },

  componentWillMount() {
    if (this.props.resourceProvider) {
      this.props.resourceProvider.subscribe(this._subscriberKey, this._filterChange);
    }
  },

  componentWillUnmount() {
    if (this.props.resourceProvider) {
      this.props.resourceProvider.unsubscribe(this._subscriberKey);
    }
  },

  _showMentionPopup() {
    this.setState({
      active: true,
    });
  },

  _hideMentionPopup() {
    this.setState({
      active: false,
    });
  },

  _handleSelection(event) {
    this._hideMentionPopup();
    if (this.props.onSelection) {
      this.props.onSelection(event.detail);
    }
  },

  _updateSearch(event) {
    if (this.state.active) {
      this.setState({
        query: event.target.value || '',
      });
    }
  },

  _filterChange(mentions) {
    this.setState({
      visible: mentions.length > 0,
    });
  },

  render() {
    debug('demo-mention-text-input.render');
    /* eslint no-unused-vars: 0 */
    const { label, onSelection, relativePosition, ...mentionListProps } = this.props;
    const position = (relativePosition === 'above') ? 'top left' : 'bottom left';
    const searchInput = (
      <SearchTextInput
        label={label}
        onChange={(query) => this._updateSearch(query)}
        onUp={() => this._mentionListRef.selectPrevious()}
        onDown={() => this._mentionListRef.selectNext()}
        onEnter={() => this._mentionListRef.chooseCurrentSelection()}
        onEscape={() => this._hideMentionPopup()}
        onFocus={() => this._showMentionPopup()}
        // onBlur={() => this._hideMentionPopup()}
        inputRef={(ref) => { this._inputRef = ref; }}
        id="search-text"
      />
    );

    let mentionPicker = null;

    if (this.state.active) {
      mentionPicker = (
        <MentionPicker
          target="#search-text"
          position={position}
          {...mentionListProps}
          onselected={(event) => { this._handleSelection(event); }}
          ref={(ref) => { this._mentionListRef = getWebComponent(ref); }}
          query={this.state.query}
        />
      );
    }

    return (
      <div className="pf-mention-text-input">
        {searchInput}
        {mentionPicker}
      </div>
    );
  },
});

export default MentionTextInput;
