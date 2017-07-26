import { storiesOf } from '@kadira/storybook';

import * as React from 'react';
import { name, version } from '../../package.json';
import { storyDecorator } from '../../src/test-helper';

import {
  Panel,
} from '../../src/renderer/react/nodes';

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
  .add('nodes/panel', () => (
    <div>
      <Panel panelType="info">This is a info panel</Panel>
      <Panel panelType="note">This is a note panel</Panel>
      <Panel panelType="tip">This is a tip panel</Panel>
      <Panel panelType="warning">This is a warning panel</Panel>
    </div>
  ))
;
