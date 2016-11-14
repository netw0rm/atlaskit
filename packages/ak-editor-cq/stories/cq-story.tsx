import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AkTabs from 'ak-tabs';
import { Tab as AkTab} from 'ak-tabs';
import EditorComponent from '../src';

const Tabs = reactify(AkTabs);
const Tab = reactify(AkTab);
const Editor = reactify(EditorComponent);

storiesOf('ak-editor-cq', module)
  .add('Empty', () => (
    <Editor expanded />
  ))
  .add('CXHTML preview', () => {
    type Props = {};
    type State = { cxhtml: string };
    class Demo extends Component<Props, State> {
      constructor() {
        super();
        this.state = { cxhtml: '' };
        this.updateCxhtml = this.updateCxhtml.bind(this);
      }

      updateCxhtml(e: any) {
        this.setState({ cxhtml: e.target.value });
      }

      render() {
        return (
          <div ref="root">
            <Editor
              expanded
              onChange={this.updateCxhtml}
              onReady={this.updateCxhtml}
              onSave={action('save')}
              onCancel={action('cancel')}
            />
            <fieldset style={{ marginTop: 20 }}>
              <legend>CXHTML</legend>
              <pre>{this.state.cxhtml}</pre>
            </fieldset>
          </div>
        );
      }
    }

    return <Demo />;
  })
  .add('Contexts', () => {
    type Props = {};
    type State = {};
    class Demo extends Component<Props, State> {
      render() {
        return (
          <div ref="root">
            <Tabs>
              <Tab selected label="(default)">
                <Editor expanded />
              </Tab>
              <Tab selected label="(default) no-actions">
                <Editor expanded noActions/>
              </Tab>
              <Tab selected label="comment">
                <Editor expanded context="comment"/>
              </Tab>
            </Tabs>
          </div>
        );
      }
    }

    return <Demo />;
  });
