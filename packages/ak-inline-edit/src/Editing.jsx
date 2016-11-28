import React, { PureComponent } from 'react';
import FieldBase from 'ak-field-base';

/* eslint-disable react/prop-types, react/prefer-stateless-function */
export default class Editing extends PureComponent {
  render() {
    return (
      <div>
        <FieldBase label={this.props.label}>
          {this.props.children}
        </FieldBase>
      </div>
    );
  }
}
