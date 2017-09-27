import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Button from '@atlaskit/button';

import { name } from '../package.json';
import { SpotlightModal } from '../src';

storiesOf(name, module)
  .add('New Jira', () => (
    <SpotlightModal appearance="center">
      (image)
      Experience your new Jira
      <Button>Switch to the new Jira</Button>
      <Button>Remind me later</Button>
    </SpotlightModal>
  ))
  .add('Your Expeirence', () => (
    <SpotlightModal appearance="center">
      (image)
      Experience your new Jira
      <Button>Show me the new navigation</Button>
    </SpotlightModal>
  ));
