import React, { PureComponent } from 'react';
import { SuccessIcon } from 'ak-icon';
import { akColorG300 } from 'akutil-shared-styles';

// eslint-disable-next-line react/prefer-stateless-function
export default class GreenSuccessIcon extends PureComponent {
  render() {
    return (
      <div style={{ color: akColorG300 }}>
        <SuccessIcon label="Info" />
      </div>
    );
  }
}
