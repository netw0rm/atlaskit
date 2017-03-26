import React from 'react';
import Readme, { Props, Description, Code } from '@atlaskit/util-readme';
import { storiesOf } from '@kadira/storybook';

import Navigation from '../../src/index';

import { name, description } from '../../package.json';

const navigationPropDescriptions = {
  children: 'Content to go inside the Container Navigation',
  containerAppearance: 'The appearance of the container navigation',
  containerHeaderComponent: 'The component to be rendered in the container as the header – usually a product logo or a container title',
  globalPrimaryIcon: 'The topmost icon to be placed in the global navigation - usually the product logo, or the product home icon',
  globalPrimaryItemHref: 'A link to place around the primary icon. The rendering of this link is controlled by Navigation.linkComponent',
  globalSearchIcon: 'The icon to use in the global navigation for the global search button',
  globalSecondaryActions: 'A list of nodes to be placed in the secondary actions slot in the global sidebar. This should not exceed four nodes.',
  isOpen: 'Whether the navigation is currently open',
  isResizeable: 'Whether the navigation is resizeable by the user. The navigation\'s open state can still be set by the application',
  isSearchDrawerOpen: 'Whether the search drawer is currently open',
  linkComponent: 'A component that will be used to render links. See the linkComponent docs for more details',
  onBlanketClicked: 'A handler to call when the blanket has been clicked. Usually closes the search and create drawers.',
  onResizeStart: 'A handler to call when the navigation starts resizing - called when the resizer starts dragging',
  width: 'The width at which to render the navigation. This is only adhered to if Navigation.isOpen is true.',
};

storiesOf(name, module)
  .add('📖 Navigation readme', () => (
    <Readme
      component={name}
      description={description}
    >
      <Description>
        The Navigation component is a high level component that wraps many
        individual components. The general structure of the component is
        displayed below.
        <Code>{`
          Navigation
            - Global Navigation
              - Create
              - Search
            - Container Navigation
              - Container header
              - Items
            - Drawers
        `}</Code>
        The Global Navigation is the blue bar on the left, and is used for
        global product actions like search and create, and user account options.
        The Container Navigation is the grey bar on the right, and is used for
        container specific links and navigation. Navigation wraps both of these
        components, and passes props onto these children.
      </Description>
      <Props component={Navigation} descriptions={navigationPropDescriptions} />
    </Readme>
  ));
