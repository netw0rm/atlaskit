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

storiesOf(`${name}/MentionPicker-external`, module)
  .add('Input field mention list. Real API. Key binding', () => (
    <ConfigurableMentionPicker
      config={config}
    >
      <MentionTextInput
        label="User search"
        onSelection={action('mention selected')}
      />
    </ConfigurableMentionPicker>
  ));

