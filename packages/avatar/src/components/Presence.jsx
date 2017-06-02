// @flow
import React, { PureComponent } from 'react';
import { akColorPrimary3 } from '@atlaskit/util-shared-styles';
import Div from '../styled/Presence';
import getPresenceSVG from '../utils/getPresenceSVG';
import { PresenceType, Size } from '../types';

// TODO: This probably shouldn't be part of the public API; it can probably
// safely be removed but we should check because it's technically a breaking change
export { getPresenceSVG };

// =============================================================
// NOTE: Duplicated in Avatar until docgen can follow imports.
// -------------------------------------------------------------
// DO NOT update values here without updating the other.
// =============================================================

export const SIZE = {
  values: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
  defaultValue: 'medium',
};
export const PRESENCE_TYPE = {
  values: ['none', 'online', 'busy', 'offline'],
  defaultValue: 'none',
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
    borderColor: akColorPrimary3, // white
    presence: PRESENCE_TYPE.defaultValue,
  }

  render() {
    const { borderColor, children, presence, size } = this.props;
    const style = { borderColor };

    return (
      <Div size={size} style={style}>
        {children || (presence && getPresenceSVG(presence))}
      </Div>
    );
  }
}
