import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import Editor from './editor';
import * as styles from './styles';
import { base64fileconverter } from '../src/test-helper';
import { name } from '../package.json';
import * as v1schema from '../src/json-schema/v1.json';

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
  .add('v1 JSON Schema', () => (
    <pre><code className="json">{jsonPretty(v1schema)}</code></pre>
  ));
