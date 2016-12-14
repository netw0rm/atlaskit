import { storiesOf, action } from '@kadira/storybook';
import React, { PureComponent } from 'react';
import reactify from 'akutil-react';
import ReactDOM from 'react-dom';
import AkTabs from 'ak-tabs';
import { Tab as AkTab } from 'ak-tabs';
import Editor from '../src';

const Tabs = reactify(AkTabs);
const Tab = reactify(AkTab);
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
                  isExpandedByDefault
                  onCancel={CancelAction}
                  onSave={SaveAction}
                />
              </Tab>
              <Tab selected label="comment">
                <Editor
                  context='comment'
                  isExpandedByDefault
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
