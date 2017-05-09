import React, { PureComponent, PropTypes } from 'react';
import SearchInner from '../styled/SearchInner';
import SearchBox from '../styled/SearchBox';
import SearchClearButtonOuter from '../styled/SearchClearButtonOuter';
import SearchClearButton from '../styled/SearchClearButton';
import SearchResults from '../styled/SearchResults';
import SearchInput from '../styled/SearchInput';

export default class Search extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    clearIcon: PropTypes.node.isRequired,
    placeholder: PropTypes.string,
    searchIcon: PropTypes.node.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onSearchClear: PropTypes.func,
  }

  static defaultProps = {
    placeholder: 'Search',
  }

  // Attaching a mouse down handler to the whole search box rather than
  // just the button. This is done so that the input field never looses
  // focus when the user is clearing the input. This is really useful
  // on devices that close the keyboard input if the text field looses
  // focus.
  onSearchBoxMouseDown = (event) => {
    const { target } = event;
    const shouldClearInput = target === this.clearButtonRef ||
                             this.clearButtonRef.contains(target);

    if (!shouldClearInput) {
      return;
    }

    event.preventDefault();
    this.clear();
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

  setClearButtonRef = (ref) => {
    this.clearButtonRef = ref;
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
      clearIcon,
      value,
      onChange,
      placeholder,
      searchIcon,
    } = this.props;

    const canBeCleared = Boolean(value && value.length);
    const clearButtonIcon = canBeCleared ? clearIcon : searchIcon;

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
          <SearchClearButtonOuter>
            {/*
              Actively preventing tabbing to the close button
              so that users can tab directly to results.
              Users can still clear the input with the keyboard
              by pressing 'Escape'.
            */}
            <SearchClearButton
              disabled={!canBeCleared}
              type="button"
              tabIndex="-1"
              innerRef={this.setClearButtonRef}
            >
              {clearButtonIcon}
            </SearchClearButton>
          </SearchClearButtonOuter>
        </SearchBox>
        <SearchResults>
          {children}
        </SearchResults>
      </SearchInner>
    );
  }
}
