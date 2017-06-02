import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme from '@atlaskit/util-readme';

/* eslint-disable import/no-duplicates, import/first */
import button from '../src/components/Button';
import buttonSource from '!raw!../src/components/Button';
import buttonOverview from './examples/ButtonOverview';
import buttonOverviewSource from '!raw!./examples/ButtonOverview';
import buttonGroup from '../src/components/ButtonGroup';
import buttonGroupSource from '!raw!../src/components/ButtonGroup';
import buttonGroupOverview from './examples/ButtonGroupOverview';
import buttonGroupOverviewSource from '!raw!./examples/ButtonGroupOverview';
/* eslint-enable import/no-duplicates, import/first */

import { name, description } from '../package.json';

const buttonGroupDescription = 'A React component that groups related buttons';

storiesOf(name, module)
  .add('📖 Button readme', () => (
    <Readme
      component={button}
      componentSource={buttonSource}
      description={description}
      example={buttonOverview}
      exampleSource={buttonOverviewSource}
      name={name}
    />
  ))
  .add('📖 ButtonGroup readme', () => (
    <Readme
      component={buttonGroup}
      componentSource={buttonGroupSource}
      description={buttonGroupDescription}
      example={buttonGroupOverview}
      exampleSource={buttonGroupOverviewSource}
      name={'button group'}
    />
  ));
