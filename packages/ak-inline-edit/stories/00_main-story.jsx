import { storiesOf } from '@kadira/storybook';
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
class TextInlineEdit extends PureComponent {
  static defaultProps = {
    initialValue: 'Text',
    label: 'Inline Edit',
  }

  state = {
    editValue: this.props.initialValue,
  }

  onChange = e =>
    this.setState({ editValue: e.target.value })

  renderInput = () => (
    <TextInput
      value={this.state.editValue}
      onChange={this.onChange}
    />
  )

  render = () => (
    <AkInlineEdit
      {...this.props}
      label={this.props.label}
      editView={this.renderInput()}
      readView={this.props.initialValue}
    />
  )
}

storiesOf(name, module)
  .add('with label', () => (
    <div style={containerStyle}>
      <TextInlineEdit />
    </div>
  ))
  .add('with label hidden', () => (
    <div style={containerStyle}>
      <TextInlineEdit isLabelHidden />
    </div>
  ))
  .add('with no edit view', () => (
    <div style={containerStyle}>
      <AkInlineEdit
        label="Read-only"
        readView="Can't touch this"
      />
    </div>
  ))
  .add('with no edit view and label hidden', () => (
    <div style={containerStyle}>
      <AkInlineEdit
        label="Read-only"
        readView="Can't touch this"
        isLabelHidden
      />
    </div>
  ));
