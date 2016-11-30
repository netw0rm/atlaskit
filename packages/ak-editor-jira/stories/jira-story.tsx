import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import AkTabs from 'ak-tabs';
import { Tab as AkTab} from 'ak-tabs';
import Editor from '../src';

const Tabs = reactify(AkTabs);
const Tab = reactify(AkTab);
const CancelAction = () => action('Cancel')();
const SaveAction = () => action('Save')();

declare var module: any;

storiesOf('ak-editor-jira', module)
  .add('Empty', () =>
    <div style={{ padding: 20 }}>
      <Editor
        onCancel={CancelAction}
        onSave={SaveAction}
      />
    </div>
  )
  .add('HTML preview', () => {
    type Props = {};
    type State = { html?: string };
    class Demo extends PureComponent<Props, State> {
      state = {} as State;

      render() {
        return (
          <div>
            <Editor
              onCancel={CancelAction}
              onChange={this.updateHTML}
              onSave={SaveAction}
            />
            <fieldset style={{ marginTop: 20 }}>
              <legend>HTML</legend>
              <pre>{this.state.html}</pre>
            </fieldset>
          </div>
        );
      }

      updateHTML = (editor: Editor) => {
        this.setState({ html: editor.value });
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
          <div ref="root">
            <Tabs>
              <Tab selected label="(default)">
                <Editor
                  onCancel={CancelAction}
                  onSave={SaveAction}
                />
              </Tab>
              <Tab selected label="comment">
                <Editor
                  context="comment"
                  onCancel={CancelAction}
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
