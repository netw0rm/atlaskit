import { storiesOf } from '@kadira/storybook';
import * as React from 'react';

import { name, version } from '../package.json';
import * as v1schema from '../dist/json-schema/v1/full.json';
import { storyDecorator } from '../src/test-helper';

const jsonPretty = (obj: any) => JSON.stringify(obj, null, 2);

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
  .add('v1 JSON Schema', () => (
    <pre><code className="json">{jsonPretty(v1schema)}</code></pre>
  ));
