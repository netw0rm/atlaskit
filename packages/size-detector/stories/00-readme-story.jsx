import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Readme from '@atlaskit/util-readme';
import { name, description } from '../package.json';

/* eslint-disable import/no-duplicates, import/first */
import defaultComponent from '../src/SizeDetector';
import defaultComponentSource from '!raw!../src/SizeDetector';
import defaultOverview from './examples/BasicExample';
import defaultOverviewSource from '!raw!./examples/BasicExample';
/* eslint-enable import/no-duplicates, import/first */

storiesOf(name, module)
  .add('📖 Size Detector readme', () => (
    <Readme
      name={name}
      component={defaultComponent}
      componentSource={defaultComponentSource}
      description={description}
      example={defaultOverview}
      exampleSource={defaultOverviewSource}
    />
  ));
