import { action } from '@kadira/storybook';
import React, { PureComponent } from 'react';
import AkInlineEdit from '../src';

const inputStyle = {
  border: 0,
  background: 'transparent',
  color: 'inherit',
  fontSize: 14,
  outline: 0,
  width: '100%',
};

/* eslint-disable react/prop-types */
class TextInput extends PureComponent {
  componentDidMount = () =>
    this.textInput.focus()

  render = () => (
    <input
      value={this.props.value}
      style={inputStyle}
      onChange={this.props.onChange}
      ref={(textInput) => { this.textInput = textInput; }}
    />
  )
}

/* eslint-disable react/prop-types, react/no-multi-comp */
export default class extends PureComponent {
  static defaultProps = {
    initialValue: 'Text',
    label: 'Inline Edit',
  }

  state = {
    readValue: this.props.initialValue,
    editValue: this.props.initialValue,
  }

  onChange = e =>
    this.setState({ editValue: e.target.value })

  onConfirm = () => {
    action('onConfirm')();
    this.setState(state => ({ readValue: state.editValue }));
  }

  onCancel = () => {
    action('onCancel')();
    this.setState(state => ({ editValue: state.readValue }));
  }

  renderInput = () => (
    <TextInput
      value={this.state.editValue}
      onChange={this.onChange}
    />
  )

  render = () => (
    <AkInlineEdit
      label={this.props.label}
      editView={this.renderInput()}
      readView={this.state.readValue}
      onConfirm={this.onConfirm}
      onCancel={this.onCancel}
      {...this.props}
    />
  )
}
