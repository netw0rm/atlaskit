import { storiesOf } from '@kadira/storybook';
import * as React from 'react';
import Editor from './editor';

storiesOf('ak-editor-core', module)
  .add('Example editor', () => (
    <div style={{ padding: 20 }}>
      <Editor
        onChange={this.fetchEditorState}
        ref="editor"
        isExpandedByDefault
      />
    </div>
  ));
