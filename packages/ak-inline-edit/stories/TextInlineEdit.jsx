import { action } from '@kadira/storybook';
import React, { PureComponent } from 'react';
import SingleLineTextInput from 'ak-input';
import AkInlineEdit from '../src';

/* eslint-disable react/prop-types */
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

  renderInput = ({ isEditing }) => (
    <SingleLineTextInput
      autoFocus
      isEditing={isEditing}
      isInitiallySelected
      value={this.state.editValue}
      onChange={this.onChange}
    />
  )

  render = () => (
    <AkInlineEdit
      label={this.props.label}
      editView={this.renderInput({ isEditing: true })}
      readView={this.renderInput({ isEditing: false })}
      onConfirm={this.onConfirm}
      onCancel={this.onCancel}
      {...this.props}
    />
  )
}
