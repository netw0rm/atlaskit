import React, { PureComponent } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';
import { base64fileconverter } from 'ak-editor-test';
import { default as AkTabs, Tab as AkTab} from 'ak-tabs';
import Editor from '../src';
import FacadeInput from '../src/hacks/facade-input';
import exampleHTML from './exampleHTML';

const Tabs = reactify(AkTabs);
const Tab = reactify(AkTab);
const CancelAction = () => action('Cancel')();
const ChangeAction = () => action('Change')();
const SaveAction = () => action('Save')();
const { Converter, dropHandler, pasteHandler } = base64fileconverter;
const converter = new Converter(['jpg', 'jpeg', 'png', 'gif', 'svg'], 10000000);

const imageUploader = (e: any, fn: any) => {
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

storiesOf('ak-editor-bitbucket', module)
  .add('Empty', () => (
    <div style={{ padding: 20 }}>
      <Editor
        onCancel={CancelAction}
        onChange={ChangeAction}
        onSave={SaveAction}
      />
    </div>
  ))
  .add('With placeholder', () =>
    <div style={{ padding: 20 }}>
      <Editor
        placeholder="What do you want to say?"
        onCancel={CancelAction}
        onChange={ChangeAction}
        onSave={SaveAction}
      />
    </div>
  )
  .add('with imageUploader', () =>
    <div style={{ padding: 20 }}>
      <Editor
        imageUploader={imageUploader}
        onCancel={CancelAction}
        onChange={ChangeAction}
        onSave={SaveAction}
      />
    </div>
  )
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
              onCancel={CancelAction}
              onChange={this.handleChange}
              onSave={SaveAction}
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
  .add('Contexts', () => {
    type Props = {};
    type State = {};
    class Demo extends PureComponent<Props, State> {
      render() {
        return (
          <div>
            <Tabs>
              <Tab selected label="(default)">
                <Editor
                  isExpandedByDefault
                  onCancel={CancelAction}
                  onChange={ChangeAction}
                  onSave={SaveAction}
                />
              </Tab>
              <Tab selected label="comment">
                <Editor
                  isExpandedByDefault
                  context="comment"
                  onCancel={CancelAction}
                  onChange={ChangeAction}
                  onSave={SaveAction}
                />
              </Tab>
              <Tab selected label="pr">
                <Editor
                  isExpandedByDefault
                  context="pr"
                  onCancel={CancelAction}
                  onChange={ChangeAction}
                  onSave={SaveAction}
                />
              </Tab>
            </Tabs>
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
  })
;
