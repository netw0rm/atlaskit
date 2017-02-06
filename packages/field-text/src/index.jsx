import React, { PureComponent } from 'react';
import FieldText from './FieldText';

export { FieldText };

/* eslint-disable react/prop-types */
export default class extends PureComponent {
  static defaultProps = {
    onChange: () => {},
  }

  state = {
    value: this.props.value,
  }

  handleOnChange = (e) => {
    this.setState({ value: e.target.value });
    this.props.onChange(e);
  }

  render() {
    return (
      <FieldText
        {...this.props}
        value={this.state.value}
        onChange={this.handleOnChange}
      />
    );
  }
}
