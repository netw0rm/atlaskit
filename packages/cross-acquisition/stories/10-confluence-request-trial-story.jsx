import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { name } from '../package.json';

import { ConfluenceRequestTrial } from '@atlaskit/cross-acquisition';

storiesOf(name, module)
  .add('ConfluenceRequestTrial with...', () => (
    <ConfluenceRequestTrial />
  ));
