import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { name } from '../package.json';

import { ConfluenceStartTrialProgress } from '@atlaskit/cross-acquisition';

storiesOf(name, module)
  .add('StartTrialProgress with Confluence provider', () => (
    <ConfluenceStartTrialProgress />
  ));
