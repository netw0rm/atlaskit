import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { name } from '../package.json';

import { ConfluenceStartTrial } from '@atlaskit/cross-acquisition';

storiesOf(name, module)
  .add('ConfluenceStartTrial with...', () => (
    <ConfluenceStartTrial />
  ));
