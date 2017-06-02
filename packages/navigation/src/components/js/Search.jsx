import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import SearchInner from '../styled/SearchInner';
import SearchBox from '../styled/SearchBox';
import SearchResults from '../styled/SearchResults';
import SearchInput from '../styled/SearchInput';

export default class Search extends PureComponent {
  static propTypes = {
    placeholder: PropTypes.string,
    children: PropTypes.node,
    onChange: PropTypes.func.isRequired,
    onSearchClear: PropTypes.func,
    value: PropTypes.string,
  }

  static defaultProps = {
    placeholder: 'Search',
  }

  // clear the input when the user hits Escape
  onInputKeyDown = (event) => {
    if (event.key !== 'Escape') {
      return;
    }

    event.stopPropagation();
    this.clear();
  }

  setInputRef = (ref) => {
    this.inputRef = ref;
  }

  clear() {
    const { value, onSearchClear } = this.props;

    // only executing callback if there is something to clear
    if (value) {
      onSearchClear();
    }

    // always give focus to search input
    if (this.inputRef && this.inputRef !== document.activeElement) {
      this.inputRef.focus();
    }
  }

  render() {
    const {
      children,
      value,
      onChange,
      placeholder,
    } = this.props;

    return (
      <SearchInner>
        <SearchBox
          onMouseDown={this.onSearchBoxMouseDown}
        >
          <SearchInput
            autoFocus
            innerRef={this.setInputRef}
            onChange={onChange}
            placeholder={placeholder}
            spellCheck={false}
            type="text"
            value={value}
            onKeyDown={this.onInputKeyDown}
          />
        </SearchBox>
        <SearchResults>
          {children}
        </SearchResults>
      </SearchInner>
    );
  }
}
