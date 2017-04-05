import React, { PureComponent } from 'react';
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import { akColorY300 } from '@atlaskit/util-shared-styles';

export default class YellowWarningIcon extends PureComponent {
  render() {
    return (
      <div style={{ color: akColorY300 }}>
        <SuccessIcon label="Info" />
      </div>
    );
  }
}
