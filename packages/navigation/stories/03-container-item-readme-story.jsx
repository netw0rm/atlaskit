import React from 'react';
import Readme, { Description, Props } from 'akutil-readme';
import { storiesOf } from '@kadira/storybook';

import { AkContainerItem, AkDrawerItem } from '../src/index';

import { name, description } from '../package.json';

const containerItemSpeificPropDescriptions = {
  appearance: 'The appearance of the navigation item – can be styled to match a global container',
  isSelected: 'Whether the item is currently in a selected state',
};

const navigationItemPropDescriptions = {
  icon: 'The icon to show in the left hand side of the item. Can be an avatar, or an icon (both small size)',
  isCompact: 'Whether the item should have reduced height, for higher density of items',
  text: 'The main text content of the item',
  textAfter: 'Addition text to display on the right hand side of the item – usually a badge communicating extra semantic information',
  action: 'Content to display in the same spot as textAfter, but for interactive elements. This will obscure textAfter',
  href: 'The href that this item will link to',
  linkComponent: 'The component that will be used to render the link. See linkComponent docs for details',
};

storiesOf(name, module)
  .add('📖 ContainerItem readme', () => (
    <Readme
      component={name}
      description={description}
    >
      <Description>
        The ContainerItem component is used in the ContainerNavigation, and is
        used to represent views of content inside a container. They are often
        links to different views of a particular container.
      </Description>
      <Props
        component={AkContainerItem}
        descriptions={Object.assign(
          navigationItemPropDescriptions,
          containerItemSpeificPropDescriptions
        )}
      />
    </Readme>
  ))
  .add('📖 DrawerItem readme', () => (
    <Readme
      component={name}
      description={description}
    >
      <Description>
        The DrawerItem component is used in the Drawers, and is used to
        represent different actions related to searching and created content.
      </Description>
      <Props component={AkDrawerItem} descriptions={navigationItemPropDescriptions} />
    </Readme>
  ));
