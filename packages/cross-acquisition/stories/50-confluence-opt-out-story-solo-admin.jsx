import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { name } from '../package.json';

import { ConfluenceOptOutSoloAdmin } from '@atlaskit/cross-acquisition';

storiesOf(name, module)
  .add('ConfluenceOptOutSoloAdmin with...', () => (
    <ConfluenceOptOutSoloAdmin />
  ));
