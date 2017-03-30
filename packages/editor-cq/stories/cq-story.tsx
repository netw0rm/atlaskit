import '!style!css!less!./cq-styles.less';
import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { PureComponent } from 'react';
import Editor from '../src';
import { name, version } from '../package.json';
import { storyDecorator } from '@atlaskit/editor-core/dist/es5/test-helper';

const CANCEL_ACTION = () => action('Cancel')();
const SAVE_ACTION = () => action('Save')();

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
  .add('Empty', () =>
    <Editor
      isExpandedByDefault
      onCancel={CANCEL_ACTION}
      onSave={SAVE_ACTION}
    />
  )
  .add('CXHTML input', () => {
    type Props = {};
    type State = { input: string, output: string };
    class Demo extends PureComponent<Props, State> {
      state = { input: '', output: '' };
      refs: {
        input: HTMLTextAreaElement;
      };

      handleChange = (editor: Editor) => {
        this.setState({ output: editor.value || '' });
      }

      render() {
        return (
          <div ref="root">
            <fieldset style={{ marginTop: 20, marginBottom: 20 }}>
              <legend>Input</legend>
              <textarea
                style={{
                  boxSizing: 'border-box',
                  border: '1px solid lightgray',
                  fontFamily: 'monospace',
                  padding: 10,
                  width: '100%',
                  height: 100
                }}
                ref="input"
              />
              <button onClick={() => this.setState({ input: this.refs.input.value })}>Import</button>
            </fieldset>
            <Editor
              isExpandedByDefault
              onCancel={CANCEL_ACTION}
              onChange={this.handleChange}
              onSave={SAVE_ACTION}
              defaultValue={this.state.input}
              key={this.state.input}
            />
            <fieldset style={{ marginTop: 20 }}>
              <legend>Output</legend>
              <textarea
                style={{
                  boxSizing: 'border-box',
                  border: '1px solid lightgray',
                  fontFamily: 'monospace',
                  padding: 10,
                  width: '100%',
                  height: 100
                }}
                value={this.state.output}
              />
            </fieldset>
          </div>
        );
      }
    }

    return <Demo />;
  })
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
              onCancel={CANCEL_ACTION}
              onChange={this.handleChange}
              onSave={SAVE_ACTION}
            />
            <fieldset style={{ marginTop: 20 }}>
              <legend>CXHTML</legend>
              <pre>{this.state.cxhtml || ''}</pre>
            </fieldset>
          </div>
        );
      }
    }

    return <Demo />;
  });
