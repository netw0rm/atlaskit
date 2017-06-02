import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import FieldBase from '@atlaskit/field-base';
import SearchBox from '../styled/SearchBox';
import SearchFieldBaseInner from '../styled/SearchFieldBaseInner';
import SearchInner from '../styled/SearchInner';
import SearchInput from '../styled/SearchInput';
import SearchResults from '../styled/SearchResults';

export default class Search extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    isLoading: PropTypes.boolean,
    onChange: PropTypes.func.isRequired,
    onSearchClear: PropTypes.func,
    placeholder: PropTypes.string,
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
        <SearchResults>
          {children}
        </SearchResults>
      </SearchInner>
    );
  }
}
