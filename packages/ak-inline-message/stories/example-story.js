import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import Component from '../src';
import { name } from '../package.json';

storiesOf(name, module)
  .add('simple ak-inline-message', () => (
    <div style={{ padding: 32 }}>
      <Component appearance="subtle" />
      <Component appearance="subtle-link" />
      <p>
        <img
          src="https://extranet.atlassian.com/download/attachments/3053046339/Inline%20-%20auth%20title.png?version=4&modificationDate=1480647793115&api=v2"
          alt="Design spec"
        />
      </p>
    </div>
  ));
