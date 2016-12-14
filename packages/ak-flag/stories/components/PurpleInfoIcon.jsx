import React, { PureComponent } from 'react';
import { InfoIcon } from 'ak-icon';
import { akColorP300 } from 'akutil-shared-styles';

// eslint-disable-next-line react/prefer-stateless-function
export default class PurpleInfoIcon extends PureComponent {
  render() {
    return (
      <div style={{ color: akColorP300 }}>
        <InfoIcon label="Info" />
      </div>
    );
  }
}
