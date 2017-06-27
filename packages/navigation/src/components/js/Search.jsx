import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import FieldBase from '@atlaskit/field-base';
import SearchBox from '../styled/SearchBox';
import SearchFieldBaseInner from '../styled/SearchFieldBaseInner';
import SearchInner from '../styled/SearchInner';
import SearchInput from '../styled/SearchInput';

const controlKeys = ['ArrowUp', 'ArrowDown', 'Enter'];

export default class Search extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    isLoading: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  }

  static defaultProps = {
    isLoading: false,
    placeholder: 'Search',
  }

  onInputKeyDown = (event) => {
    if (controlKeys.indexOf(event.key) === -1) {
      return;
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
    event.stopPropagation();
  }

  setInputRef = (ref) => {
    this.inputRef = ref;
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
