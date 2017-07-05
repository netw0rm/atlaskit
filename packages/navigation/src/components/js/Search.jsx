import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import FieldBase from '@atlaskit/field-base';
import SearchBox from '../styled/SearchBox';
import SearchFieldBaseInner from '../styled/SearchFieldBaseInner';
import SearchInner from '../styled/SearchInner';
import SearchInput from '../styled/SearchInput';

const controlKeys = ['ArrowUp', 'ArrowDown', 'Enter', 'Escape'];

export default class Search extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    isLoading: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    onSearchClear: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  }

  static defaultProps = {
    isLoading: false,
    placeholder: 'Search',
  }

  // clear the input when the user hits Escape
  onInputKeyDown = (event) => {
    if (controlKeys.indexOf(event.key) === -1) {
      return;
    }

    if (event.key === 'Escape') {
      this.clear();
    } else if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }

    event.stopPropagation();
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
          <FieldBase
            appearance="none"
            isFitContainerWidthEnabled
            isPaddingDisabled
            isLoading={this.props.isLoading}
          >
            <SearchFieldBaseInner>
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
            </SearchFieldBaseInner>
          </FieldBase>
        </SearchBox>
        {children}
      </SearchInner>
    );
  }
}
