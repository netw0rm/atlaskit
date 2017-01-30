import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props } from 'akutil-readme';

import InlineMessageExample from './examples/InlineMessageExample'; // eslint-disable-line import/first, import/no-duplicates
import InlineMessageExampleRaw from '!raw!./examples/InlineMessageExample'; // eslint-disable-line import/first, import/no-duplicates

import { name, description } from '../package.json';
import InlineMessage from '../src';

const inlineMessagePropDescriptions = {
  children: 'Content to display inside the dialog that is shown when the user clicks the inline message',
  title: 'Main text to be shown next to the icon',
  type: 'Defines the icon and colour to be used for the message',
  secondaryText: 'Text to be shown in a more subtle color next to the main text',
};

const inlineMessagePropTypes = {
  children: 'node',
  title: 'string',
  type: 'oneOf(["connectivity", "confirmation", "info", "warning", "error"])',
  secondaryText: 'string',
};

storiesOf(name, module)
  .add('📖 Inline Message readme', () => (
    <div>
      <Readme
        component={name}
        description={description}
      >
        <Code code={InlineMessageExampleRaw}>
          {InlineMessageExample}
        </Code>
        <Props
          component={InlineMessage}
          descriptions={inlineMessagePropDescriptions}
          types={inlineMessagePropTypes}
        />
      </Readme>
    </div>
  ));
