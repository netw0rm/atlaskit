import { storiesOf } from '@kadira/storybook';
import makeJsonSchema from '../src/schema/json-schema';
import schema from '../src/schema';
import { PureComponent } from 'react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ProseMirror, OrderedMap } from '../src/prosemirror';
import { highlightBlock } from 'highlight.js';
import reactify from 'akutil-react';
import Editor from './editor';
import Ajv from 'ajv';
import Thenable from 'thenable';

// import 'style!css!highlight.js/styles/tomorrow.css';
import TabsComponent, { Tab as TabComponent } from 'ak-tabs';

const Tabs = reactify(TabsComponent);
const Tab = reactify(TabComponent);
const jsonSchema = makeJsonSchema(schema);
const ajv = new Ajv();
const validate = ajv.compile(jsonSchema);

function toJS(map: OrderedMap, transform: (value: any) => any) {
  const result: any = {};
  map.forEach((key, value) => result[key] = transform(value));
  return result;
}

const jsonPretty = (obj: any) => JSON.stringify(obj, null, 2);

storiesOf('ak-editor-core', module)
  .add('JSON Schema', () => {
    interface State {
      docJson?: any;
      isValid: boolean | Thenable<boolean>;
    }

    class Story extends React.PureComponent<{}, State> {
      state: State = { isValid: true };
      container?: HTMLDivElement;
      editor?: Element;

      componentDidMount() {
        const { container } = this.refs;
        if (container instanceof HTMLElement) {
          for (const code of container.querySelectorAll('code')) {
            highlightBlock(code);
          }
        }
        this.fetchEditorState();
      }

      render() {
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }} ref='container'>
            <Editor
              onChange={this.fetchEditorState}
              ref='editor'
              isExpandedByDefault />

            <Tabs style={{ backgroundColor: 'white' }}>
              <Tab label="ProseMirror schema">
                <pre><code className='json'>{jsonPretty({
                  nodes: toJS(schema.nodeSpec, val => ({
                    content: val.content,
                    type: val.type.name,
                    group: val.group,
                  })),
                  marks: toJS(schema.markSpec, val => val.name),
                })}</code></pre>
              </Tab>
              <Tab label="JSON Schema">
                <pre><code className='json'>{jsonPretty(jsonSchema)}</code></pre>
              </Tab>
              <Tab label="JSON" selected>
                {this.state.docJson === null ? null :
                  <pre><code className='json'>{jsonPretty(this.state.docJson)}</code></pre>
                }
                {this.state.isValid ? null :
                  <fieldset>
                    <legend>Validation errors</legend>
                    <pre>{jsonPretty(validate.errors)}</pre>
                  </fieldset>
                }
              </Tab>
            </Tabs>
          </div>
        );
      }

      private fetchEditorState = () => {
        const { editor } = this.refs;
        if (editor instanceof Editor) {
          const { doc } = editor;
          if (doc) {
            const docJson = doc.toJSON();
            this.setState({
              docJson,
              isValid: validate(docJson),
            });
          }
        }
      }
    }

    return (
      <div style={{ padding: 20 }}>
        <Story />
      </div>
    );
  });
