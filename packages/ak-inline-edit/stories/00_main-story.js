import { storiesOf, action } from '@kadira/storybook';
import React, { PureComponent } from 'react';
import AkInlineEdit from '../src';
import { name } from '../package.json';

const containerStyle = {
  padding: 20,
  backgroundColor: 'white',
  width: 500,
};

const inputStyle = {
  border: 0,
  background: 'transparent',
  color: 'inherit',
  fontSize: 14,
  outline: 0,
  width: '100%',
};

/* eslint-disable react/prop-types */
class TextInlineEdit extends PureComponent {
  static defaultProps = {
    initialValue: 'test',
    label: 'Inline Edit',
  }

  state = {
    editValue: this.props.initialValue,
    isFocused: false,
  }

  onChange = e =>
    this.setState({ editValue: e.target.value })

  onEditEntered = () => {
    action('onEditEntered');
    this.textInput.focus();
  }

  renderInput = () =>
    <input
      onChange={this.onChange}
      value={this.state.editValue}
      style={inputStyle}
      ref={(textInput) => { this.textInput = textInput; }}
    />

  render = () =>
    <AkInlineEdit
      {...this.props}
      label={this.props.label}
      editView={this.renderInput()}
      readView={this.props.initialValue}
      isFocused={this.state.isFocused}
      onEditEntered={this.onEditEntered}
    />
}

storiesOf(name, module)
  .add('text inline edit with label', () => (
    <div style={containerStyle}>
      <TextInlineEdit />
    </div>
  ))
  .add('text inline edit with label hidden', () => (
    <div style={containerStyle}>
      <TextInlineEdit shouldHideLabel />
    </div>
  ));
