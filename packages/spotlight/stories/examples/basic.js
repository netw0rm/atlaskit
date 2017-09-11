import React from 'react';
import Button from '@atlaskit/button';

import { Spotlight, SpotlightDest, SpotlightProvider } from '../../src';

export default () => (
  <SpotlightProvider>
    <div>
      <Spotlight name="button">
        <Button>Target</Button>
      </Spotlight>
      <SpotlightDest target="button">
        <Button>Target</Button>
      </SpotlightDest>
    </div>
  </SpotlightProvider>
);
