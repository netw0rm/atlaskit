import React, { PureComponent } from 'react';
import { FieldText } from '@atlaskit/field-text';

export default class Example extends PureComponent {
  state = {
    value: '',
  }

  setValue = e => this.setState({ value: e.target.value })

  render() {
    return (
      <FieldText
        label="Stateless Text Input Example"
        onChange={this.setValue}
        value={this.state.value}
      />
    );
  }
}
