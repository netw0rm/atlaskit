import React, { PureComponent } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';
import { base64fileconverter } from 'ak-editor-test';
import { default as AkTabs, Tab as AkTab} from 'ak-tabs';
import Editor from '../src';
import FacadeInput from '../src/hacks/facade-input';

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
                  defaultExpanded
                  onCancel={CancelAction}
                  onChange={ChangeAction}
                  onSave={SaveAction}
                />
              </Tab>
              <Tab selected label="comment">
                <Editor
                  defaultExpanded
                  context="comment"
                  onCancel={CancelAction}
                  onChange={ChangeAction}
                  onSave={SaveAction}
                />
              </Tab>
              <Tab selected label="pr">
                <Editor
                  defaultExpanded
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
  });
