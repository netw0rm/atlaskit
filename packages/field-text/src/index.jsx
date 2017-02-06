import React, { PureComponent } from 'react';
import FieldText from './FieldText';

export { FieldText };

/* eslint-disable react/prop-types */
export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  handleOnChange = (e) => {
    this.setState({ value: e.target.value });

    if (this.props.onChange) {
      this.props.onChange(e);
    }
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
