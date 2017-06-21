import * as React from 'react';
import { PureComponent } from 'react';
import { NumericAvatarStyle } from './styles';

export interface Props {
  num: number;
}

export default class NumericAvatar extends PureComponent<Props, {}> {

  private static prepareForDisplay(num: number): string {
    if (num < 0) {
      return '0';
    }

    if (num >= 100) {
      return '99+';
    }

    return "" + Math.round(num);
  }

  render() {
    const { num } = this.props;

    return (
      <NumericAvatarStyle>{NumericAvatar.prepareForDisplay(num)}</NumericAvatarStyle>
    );
  }
}
