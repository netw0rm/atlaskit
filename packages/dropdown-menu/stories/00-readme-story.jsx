import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme from '@atlaskit/util-readme';

import { name, description } from '../package.json';

/* eslint-disable import/no-duplicates, import/first */
import dropdown from '../src/components/DropdownMenu';
import dropdownSource from '!raw!../src/components/DropdownMenu';
import dropdownOverview from './examples/DropdownOverview';
import dropdownOverviewSource from '!raw!./examples/DropdownOverview';

import dropdownStateless from '../src/components/DropdownMenuStateless';
import dropdownStatelessSource from '!raw!../src/components/DropdownMenuStateless';
import dropdownStatelessOverview from './examples/DropdownStatelessOverview';
import dropdownStatelessOverviewSource from '!raw!./examples/DropdownStatelessOverview';
/* eslint-enable import/no-duplicates, import/first */

storiesOf(name, module)
  .add('📖 DropdownMenu readme', () => (
    <Readme
      name={name}
      component={dropdown}
      componentSource={dropdownSource}
      example={dropdownOverview}
      exampleSource={dropdownOverviewSource}
      description={description}
    />
  ))
  .add('📖 DropdownMenuStateless readme', () => (
    <Readme
      name="DropdownMenuStateless"
      component={dropdownStateless}
      componentSource={dropdownStatelessSource}
      example={dropdownStatelessOverview}
      exampleSource={dropdownStatelessOverviewSource}
      description={description}
    />
  ));
