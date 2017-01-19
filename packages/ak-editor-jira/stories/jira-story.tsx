import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { PureComponent } from 'react';
import Editor from '../src';

const CANCEL_ACTION = () => action('Cancel')();
const SAVE_ACTION = () => action('Save')();

storiesOf('ak-editor-jira', module)
  .add('Empty', () =>
    <div style={{ padding: 20 }}>
      <Editor
        onCancel={CANCEL_ACTION}
        onSave={SAVE_ACTION}
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
              onCancel={CANCEL_ACTION}
              onChange={this.updateHTML}
              onSave={SAVE_ACTION}
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
  });
