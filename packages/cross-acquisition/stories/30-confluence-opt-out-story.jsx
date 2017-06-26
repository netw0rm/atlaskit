import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { name } from '../package.json';

import { ConfluenceOptOut } from '@atlaskit/cross-acquisition';

storiesOf(name, module)
  .add('OptOut with Confluence provider', () => (
    <ConfluenceOptOut />
  ));
