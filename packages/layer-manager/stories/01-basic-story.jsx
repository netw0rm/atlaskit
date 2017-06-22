import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { name } from '../package.json';
// import LayerManager, { Modal } from '../src';

import SingleModal from './examples/single-modal';

const imports = [['React', 'react'], ['LayerManager', '@atlaskit/TEST']];

storiesOf(name, module)
  .addCodeExampleStory('LayerManager', () => (
    <SingleModal />
  ), { imports });
