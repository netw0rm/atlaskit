import React from 'react';
import Readme, { Description, Props, Code } from '@atlaskit/util-readme';
import { storiesOf } from '@kadira/storybook';

import { AkGlobalNavigation } from '../../src/index';

import { name, description } from '../../package.json';

const globalNavigationPropDescriptions = {
  accountItem: 'The user profile item to place at the bottom, usually an avatar and a dropdown trigger',
  helpItem: 'The help item to place next to the account item, usually a "?" icon and a dropdown trigger',
  linkComponent: 'Used to render all links in the GlobalNavigation. See linkComponent docs for more details',
  primaryIcon: 'The icon to be used at the top of the GlobalNavigation – usually a product logo or a global home icon',
  primaryItemHref: 'The href that the primary icon should link to – usually the product dashboard',
  shouldAnimate: 'Whether the navigation should display animations – used by Navigation during resize',
  searchIcon: 'The icon to use for the search item - usually a 🔎 magnifying glass',
  onSearchActivate: 'Handler to call when the search item is clicked',
  onCreateActivate: 'Handler to call when the create item is clicked',
  createIcon: 'The icon to use for the create item - usually a + plus sign',
};

storiesOf(name, module)
  .add('📖 Global navigation readme', () => (
    <Readme
      component={name}
      description={description}
    >
      <Code>{`
          import { AkGlobalNavigation } from '@atlaskit/navigation';
      `}</Code>
      <Description>
        The GlobalNavigation component represents the blue bar, and is a part of
        Navigation. This component will nearly always be used with
        ContainerNavigation as a part of Navigation, but it is provided as part
        of the API for use cases that do not require ContainerNavigation as
        well.
      </Description>
      <Props component={AkGlobalNavigation} descriptions={globalNavigationPropDescriptions} />
    </Readme>
  ));
