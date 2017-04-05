import '!style!css!less!./cq-styles.less';
import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { PureComponent } from 'react';
import Editor from '../src';
import { name, version } from '../package.json';
import { storyDecorator, storyMediaProviderFactory } from '@atlaskit/editor-core/dist/es5/test-helper';
import { pd } from 'pretty-data';

const CANCEL_ACTION = () => action('Cancel')();
const SAVE_ACTION = () => action('Save')();
let handleChange: (editor: Editor) => void;

storiesOf(name, module)
  .addDecorator(function (story: Function, context: { kind: string, story: string }) {
    type Props = {};
    type State = { cxhtml?: string, story?: any, prettify?: boolean };
    class Demo extends PureComponent<Props, State> {
      state: State;

      constructor(props: Props) {
        super(props);
        handleChange = this.handleChange;
        this.state = {
          cxhtml: '',
          prettify: true,
          story: story()
        };
      }

      handleChange = (editor: Editor) => {
        this.setState({ cxhtml: editor.value });
      }

      togglePrettify = () => {
        this.setState({ prettify: !this.state.prettify });
      }

      render() {
        const xml = this.state.prettify ? pd.xml(this.state.cxhtml || '') : this.state.cxhtml || '';

        return (
          <div ref="root">
            {this.state.story}
            <fieldset style={{ marginTop: 20 }}>
              <legend>
                CXHTML output
                 (
                  <input type="checkbox" checked={this.state.prettify} onChange={this.togglePrettify}/>
                  <span onClick={this.togglePrettify} style={{ cursor: 'pointer' }}> prettify</span>
                 )
              </legend>
              <pre style={{ whiteSpace:'pre-wrap', wordBreak:'break-all' }}>{xml}</pre>
            </fieldset>
          </div>
        );
      }
    }

    return <Demo/>;
  })
  .addDecorator(storyDecorator(version))
  .add('Default', () =>
    <Editor
      isExpandedByDefault
      onCancel={CANCEL_ACTION}
      onSave={SAVE_ACTION}
      onChange={handleChange}
    />
  )
  .add('With Media support', () =>
    <Editor
      isExpandedByDefault
      mediaProvider={storyMediaProviderFactory()}
      onCancel={CANCEL_ACTION}
      onSave={SAVE_ACTION}
      onChange={handleChange}
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
              onChange={handleChange}
              onSave={SAVE_ACTION}
              defaultValue={this.state.input}
              key="input-editor"
            />
          </div>
        );
      }
    }

    return <Demo />;
  })
;
