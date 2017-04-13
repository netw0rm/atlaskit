import React, { PureComponent, PropTypes } from 'react';
import SearchInner from '../styled/SearchInner';
import SearchBox from '../styled/SearchBox';
import SearchClearButtonOuter from '../styled/SearchClearButtonOuter';
import SearchClearButton from '../styled/SearchClearButton';
import SearchResults from '../styled/SearchResults';
import SearchInput from '../styled/SearchInput';

export default class Search extends PureComponent {
  static propTypes = {
    placeholder: PropTypes.string,
    clearIcon: PropTypes.node,
    children: PropTypes.node,
    onChange: PropTypes.func.isRequired,
    onSearchClear: PropTypes.func,
    value: PropTypes.string,
    /** Used to automatically set focus on the input field.
     * Should be set to true whenever the SearchDrawer is open */
    shouldFocusInput: PropTypes.bool,
  }

  static defaultProps = {
    placeholder: 'Search',
    shouldFocusInput: false,
  }

  componentDidMount() {
    this.updateFocus(this.props.shouldFocusInput);
  }

  componentWillUpdate(nextProps) {
    this.updateFocus(nextProps.shouldFocusInput);
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

  onClearButtonKeyDown = (event) => {
    if (event.key !== 'Enter') {
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

  blurInput() {
    if (this.inputRef &&
      this.inputRef === document.activeElement) {
      this.inputRef.blur();
    }
  }

  focusInput() {
    if (this.inputRef &&
      this.inputRef !== document.activeElement) {
      this.inputRef.focus();
    }
  }

  updateFocus(shouldFocus) {
    if (shouldFocus) {
      this.focusInput();
      return;
    }

    this.blurInput();
  }

  clear() {
    this.props.onSearchClear();
    this.focusInput();
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
            innerRef={this.setInputRef}
            onChange={onChange}
            placeholder={placeholder}
            type="text"
            value={value}
            onKeyDown={this.onInputKeyDown}
          />
          <SearchClearButtonOuter>
            <SearchClearButton
              type="button"
              innerRef={this.setClearButtonRef}
              onKeyDown={this.onClearButtonKeyDown}
            >
              {this.props.clearIcon}
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
