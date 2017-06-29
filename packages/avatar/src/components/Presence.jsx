// @flow
import React, { PureComponent } from 'react';
import { Inner, Outer } from '../styled/Presence';
import { DEFAULT_BORDER_COLOR } from '../styled/constants';
import getPresenceSVG from '../helpers/getPresenceSVG';
import type { PresenceType, Size } from '../types';

// =============================================================
// NOTE: Duplicated in Avatar until docgen can follow imports.
// -------------------------------------------------------------
// DO NOT update values here without updating the other.
// =============================================================

export const SIZE = {
  values: ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'],
  defaultValue: 'medium',
};

export const PRESENCE_TYPE = {
  values: ['busy', 'offline', 'online'],
};

type Element = Object;

export default class Presence extends PureComponent {
  props: { // eslint-disable-line react/sort-comp
    /** Used to override the default border color of the presence indicator.
    Accepts any color argument that the border-color CSS property accepts. */
    borderColor?: string,
    /** Content to use as a custom presence indicator (usually not required if
    consuming Presence separate to Avatar). */
    children?: Element,
    /** Content to use as a custom presence indicator (usually not required if
    consuming Presence separate to Avatar). */
    presence?: PresenceType,
    /** Defines the size of the presence. */
    size?: Size,
  };

  static defaultProps = {
    borderColor: DEFAULT_BORDER_COLOR,
  }

  render() {
    const { borderColor, children, presence, size } = this.props;

    return (
      <Outer size={size} bgColor={borderColor}>
        <Inner>
          {children || (presence && getPresenceSVG(presence))}
        </Inner>
      </Outer>
    );
  }
}
