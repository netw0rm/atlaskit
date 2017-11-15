// @flow
import React, { PureComponent } from 'react';
import Drawer from '../Drawer';
import { additionalOffsetIfHomeIcon, createIconOffset } from '../../../shared-variables';
import type { DrawerProps } from '../../../types';

/*
NOTE: All drawers mirror each other in design, with the only difference
being the offset.
*/
export default class CreateDrawer extends PureComponent {
  props: DrawerProps

  render() {
    const iconOffset = this.props.isHomeInGlobalNav
      ? createIconOffset + additionalOffsetIfHomeIcon
      : createIconOffset;
    return (
      <Drawer
        iconOffset={iconOffset}
        width={this.props.isFullWidth ? 'full' : 'narrow'}
        {...this.props}
      />
    );
  }
}
