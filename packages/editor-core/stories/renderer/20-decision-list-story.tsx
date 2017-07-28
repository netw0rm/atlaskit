import { storiesOf } from '@kadira/storybook';

import * as React from 'react';
import { name, version } from '../../package.json';
import { storyDecorator } from '../../src/test-helper';

import {
  DecisionItem,
  DecisionList,
} from '../../src/renderer/react/nodes';

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
  .add('nodes/decisionList', () => (
    <DecisionList>
      <DecisionItem>
        Hello <b>world</b>.
      </DecisionItem>
      <DecisionItem>
        This is another decision.
      </DecisionItem>
    </DecisionList>
  ))
;
