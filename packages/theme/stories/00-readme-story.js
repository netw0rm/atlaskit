/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { name } from '../package.json';
import { description } from '../docs/index';
import AtlasKitThemeProviderExample from './examples/ThemeProvider';

storiesOf(name, module)
  .add('📖 Theme readme', () => (
    <div>
      {description}
    </div>
  ))
  .add('Theme provider', () => (
    < AtlasKitThemeProviderExample />
  ))
  ;
