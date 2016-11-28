import { storiesOf } from '@kadira/storybook';
import React, { PureComponent } from 'react';

import AkInlineEdit from '../src';
import { name } from '../package.json';

const formStyle = {
  padding: '20px',
  backgroundColor: 'white',
  width: '500px',
};

const inputStyle = {
  border: '0px',
  background: 'transparent',
  color: 'inherit',
  cursor: 'inherit',
  fontSize: '14px',
  outline: 0,
  width: '100%',
};

/* eslint-disable react/prop-types */
class TextInlineEdit extends PureComponent {
  static defaultProps = {
    initialValue: 'test',
  }

  constructor(props) {
    super(props);
    this.state = {
      editValue: props.initialValue,
    };
  }

  onChange = e => this.setState({ editValue: e.target.value })
  renderInput = () => <input
    onChange={this.onChange}
    value={this.state.editValue}
    style={inputStyle}
  />

  render() {
    return (<AkInlineEdit
      label="some label"
      view={this.props.initialValue}
      edit={this.renderInput()}
    />);
  }
}

storiesOf(name, module)
  .add('a simple ak-field-base', () => (
    <div>
      <form action="" style={formStyle}>
        <TextInlineEdit />
      </form>
    </div>
  ));
