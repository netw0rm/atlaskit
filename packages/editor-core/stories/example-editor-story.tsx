import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import Editor from './editor';
import * as styles from './styles';
import { name } from '../package.json';
import * as v1schema from '../src/json-schema/v1.json';
import imageUploadHandler from '../stories/imageUpload/handler';
import { resourceProvider, resourceProvider2 } from './mentions/story-data';

const CANCEL_ACTION = () => action('Cancel')();
const SAVE_ACTION = () => action('Save')();

const jsonPretty = (obj: any) => JSON.stringify(obj, null, 2);
const analyticsHandler = (actionName, props) => action(actionName)(props);
const mentionProvider = new Promise<any>(resolve => {
  resolve(resourceProvider);
});

const mentionProvider2 = new Promise<any>(resolve => {
  resolve(resourceProvider2);
});
class DemoEditor extends React.PureComponent<{ onChange }, { provider: Promise<any> }> {
  constructor(props) {
    super(props);

    this.state = {
      provider: mentionProvider
    };
  }

  private toggleProvider = () => {
    const { provider } = this.state;
    if (provider === mentionProvider) {
      this.setState({
        provider: mentionProvider2
      });
    } else {
      this.setState({
        provider: mentionProvider
      });
    }
  }

  render() {
    const { provider } = this.state;
    return (
      <div className={styles.content}>
        <Editor
          imageUploadHandler={imageUploadHandler}
          analyticsHandler={analyticsHandler}
          onCancel={CANCEL_ACTION}
          onSave={SAVE_ACTION}
          onChange={this.props.onChange}
          mentionProvider={provider}
          isExpandedByDefault
        />
        <div>
          <br />
          <button onClick={this.toggleProvider}>Toggle mention provider</button>
          {`Provider: ${provider === mentionProvider ? '1' : '2'}`}
        </div>
      </div>
    );
  }
}

storiesOf(name, module)
  .add('Example editor', () => (
    <div className={styles.content} >
      <DemoEditor
        onChange={this.fetchEditorState}
      />
    </div>
  ))
  .add('v1 JSON Schema', () => (
    <pre><code className="json">{jsonPretty(v1schema)}</code></pre>
  ));
