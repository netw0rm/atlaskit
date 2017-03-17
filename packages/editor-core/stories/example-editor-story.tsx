import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import Editor from './editor';
import * as styles from './styles';
import { base64fileconverter } from '../src/test-helper';

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

storiesOf('ak-editor-core', module)
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
  ));
