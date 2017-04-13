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

  setInputRef = (ref) => {
    this.inputRef = ref;
  }

  blur() {
    if (this.inputRef &&
         this.inputRef === document.activeElement) {
      this.inputRef.blur();
    }
  }

  focus() {
    if (this.inputRef &&
         this.inputRef !== document.activeElement) {
      this.inputRef.focus();
    }
  }

  updateFocus(shouldFocus) {
    if (shouldFocus) {
      this.focus();
      return;
    }

    this.blur();
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
        <SearchBox>
          <SearchInput
            innerRef={this.setInputRef}
            onChange={onChange}
            placeholder={placeholder}
            type="text"
            value={value}
          />
          <SearchClearButtonOuter>
            <SearchClearButton
              onClick={this.props.onSearchClear}
              onMouseDown={e => e.preventDefault()}
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
