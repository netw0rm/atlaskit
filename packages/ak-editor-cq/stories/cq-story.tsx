import { storiesOf, action } from '@kadira/storybook';
import * as React from 'react';
import { PureComponent } from 'react';
import Editor from '../src';
import '!style!css!less!./cq-styles.less';

const CancelAction = () => action('Cancel')();
const SaveAction = () => action('Save')();

storiesOf('ak-editor-cq', module)
  .add('Empty', () =>
    <div style={{ padding: 20 }}>
      <Editor
        isExpandedByDefault
        onCancel={CancelAction}
        onSave={SaveAction}
      />
    </div>
  )
  .add('CXHTML preview', () => {
    type Props = {};
    type State = { cxhtml?: string };
    class Demo extends PureComponent<Props, State> {
      state = { cxhtml: '' };

      handleChange = (editor: Editor) => {
        this.setState({ cxhtml: editor.value });
      }

      render() {
        return (
          <div ref="root">
            <Editor
              isExpandedByDefault
              onCancel={CancelAction}
              onChange={this.handleChange}
              onSave={SaveAction}
            />
            <fieldset style={{ marginTop: 20 }}>
              <legend>CXHTML</legend>
              <pre>{this.state.cxhtml || ''}</pre>
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
  });
