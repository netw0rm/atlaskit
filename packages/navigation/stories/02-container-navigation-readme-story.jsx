import React from 'react';
import Readme, { Description, Props, Code } from 'akutil-readme';
import { storiesOf } from '@kadira/storybook';

import { AkContainerNavigation } from '../src/index';

import { name, description } from '../package.json';

const globalActionPropDescription = 'The same as the property to GlobalNavigation, used when the ContainerNavigation is in the collapsed state.';

const containerNavigationPropDescriptions = {
  appearance: 'The visual style of the ContainerNavigation - it can be styled to appear like the GlobalNavigation, to create the Global product home navigation. This is useful for product dashboard screens.',
  areGlobalActionsVisible: 'Whether the global actions (search, create, and the primary item) are visible in the container navigation. In t',
  children: 'ContainerItems that will render inside the ContainerNavigation',
  headerComponent: 'Used to render the header component of the ContainerNavigation - usually a ContainerTitle or a Logo',
  shouldAnimate: 'Whether the navigation should display animations – used by Navigation during resize',
  width: 'The width at which to render the ContainerNavigation - used by Navigation during resize',
  offsetX: 'The X offset that the ContainerNavigation renders at. Defaults to 0, but is shifted left (negatively) by Navigation during Resize',
  linkComponent: 'Used to render all links in the ContainerNavigation. See linkComponent docs for more details',
  globalPrimaryItemHref: globalActionPropDescription,
  globalPrimaryIcon: globalActionPropDescription,
  globalSearchIcon: globalActionPropDescription,
  globalCreateIcon: globalActionPropDescription,
  onGlobalCreateActivate: globalActionPropDescription,
  onGlobalSearchActivate: globalActionPropDescription,
};

storiesOf(name, module)
  .add('📖 Container navigation readme', () => (
    <Readme
      component={name}
      description={description}
    >
      <Code>{`
          import { AkGlobalNavigation } from 'ak-navigation';
      `}</Code>
      <Description>
        The ContainerNavigation component represents the grey bar, and is a part
        of Navigation. This component will nearly always be used with
        GlobalNavigation as a part of Navigation, but it is provided as part of
        the API for use cases that do not require GlobalNavigation as well.
      </Description>
      <Props component={AkContainerNavigation} descriptions={containerNavigationPropDescriptions} />
    </Readme>
  ));
