import { storiesOf } from '@kadira/storybook';

import * as React from 'react';
import { name, version } from '../../package.json';
import { storyDecorator } from '../../src/test-helper';

import {
  Mention,
} from '../../src/renderer/react/nodes';

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
  .add('nodes/mention', () => (
    <Mention id="abcd-abcd-abcd" text="@Oscar Wallhult"/>
  ))
;
