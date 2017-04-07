import React from 'react';
import Readme, { Description, Code } from '@atlaskit/util-readme';
import { storiesOf } from '@kadira/storybook';

import { name, description } from '../package.json';

storiesOf(name, module)
  .add('Plain SVG example', () => (
    <Readme
      component={name}
      description={description}
    >
      <Description>
        The Logo package also provides plain SVG logo icons.
        You can use these within CSS for background image for example:
        <Code>{`
          import assert from 'assert';
          import { JiraSVGLogo } from '${name}';

          // JiraSVGLogo is a inline SVG string
          assert.strictEqual(typeof JiraSVGLogo, 'string');
        `}</Code>
      </Description>
    </Readme>
  ));
