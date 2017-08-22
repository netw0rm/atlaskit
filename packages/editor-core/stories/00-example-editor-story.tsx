import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';

import Editor from './editor';
import ToolsDrawer from './ToolsDrawer';
import { name, version } from '../package.json';
import { storyDecorator } from '../src/test-helper';

const CANCEL_ACTION = () => action('Cancel')();
const SAVE_ACTION = () => action('Save')();

const analyticsHandler = (actionName, props) => action(actionName)(props);

class DemoEditor extends React.PureComponent<any, any> {
  private editorRef: Editor;

  private onChange = () => {
    const editor = this.editorRef;

    if (editor && editor.doc && this.props.onChange) {
      this.props.onChange(editor.state.editorView);
    }
  }

  private handleEditorRef = (ref) => {
    this.editorRef = ref;
  }

  render() {
    const {mediaProvider, mentionProvider, emojiProvider, activityProvider} = this.props;
    return (
      <Editor
        analyticsHandler={analyticsHandler}
        onCancel={CANCEL_ACTION}
        onSave={SAVE_ACTION}
        onChange={this.onChange}
        mediaProvider={mediaProvider}
        mentionProvider={mentionProvider}
        emojiProvider={emojiProvider}
        activityProvider={activityProvider}
        isExpandedByDefault={true}
        ref={this.handleEditorRef}
        devTools={true}
      />
    );
  }
}

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
  .add('Example editor', () => (
    <ToolsDrawer
      // tslint:disable-next-line:jsx-no-lambda
      renderEditor={({mediaProvider, mentionProvider, emojiProvider, activityProvider, onChange}) =>
        <DemoEditor
          onChange={onChange}
          mediaProvider={mediaProvider}
          mentionProvider={mentionProvider}
          emojiProvider={emojiProvider}
          activityProvider={activityProvider}
        />}
    />
  ))
;
