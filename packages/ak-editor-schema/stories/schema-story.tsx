import '../types';
import { storiesOf } from '@kadira/storybook';
import makeJsonSchema from '../src/json-schema';
import schema from '../src';
import React from 'react';
import * as ReactDOM from 'react-dom';
import { OrderedMap } from 'ak-editor-prosemirror';
import { highlightBlock } from 'highlight.js';
import { ProseMirror } from 'ak-editor-prosemirror';
import reactify from 'akutil-react';
import AkEditorBitbucketComponent from 'ak-editor-bitbucket';
import Ajv from 'ajv';
import 'style!css!highlight.js/styles/tomorrow.css';
import TabsComponent, { Tab as TabComponent } from 'ak-tabs';

const AkEditorBitbucket = reactify(AkEditorBitbucketComponent);
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

storiesOf('ak-editor-schema', module)
  .add('JSON Schema', () => {
    interface State {
      editorState: any;
      isValid: boolean;
    }

    class Story extends React.Component<{}, State> {
      container?: HTMLDivElement;
      editor?: Element;

      constructor() {
        super();
        this.state = {
          editorState: null,
          isValid: true
        };
        this.onEditorChange = this.onEditorChange.bind(this);
      }

      componentDidMount() {
        if (this.container) {
          const container = this.container;
          for (const code of container.querySelectorAll('code')) {
            highlightBlock(code);
          }
        }
        if (this.editor) {
          this.fetchEditorState(this.editor);
        }
      }

      onEditorChange(e: Event) {
        const editor = e.target;
        this.fetchEditorState(editor);
      }

      fetchEditorState(editor: any) {
        const pm = editor._pm as ProseMirror | undefined;
        if (pm) {
          const editorState = pm.doc.toJSON();
          this.setState({
            editorState: editorState,
            isValid: validate(editorState),
          });
        }
      }

      render() {
        return (
          <div
            style={{ display: 'flex', flexDirection: 'column' }}
            ref={(elem: any) => { this.container = elem; }}
          >

            <AkEditorBitbucket
              onChange={this.onEditorChange}
              ref={(c: any) => { this.editor = ReactDOM.findDOMNode(c); }}
              expanded />

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
                {this.state.editorState === null ? null :
                  <pre><code className='json'>{jsonPretty(this.state.editorState)}</code></pre>
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
    }

    return <Story />
  });
