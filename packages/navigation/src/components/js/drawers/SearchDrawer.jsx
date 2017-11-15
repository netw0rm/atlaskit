// @flow
import React, { PureComponent } from 'react';
import Drawer from '../Drawer';
import { additionalOffsetIfHomeIcon, searchIconOffset } from '../../../shared-variables';
import type { DrawerProps } from '../../../types';

/*
NOTE: All drawers mirror each other in design, with the only difference
being the offset.
*/
export default class SearchDrawer extends PureComponent {
  props: DrawerProps
  render() {
    const iconOffset = this.props.isHomeInGlobalNav
      ? searchIconOffset + additionalOffsetIfHomeIcon
      : searchIconOffset;
    return (
      <Drawer
        iconOffset={iconOffset}
        width={this.props.isFullWidth ? 'full' : 'wide'}
        {...this.props}
      />
    );
  }
}
