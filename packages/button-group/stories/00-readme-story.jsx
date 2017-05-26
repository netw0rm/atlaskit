import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme from '@atlaskit/util-readme';

import { name, description } from '../package.json';

/* eslint-disable import/no-duplicates, import/first */
import defaultComponent from '../src/components/ButtonGroup';
import defaultComponentSource from '!raw!../src/components/ButtonGroup';
import defaultOverview from './examples/ButtonGroupOverview';
import defaultOverviewSource from '!raw!./examples/ButtonGroupOverview';
/* eslint-enable import/no-duplicates, import/first */

storiesOf(name, module)
  .add('📖 ButtonGroup readme', () => (
    <Readme
      name={name}
      component={defaultComponent}
      componentSource={defaultComponentSource}
      example={defaultOverview}
      exampleSource={defaultOverviewSource}
      description={description}
    />
  ));
