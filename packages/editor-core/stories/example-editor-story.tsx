import { storiesOf } from '@kadira/storybook';
import * as React from 'react';
import Editor from './editor';
import * as styles from './styles';

storiesOf('ak-editor-core', module)
  .add('Example editor', () => (
    <div className={styles.content} >
      <Editor
        onChange={this.fetchEditorState}
        isExpandedByDefault
      />
      <Editor
        onChange={this.fetchEditorState}
        isExpandedByDefault
      />
    </div>
  ));
