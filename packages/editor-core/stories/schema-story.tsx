import { storiesOf } from '@kadira/storybook';
import * as React from 'react';
import * as v1schema from '../src/json-schema/v1.json';
import v1SchemaTemplate from './schema/generate-v1-template';
import { name } from '../package.json';

const jsonPretty = (obj: any) => JSON.stringify(obj, null, 2);

storiesOf(name, module)
  .add('v1 JSON Schema', () => (
    <pre><code className="json">{jsonPretty(v1schema)}</code></pre>
  ))
  .add('v1 JSON Schema (template)', () => (
    <pre><code className="json">{jsonPretty(v1SchemaTemplate)}</code></pre>
  ));
