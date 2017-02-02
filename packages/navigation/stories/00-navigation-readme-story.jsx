import React from 'react';
import Readme, { Props, Description, Code } from 'akutil-readme';
import { storiesOf } from '@kadira/storybook';

import Navigation from '../src/index';

import { name, description } from '../package.json';

const navigationPropDescriptions = {
  children: 'Content to go inside the Container Navigation',
  containerAppearance: 'The appearance of the container navigation',
  containerHeaderComponent: 'The component to be rendered in the container as the header – usually a product logo or a title of the container',
  createDrawerContent: 'Content to go inside the create drawer. See the "create drawer" docs for more details',
  drawerBackIcon: 'An icon that will be used as the close button for all drawers',
  globalAccountItem: 'Content that will be placed in the global navigation - the account item is usually an avatar, wrapped in a dropdown trigger',
  globalCreateIcon: 'The icon to use in the global navigation for the global create button',
  globalHelpItem: 'Content that will be placed in the global navigation - the help item is usually an icon, wrapped in a dropdown trigger',
  globalPrimaryIcon: 'The topmost icon to be placed in the global navigation - usually the product logo, or the product home icon',
  globalPrimaryItemHref: 'A link to place around the primary icon. The rendering of this link is controlled by Navigation.linkComponent',
  globalSearchIcon: 'The icon to use in the global navigation for the global search button',
  hasBlanket: 'Whether the navigation should render a blanket for search and create',
  isCreateDrawerOpen: 'Whether the create drawer is currently open',
  isOpen: 'Whether the navigation is currently open',
  isResizeable: 'Whether the navigation is resizeable by the user. The navigation\'s open state can still be set by the application',
  isSearchDrawerOpen: 'Whether the search drawer is currently open',
  linkComponent: 'A component that will be used to render links. See the linkComponent docs for more details',
  onBlanketClicked: 'A handler to call when the blanket has been clicked. Usually closes the search and create drawers.',
  onCreateDrawerClose: 'A handler to call when the navigation intends for the create drawer to be closed - called when the back button is pressed',
  onCreateDrawerOpen: 'A handler to call when the navigation intends for the create drawer to be opened - called when the global create item is pressed',
  onSearchDrawerClose: 'A handler to call when the navigation intends for the search drawer to be closed - called when the back button is pressed',
  onSearchDrawerOpen: 'A handler to call when the navigation intends for the search drawer to be opened - called when the back button is pressed',
  searchDrawerContent: 'Content to go inside the search drawer. See the "search drawer" docs for more details',
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
