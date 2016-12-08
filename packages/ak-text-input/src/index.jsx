import React, { PureComponent } from 'react';
import TextInput from './TextInput';

export { TextInput };

/* eslint-disable react/prop-types */
export default class extends PureComponent {
  state = {
    value: this.props.value,
  }

  onChange = ({ target: { value } }) =>
    this.setState({ value });

  render = () => (
    <TextInput
      {...this.props}
      value={this.state.value}
      onChange={this.onChange}
    />
  );
}
