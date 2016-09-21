import './types';
import { storiesOf } from '@kadira/storybook';
import jsonSchema from '../src/json-schema';
import schema from '../src';
import React from 'react';
import { OrderedMap } from 'ak-editor-prosemirror';
import { highlightBlock } from 'highlight.js';
import 'style!css!highlight.js/styles/tomorrow.css';

function toJS(map: OrderedMap, transform: (value: any) => any) {
  const result: any = {};
  map.forEach((key, value) => result[key] = transform(value));
  return result;
}

storiesOf('ak-editor-schema', module)
  .add('JSON schema', () => {
    class Story extends React.Component<{}, {}> {
      componentDidMount() {
        const container = this.refs['container'] as HTMLElement;
        for (const code of container.querySelectorAll('code')) {
          highlightBlock(code);
        }
      }

      render() {
        return (
          <div style={{ display: 'flex' }} ref='container'>
            <fieldset style={{ flex: '1', width: '50%', backgroundColor: 'white' }}>
              <legend>JSON Schema</legend>
              <pre><code className='json'>{JSON.stringify(jsonSchema(schema), null, 2)}</code></pre>
            </fieldset>
            <fieldset style={{ flex: '1', width: '50%', backgroundColor: 'white' }}>
              <legend>ProseMirror Schema</legend>
              <pre><code className='json'>{ JSON.stringify({
                nodes: toJS(schema.nodeSpec, val => ({
                  content: val.content,
                  type: val.type.name,
                  group: val.group,
                })),
                marks: toJS(schema.markSpec, val => val.name),
              }, null, 2)}</code></pre>
            </fieldset>
          </div>
        );
      }
    }

    return <Story />
  });
