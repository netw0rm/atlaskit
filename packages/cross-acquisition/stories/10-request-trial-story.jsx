import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { name } from '../package.json';

import { RequestTrial, CrossAcquisitionConfluenceProvider } from '@atlaskit/cross-acquisition';

storiesOf(name, module)
  .add('RequestTrial with Confluence provider', () => (
    <CrossAcquisitionConfluenceProvider>
      <RequestTrial />
    </CrossAcquisitionConfluenceProvider>
  ));
