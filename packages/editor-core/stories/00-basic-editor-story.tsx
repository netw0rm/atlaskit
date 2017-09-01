import { storiesOf } from '@kadira/storybook';
import * as React from 'react';

import Editor from './../src/editor';
import { name, version } from '../package.json';
import { storyDecorator } from '../src/test-helper';

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
  .add('Basic Editor', () =>
    <div>
      <p>The most basic editor possible. Editor you get by rendering {'<Editor/>'} component with no props.</p>
      <Editor appearance="message" />
    </div>);
