import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import Thenable from 'thenable';
import * as ajvModule from 'ajv';
import Editor from './editor';
import * as styles from './styles';
import { base64fileconverter } from '../src/test-helper';
import { highlightBlock } from 'highlight.js';
import { OrderedMap } from '../src/prosemirror';
import makeJsonSchema from '../src/schema/json-schema';
import schema from './schema/schema';
import { name } from '../package.json';

const { Converter, dropHandler, pasteHandler } = base64fileconverter;
const CANCEL_ACTION = () => action('Cancel')();
const SAVE_ACTION = () => action('Save')();
const converter = new Converter(['jpg', 'jpeg', 'png', 'gif', 'svg'], 10000000);

const imageUploadHandler = (e: any, fn: any) => {
  if (e instanceof ClipboardEvent) {
    pasteHandler(converter, e, fn);
  } else if (e instanceof DragEvent) {
    dropHandler(converter, e, fn);
  } else {
    // we cannot trigger a real file viewer from here
    // so we just simulate a succesful image upload and insert an image
    fn({
      src: 'https://design.atlassian.com/images/brand/logo-21.png'
    });
  }
};

// tslint:disable-next-line:variable-name
const Ajv = ((ajvModule as any).default || ajvModule);
const ajv = new Ajv();
const jsonSchema = makeJsonSchema(schema);
const validate = ajv.compile(jsonSchema);

function toJS(map: OrderedMap<any>, transform: (value: { [key: string]: any }) => any) {
  const result: any = {};
  map.forEach((key, value) => {
    value['name'] = key;
    return result[key] = transform(value);
  });
  return result;
}

const jsonPretty = (obj: any) => JSON.stringify(obj, null, 2);

storiesOf(name, module)
  .add('Example editor', () => (
    <div className={styles.content} >
      <Editor
        imageUploadHandler={imageUploadHandler}
        onCancel={CANCEL_ACTION}
        onSave={SAVE_ACTION}
        onChange={this.fetchEditorState}
        isExpandedByDefault
      />
    </div>
  ))
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
            <fieldset>
              <legend>ProseMirror schema</legend>
              <pre><code className="json">{jsonPretty({
                nodes: toJS(schema.nodeSpec, val => ({
                  name: val.name,
                  content: val.content,
                  defining: val.defining,
                  group: val.group,
                })),
                marks: toJS(schema.markSpec, val => (
                  {
                    name: val.name,
                    excludes: val.excludes
                  })),
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
  });
