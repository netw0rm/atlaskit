import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { ArrowleftIcon, AtlassianIcon } from '@atlaskit/icon';
import { AkCreateDrawer } from '../src/index';
import { name } from '../package.json';

storiesOf(name, module)
  .add('with a standalone drawer', () => (
    <AkCreateDrawer
      backIcon={<ArrowleftIcon label="Back" />}
      isOpen
      isFullWidth
      primaryIcon={<AtlassianIcon size="medium" label="Logo" />}
    >
      <p>
        This is a standalone drawer.
        Drawers can be used outside of the Navigation component
        if you need to render a standalone focus task page.
      </p>
      <p>This is for the case where focus tasks have their own URLs.</p>
      <p>The back icon should point back to the product dashboard.</p>
    </AkCreateDrawer>
  ));
