import '!style!css!less!./bitbucket-styles.less';
import { base64fileconverter, storyDecorator } from '@atlaskit/editor-core/src/test-helper';
import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { PureComponent } from 'react';
import { default as Editor, version as editorVersion } from '../src';
import { MockMentionSource } from './_mock-mentionsource';
import exampleHTML from './exampleHTML';

import { name } from '../package.json';

const CANCEL_ACTION = () => action('Cancel')();
const CHANGE_ACTION = () => action('Change')();
const SAVE_ACTION = () => action('Save')();
const { Converter, dropHandler, pasteHandler } = base64fileconverter;
const converter = new Converter(['jpg', 'jpeg', 'png', 'gif', 'svg'], 10000000);

const isClipboardEvent = (e: Event) => {
  return (typeof ClipboardEvent !== 'undefined')
    ? e instanceof ClipboardEvent
    : (e as ClipboardEvent).clipboardData instanceof DataTransfer;
};

const isDragEvent = (e: Event) => {
  return (typeof DragEvent !== 'undefined')
    ? e instanceof DragEvent
    : (e as DragEvent).dataTransfer instanceof DataTransfer;
};

const imageUploadHandler = (e: any, fn: any) => {
  if (isClipboardEvent(e)) {
    pasteHandler(converter, e, fn);
  } else if (isDragEvent(e)) {
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
  .addDecorator(storyDecorator(editorVersion))
  .add('Empty', () => (
    <Editor
      onCancel={CANCEL_ACTION}
      onChange={CHANGE_ACTION}
      onSave={SAVE_ACTION}
    />
  ))
  .add('With placeholder', () =>
    <Editor
      placeholder="What do you want to say?"
      onCancel={CANCEL_ACTION}
      onChange={CHANGE_ACTION}
      onSave={SAVE_ACTION}
    />
  )
  .add('With mentions', () =>
    <Editor
      onCancel={CANCEL_ACTION}
      onChange={CHANGE_ACTION}
      onSave={SAVE_ACTION}
      mentionSource={mentionSource}
    />
  )
  .add('With imageUploadHandler', () =>
    <Editor
      isExpandedByDefault
      imageUploadHandler={imageUploadHandler}
      onCancel={CANCEL_ACTION}
      onChange={CHANGE_ACTION}
      onSave={SAVE_ACTION}
    />
  )
  .add('With attaching/detaching', () => {
    let ref: Node;
    let editor;
    return (
      <div>
        <div id="editor">
          <div ref={(elem) => ref = elem as Node}>
            <Editor
              ref={(e) => editor = e}
              onCancel={() => (ref.parentNode as Node).removeChild(ref)}
              onChange={CHANGE_ACTION}
              onSave={SAVE_ACTION}
              isExpandedByDefault
            />
          </div>
        </div>
        <button
          onClick={() => {
            (document.getElementById('editor') as Node).appendChild(ref);
            editor && editor.clear();
          }}
        >
          Attach
        </button>
      </div>
    );
  })
  .add('Analytics events', () => {
    return (
      <div>
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
      <Demo />
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
  })
  .add('With feedback button', () => {
    class EditorWithFeedback extends PureComponent<{}, { hasJquery?: boolean }> {
      state = {
        hasJquery: false
      };

      componentDidMount() {
        delete window.jQuery;
        this.loadJquery();
      }

      render() {
        if (!this.state.hasJquery) {
          return <h3>Please wait, loading jQuery ...</h3>;
        }

        return (
          <Editor
            onCancel={CANCEL_ACTION}
            onChange={CHANGE_ACTION}
            onSave={SAVE_ACTION}
          />
        );
      }

      private loadJquery = () => {
        const scriptElem = document.createElement('script');
        scriptElem.type = 'text/javascript';
        scriptElem.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js';

        scriptElem.onload = () => {
          this.setState({
            ...this.state,
            hasJquery: true
          });
        };

        document.body.appendChild(scriptElem);
      }
    }

    return <EditorWithFeedback />;
  })
;
