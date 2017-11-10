import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { name, description } from '../package.json';

storiesOf(name, module)
  .add('📖 Readme', () => (
    <div style={{ padding: '20px' }}>
      <h1>@atlaskit/polyfills</h1>
      <p>{description}</p>
      <p>This package provides the following polyfills:</p>
      <h3>Object.assign</h3>
      <pre>{'import \'@atlaskit/polyfills/object-assign\';'}</pre>
      <h3>Array.prototype.includes</h3>
      <pre>{'import \'@atlaskit/polyfills/array-prototype-includes\';'}</pre>
      <h3>String.prototype.includes</h3>
      <pre>{'import \'@atlaskit/polyfills/string-prototype-includes\';'}</pre>
    </div>
  ));
