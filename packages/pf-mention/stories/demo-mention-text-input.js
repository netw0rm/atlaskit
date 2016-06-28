import { PropTypes } from 'react';
import { define } from 'skatejs';
import reactify from 'akutil-react';
import akLayer from 'ak-layer';

import { definition as resourcedMentionList } from '../src/wc/pf-resourced-mention-list';
import SearchTextInput from './demo-search-text-input';
import { getWebComponent } from './util';

const React = window.React;
const ReactDOM = window.ReactDOM;

const ResourcedMentionList = reactify(window.uniqueWebComponent('pf-resourced-mention-list', resourcedMentionList, define), {
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
    };
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

  _handleSelection(mention) {
    this._hideMentionPopup();
    this.props.onSelection(mention);
  },

  _updateSearch(event) {
    if (this.state.active) {
      const query = event.target.value;
      this.props.resourceProvider.filter(query);
    }
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

    let mentionList;
    if (this.state.active) {
      mentionList = (
        <ak-layer
          target="#search-text"
          open
          position={position}
        >
          <ResourcedMentionList
            {...mentionListProps}
            onselected={(mention) => this._handleSelection(mention)}
            ref={(ref) => { this._mentionListRef = getWebComponent(ref); }}
          />
        </ak-layer>
      );
    }

    return (
      <div className="pf-mention-text-input">
        {searchInput}
        {mentionList}
      </div>
    );
  },
});

export default MentionTextInput;
