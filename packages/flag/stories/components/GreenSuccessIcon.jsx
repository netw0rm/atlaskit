import React, { PureComponent } from 'react';
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import { colors } from '@atlaskit/theme';

export default class GreenSuccessIcon extends PureComponent {
  render() {
    return (
      <SuccessIcon
        primaryColor={colors.G300}
        label="Info"
      />
    );
  }
}
