// @flow
import React, { PureComponent } from 'react';
import { DEFAULT_BORDER_COLOR } from '../styled/constants';
import { Outer } from '../styled/Icon';
import getStatusSVG from '../helpers/getStatusSVG';
import type { StatusType, Size } from '../types';

// =============================================================
// NOTE: Duplicated in Avatar until docgen can follow imports.
// -------------------------------------------------------------
// DO NOT update values here without updating the other.
// =============================================================

export const SIZE = {
  values: ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'],
  defaultValue: 'medium',
};

export const STATUS_TYPE = {
  values: ['approved', 'declined', 'locked'],
};

type Props = {
  /** Used to override the default border color of the status indicator.
  Accepts any color argument that the border-color CSS property accepts. */
  borderColor?: string,
  /** Content to use as a custom status indicator (usually not required if
  consuming Status separate to Avatar). */
  children?: Object,
  /** Content to use as a custom status indicator (usually not required if
  consuming Status separate to Avatar). */
  status?: StatusType,
  /** Defines the size of the status. */
  size?: Size,
};

export default class Status extends PureComponent {
  props: Props; // eslint-disable-line react/sort-comp

  static defaultProps = {
    borderColor: DEFAULT_BORDER_COLOR,
  }

  render() {
    const { borderColor, children, status, size } = this.props;

    return (
      <Outer size={size} bgColor={borderColor}>
        {children || (status && getStatusSVG(status))}
      </Outer>
    );
  }
}
