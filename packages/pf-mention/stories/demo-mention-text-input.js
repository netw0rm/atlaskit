import { PropTypes } from 'react';
import reactify from 'akutil-react';

import pfMentionPicker from '../src/wc/pf-mention-picker';
import SearchTextInput from './demo-search-text-input';
import { getWebComponent } from './util';

const { React, ReactDOM } = window;

const MentionPicker = reactify(pfMentionPicker, {
  React,
  ReactDOM,
});

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
    return {
      active: false,
      visible: false,
    };
  },

  componentWillMount() {
    if (this.props.resourceProvider) {
      this.props.resourceProvider.subscribe(this._filterChange);
    }
  },

  componentWillUnmount() {
    if (this.props.resourceProvider) {
      this.props.resourceProvider.unsubscribe(this._filterChange);
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
      const query = event.target.value;
      this.props.resourceProvider.filter(query);
    }
  },

  _filterChange(mentions) {
    this.setState({
      visible: mentions.length > 0,
    });
  },

  render() {
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
        onBlur={() => this._hideMentionPopup()}
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
          renderElementTo="#root" /* Workaround for storybook cleanup */
          {...mentionListProps}
          onselected={(event) => { this._handleSelection(event); }}
          ref={(ref) => { this._mentionListRef = getWebComponent(ref); }}
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
