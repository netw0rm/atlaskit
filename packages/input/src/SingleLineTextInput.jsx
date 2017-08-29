import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import keyCode from 'keycode';
import { akFontSizeDefault } from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

const common = `
  appearance: none;
  color: inherit;
  font-size: ${akFontSizeDefault};
  font-family: inherit;
  letter-spacing: normal;
`;

const ReadView = styled.div`
  ${common}
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const EditView = styled.input`
  ${common}
  background: transparent;
  border: 0;
  box-sizing: border-box;
  cursor: inherit;
  height: ${20 / 14}em; /* for IE11 because it ignores the line-height */
  line-height: inherit;
  margin: 0;
  outline: none;
  padding: 0;
  width: 100%;
  :invalid: {
    boxshadow: none;
  },
`;

export default class SingleLineTextInput extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    style: PropTypes.shape({}),
    isInitiallySelected: PropTypes.bool,
    isEditing: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func,
    onKeyDown: PropTypes.func,
  }

  static defaultProps = {
    style: {},
    isInitiallySelected: false,
    onConfirm: () => {},
    onKeyDown: () => {},
  }

  componentDidMount() {
    this.selectInputIfNecessary();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isEditing) {
      this.selectInputIfNecessary();
    }
  }

  onKeyDown = (event) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
    if (event.keyCode === keyCode('enter')) {
      this.props.onConfirm(event);
    }
  }

  getInputProps = () => {
    const inputProps = {
      ...this.props,
      type: 'text',
      onKeyDown: this.onKeyDown,
    };
    delete inputProps.style;
    delete inputProps.isEditing;
    delete inputProps.isInitiallySelected;
    delete inputProps.onConfirm;
    return inputProps;
  }

  selectInputIfNecessary() {
    if (this.props.isEditing && this.props.isInitiallySelected) {
      this.inputRef.select();
    }
  }

  renderEditView() {
    return (
      <EditView
        style={this.props.style}
        {...this.getInputProps()}
        innerRef={(ref) => { this.inputRef = ref; }}
      />
    );
  }

  renderReadView() {
    return (
      <ReadView style={this.props.style}>{this.props.value}</ReadView>
    );
  }

  render() {
    return this.props.isEditing ? this.renderEditView() : this.renderReadView();
  }
}
