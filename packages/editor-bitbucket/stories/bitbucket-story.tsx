import '!style!css!less!./bitbucket-styles.less';
import { base64fileconverter } from '@atlaskit/editor-core/test-helper';
import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { PureComponent } from 'react';
import Editor from '../src';
import { MockMentionSource } from './_mock-mentionsource';
import exampleHTML from './exampleHTML';

import { name } from '../package.json';

const CANCEL_ACTION = () => action('Cancel')();
const CHANGE_ACTION = () => action('Change')();
const SAVE_ACTION = () => action('Save')();
const { Converter, dropHandler, pasteHandler } = base64fileconverter;
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

const mentionSource = new MockMentionSource();

storiesOf(name, module)
  .add('Empty', () => (
    <div style={{ padding: 20 }}>
      <Editor
        onCancel={CANCEL_ACTION}
        onChange={CHANGE_ACTION}
        onSave={SAVE_ACTION}
      />
    </div>
  ))
  .add('With placeholder', () =>
    <div style={{ padding: 20 }}>
      <Editor
        placeholder="What do you want to say?"
        onCancel={CANCEL_ACTION}
        onChange={CHANGE_ACTION}
        onSave={SAVE_ACTION}
      />
    </div>
  )
  .add('With mentions', () =>
    <div style={{ padding: 20 }}>
      <Editor
        onCancel={CANCEL_ACTION}
        onChange={CHANGE_ACTION}
        onSave={SAVE_ACTION}
        mentionSource={mentionSource}
      />
    </div>
  )
  .add('With imageUploadHandler', () =>
    <div style={{ padding: 20 }}>
      <Editor
        isExpandedByDefault
        imageUploadHandler={imageUploadHandler}
        onCancel={CANCEL_ACTION}
        onChange={CHANGE_ACTION}
        onSave={SAVE_ACTION}
      />
    </div>
  )
  .add('Analytics events', () => {
    return (
      <div style={{ padding: 20 }}>
        <h5 style={{ marginBottom: 20 }}>Interact with the editor and observe analytics events in the Action Logger below</h5>
        <Editor
          placeholder="Click me to expand ..."
          analyticsHandler={(actionName, props) => action(actionName)(props)}
          onSave={() => {}}
          onCancel={() => {}}
          imageUploadHandler={() => {}}
        />
      </div>
    );
  })
  .add('Markdown preview', () => {
    type Props = {};
    type State = { markdown?: string };
    class Demo extends PureComponent<Props, State> {
      state: State = { markdown: '' };

      handleChange = (editor: Editor) => {
        this.setState({ markdown: editor.value });
      }

      render() {
        return (
          <div ref="root">
            <Editor
              onCancel={CANCEL_ACTION}
              onChange={this.handleChange}
              onSave={SAVE_ACTION}
              mentionSource={mentionSource}
            />
            <fieldset style={{ marginTop: 20 }}>
              <legend>Markdown</legend>
              <pre>{this.state.markdown}</pre>
            </fieldset>
          </div>
        );
      }
    }

    return (
      <div style={{ padding: 20 }}>
        <Demo />
      </div>
    );
  })
  .add('Set from HTML', () => {
    type Props = {};
    type State = { hasError?: boolean };
    class Demo extends PureComponent<Props, State> {
      state: State = { hasError: false };
      textarea?: HTMLTextAreaElement;
      editor?: Editor;

      setEditorContentFromHtml = () => {
        const { textarea, editor } = this;

        if (!textarea || !editor) {
          return;
        }

        this.setState({ hasError: false });

        try {
          editor.setFromHtml(textarea.value);
        } catch (e) {
          this.setState({ hasError: true });
          console.error('Error when setting from HTML', e);
        }
      }

      handleTextareaRef = (ref: HTMLTextAreaElement | null) => {
        if (!ref) {
          this.textarea = undefined;
          return;
        }
        this.textarea = ref;
        ref.value = exampleHTML;
        this.setEditorContentFromHtml();
      }

      handleEditorRef = (ref: Editor | null) => {
        if (!ref) {
          this.editor = undefined;
          return;
        }

        this.editor = ref;

        // TODO: we don't currently have a good method of knowing that the editor can receive content
        setTimeout(() => {
          this.setEditorContentFromHtml();
        }, 500);
      }

      render() {
        return (
          <div ref="root" style={{ display: 'flex', alignItems: 'stretch', minHeight: '100%' }}>
            <div style={{ flex: 3, display: 'flex', alignItems: 'stretch' }}>
              <textarea
                style={{
                  flex: 1,
                  fontFamily: 'monospace',
                  fontSize: '90%',
                  outline: 'none',
                  border: '0 none',
                  padding: '5px 10px',
                  borderRight: '10px solid rgb(247, 247, 247)',
                  background: this.state.hasError ? 'red' : 'white'
                }}
                ref={this.handleTextareaRef}
                onKeyUp={this.setEditorContentFromHtml}
              />
            </div>
            <div style={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'stretch', alignContent: 'stretch' }}>
              <Editor
                ref={this.handleEditorRef}
                isExpandedByDefault
              />
            </div>
          </div>
        );
      }
    }

    return (
      <Demo />
    );
  });
