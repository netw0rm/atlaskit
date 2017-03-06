import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import { name } from '../package.json';
import MentionTextInput from './demo-mention-text-input';
import ConfigurableMentionPicker from './demo-configurable-mention-picker';

import sampleConfig from '../local-config-example';

let config;

try {
  // eslint-disable-next-line import/no-unresolved, global-require
  config = require('../local-config').default;
} catch (e) {
  config = sampleConfig;
}

const asapconfig = config.asap;
const ssconfig = config.sessionservice;
const cookieconfig = { ...ssconfig };
cookieconfig.securityProvider = undefined;

storiesOf(`${name}/MentionPicker-external`, module)
  .add('Input field mention list. Real API. Key binding', () => (
    <ConfigurableMentionPicker
      config={asapconfig}
    >
      <MentionTextInput
        label="User search"
        onSelection={action('mention selected')}
      />
    </ConfigurableMentionPicker>
  ))

  .add('Input field mention list. Real API, with productIdentifier and cloudId. Key binding', () => (
    <ConfigurableMentionPicker
      config={ssconfig}
    >
      <MentionTextInput
        label="User search"
        onSelection={action('mention selected')}
      />
    </ConfigurableMentionPicker>
  ))

  .add('Input field mention list. Real API, but expecting an Atlassian Id Cookie for authentication and authorisation', () => (
    <ConfigurableMentionPicker
      config={cookieconfig}
    >
      <MentionTextInput
        label="User search"
        onSelection={action('mention selected')}
      />
    </ConfigurableMentionPicker>
  ));
