import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme from '@atlaskit/util-readme';

import { name, description } from '../package.json';

/* eslint-disable import/no-duplicates, import/first */
import defaultComponent from '../src';
import defaultComponentSource from '!raw!../src';
import defaultOverview from './examples/default-example';
import defaultOverviewSource from '!raw!./examples/default-example';

import fieldBaseComponent from '../src/FieldBase';
import fieldBaseComponentSource from '!raw!../src/FieldBase';
import fieldBaseOverview from './examples/field-base-example';
import fieldBaseOverviewSource from '!raw!./examples/field-base-example';

import labelComponent from '../src/Label';
import labelComponentSource from '!raw!../src/Label';
import labelOverview from './examples/label-example';
import labelOverviewSource from '!raw!./examples/label-example';
/* eslint-enable import/no-duplicates, import/first */

storiesOf(name, module)
  .add('📖 AkFieldBase readme', () => (
    <Readme
      name={name}
      component={defaultComponent}
      componentSource={defaultComponentSource}
      example={defaultOverview}
      exampleSource={defaultOverviewSource}
      description={description}
    />
  ))
  .add('📖 FieldBase readme', () => (
    <Readme
      name={name}
      component={fieldBaseComponent}
      componentSource={fieldBaseComponentSource}
      example={fieldBaseOverview}
      exampleSource={fieldBaseOverviewSource}
      description={description}
    />
  ))
  .add('📖 Label readme', () => (
    <Readme
      name={name}
      component={labelComponent}
      componentSource={labelComponentSource}
      example={labelOverview}
      exampleSource={labelOverviewSource}
      description={description}
    />
  ));
