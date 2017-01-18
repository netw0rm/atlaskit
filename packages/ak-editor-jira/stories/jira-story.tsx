import { storiesOf, action } from '@kadira/storybook';
import * as React from 'react';
import { PureComponent } from 'react';
import Editor from '../src';

const CancelAction = () => action('Cancel')();
const SaveAction = () => action('Save')();

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
  });
