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
  }

  static defaultProps = {
    placeholder: 'Search',
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
            autoFocus
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
