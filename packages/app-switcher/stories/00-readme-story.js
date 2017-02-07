import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props, Description } from '@atlaskit/util-readme';

import AppSwitcher from '../src'
import { name } from '../package.json';

/* eslint-disable import/first, import/no-duplicates */
import BasicUsageExample from './examples/basic-usage';
import BasicUsageExampleRaw from '!raw!./examples/basic-usage';
/* eslint-enable import/first, import/no-duplicates */

const AppSwitcherDescription = (<Description>
  <p>This component provides the app switcher used in Atlassian Cloud products.</p>
</Description>);

const propDescriptions = {
  recentContainers: 'Array of recent containers. If this array is empty the recent container section will be hidden.',
  linkedApplications: 'Map containing an array of linked applications. See prop-types.js for details on the exact format of this property.',
  suggestedApplication: 'Map containing which application to suggest to the user. See prop-types.js for details on the exact format of this property.',
  i18n: 'Mapping of i18n keys to translations.',
};

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
        <Props component={AppSwitcher} descriptions={propDescriptions} />
      </Readme>
    </div>
  ));
