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
  render() {
    return (
      <FieldText
        {...this.props}
        value={this.state.value}
        onChange={e => this.setState({ value: e.target.value })}
      />
    );
  }
}
