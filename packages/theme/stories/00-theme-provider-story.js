/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { name } from '../package.json';
import AtlasKitThemeProviderExample from '../docs/Example';

storiesOf(name, module)
  .add('Theme provider', () => (
    <AtlasKitThemeProviderExample />
  ))
  ;
