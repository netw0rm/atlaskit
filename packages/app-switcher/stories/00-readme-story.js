import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Description } from '@atlaskit/util-readme';

import { name } from '../package.json';

/* eslint-disable import/first, import/no-duplicates */
import BasicUsageExample from './examples/basic-usage';
import BasicUsageExampleRaw from '!raw!./examples/basic-usage';
/* eslint-enable import/first, import/no-duplicates */

const AppSwitcherDescription = (<Description>
  <p>This component provides the app switcher used in Atlassian Cloud products.</p>
</Description>);

storiesOf(name, module)
  .add('AppSwitcher Readme', () => (
    <div>
      <Readme
        component={name}
        description={AppSwitcherDescription}
      >
        <Code code={BasicUsageExampleRaw}>
          {BasicUsageExample}
        </Code>
      </Readme>
    </div>
  ));
