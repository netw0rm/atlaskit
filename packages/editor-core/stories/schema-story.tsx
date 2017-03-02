/*import { storiesOf } from '@kadira/storybook';
import * as ajvModule from 'ajv';
import { highlightBlock } from 'highlight.js';
import * as React from 'react';
import Thenable from 'thenable';
import { OrderedMap } from '../src/prosemirror';
import makeJsonSchema from '../src/schema/json-schema';
import { schema } from '../test-helper/schema';
import Editor from './editor';
import { name } from '../package.json';

// import 'style!css!highlight.js/styles/tomorrow.css';

const jsonSchema = makeJsonSchema(schema);
// tslint:disable-next-line:variable-name
const Ajv = ((ajvModule as any).default || ajvModule);
const ajv = new Ajv();
const validate = ajv.compile(jsonSchema);

function toJS(map: OrderedMap<any>, transform: (value: any) => any) {
  const result: any = {};
  map.forEach((key, value) => result[key] = transform(value));
  return result;
}

const jsonPretty = (obj: any) => JSON.stringify(obj, null, 2);

storiesOf(name, module)
  .add('JSON Schema', () => {
    interface State {
      docJson?: any;
      isValid: boolean | Thenable<boolean>;
    }

    class Story extends React.PureComponent<{}, State> {
      state: State = {
        isValid: true
      };

      container?: HTMLDivElement;
      editor?: Element;

      componentDidMount() {
        const { container } = this.refs;
        if (container instanceof HTMLElement) {
          const codes = container.querySelectorAll('code');
          for (let i = 0; i < codes.length; i++) {
            highlightBlock(codes[i]);
          }
        }

        this.fetchEditorState();
      }

      render() {
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }} ref="container">
            <Editor
              onChange={this.fetchEditorState}
              ref="editor"
              isExpandedByDefault
            />
            <fieldset>
              <legend>ProseMirror schema</legend>
              <pre><code className="json">{jsonPretty({
                nodes: toJS(schema.nodeSpec, val => ({
                  content: val.content,
                  type: val.type.name,
                  group: val.group,
                })),
                marks: toJS(schema.markSpec, val => val.name),
              })}</code></pre>
            </fieldset>

            <fieldset>
              <legend>JSON Schema</legend>
              <pre><code className="json">{jsonPretty(jsonSchema)}</code></pre>
            </fieldset>

            <fieldset>
              <legend>JSON</legend>
              {this.state.docJson === null ? null :
                <pre><code className="json">{jsonPretty(this.state.docJson)}</code></pre>
              }
              {this.state.isValid ? null :
                <fieldset>
                  <legend>Validation errors</legend>
                  <pre>{jsonPretty(validate.errors)}</pre>
                </fieldset>
              }
            </fieldset>
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
              ...this.state,
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
  });*/
