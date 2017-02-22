import React from 'react';
import Readme, { Description, Props } from '@atlaskit/util-readme';
import { storiesOf } from '@kadira/storybook';

import { AkDrawer as Drawer } from '../../src/index';

import { name, description } from '../../package.json';

const drawerComponentPropDescriptions = {
  backIcon: 'The icon to use as the back icon for this drawer',
  backIconOffset: 'The Y offset in pixels to use for the back icon. This is necessary for ContainerItems that can trigger Drawers.',
  children: 'The drawer contents',
  header: 'The header for this Drawer – often the ContainerTitle for a given Container',
  isOpen: 'Whether the Drawer is currently open',
  isWide: 'Whether the Drawer is wide – this is used for the Search drawer, and other Drawers that require additional room',
  onBackButton: 'A function to call when the backIcon button is clicked, or when the blanket behind the Drawer is clicked',
  primaryIcon: 'The primary icon in the Drawer – usually the globalPrimaryIcon that was given to the GlobalNavigation component',
};

storiesOf(name, module)
  .add('📖 Drawer readme', () => (
    <Readme
      component={name}
      description={description}
    >
      <Description>
        Drawers fly out from the left hand side of the screen, and contain some
        actions that allow users to navigate between containers, or allow users
        to create content and containers.

        Usually the Navigation contaisn two main Drawers – search and create.
        Other Drawers can be added that are triggered from ContainerItems – you
        may want to do this instead of NestedNavigation in the collapsed state.
      </Description>
      <Props component={Drawer} descriptions={drawerComponentPropDescriptions} />
    </Readme>
  ));
