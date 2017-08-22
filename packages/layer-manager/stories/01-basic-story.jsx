import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { name } from '../package.json';

import WithLayerManager from './examples/with-layer-manager';
import WithoutLayerManager from './examples/without-layer-manager';

storiesOf(name, module)
  .add('With a LayerManager', () => <WithLayerManager />)
  .add('Without a LayerManager', () => <WithoutLayerManager />)
;
