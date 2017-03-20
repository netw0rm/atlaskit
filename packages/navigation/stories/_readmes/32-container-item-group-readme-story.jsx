import React from 'react';
import Readme, { Description, Props } from '@atlaskit/util-readme';
import { storiesOf } from '@kadira/storybook';

import { AkContainerItemGroup } from '../../src/index';

import { name, description } from '../../package.json';

const containerItemGroupPropDescriptions = {
  action: 'An action to place alongside the header of the container item group',
  children: 'The items that belong to this group',
  title: 'The header of the group, details the semantic grouping that this ContainerItemGroup represents',
  hasSeparator: 'Defines if the group sould draw a line to divide its content from the section above',
  appearance: 'The visual style of the ContainerNavigation - it can be styled to appear like the GlobalNavigation, to create the Global product home navigation. This is useful for product dashboard screens.',
};

storiesOf(name, module)
  .add('📖 ContainerItemGroup readme', () => (
    <Readme
      component={name}
      description={description}
    >
      <Description>
        The ContainerItemGroup component is used to group together
        ContainerItems. It can contain an action as well, to possibly add
        additional items to that group.
      </Description>
      <Props component={AkContainerItemGroup} descriptions={containerItemGroupPropDescriptions} />
    </Readme>
  ));
