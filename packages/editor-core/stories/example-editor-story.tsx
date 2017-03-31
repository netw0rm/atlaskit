import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { MentionProvider } from '@atlaskit/mention';
import { EmojiProvider } from '@atlaskit/emoji';
import { emoji as emojiData } from '@atlaskit/util-data-test';

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
const mentionProvider1 = new Promise<any>(resolve => {
  resolve(resourceProvider);
});

const mentionProvider2 = new Promise<any>(resolve => {
  resolve(resourceProvider2);
});

const emojiProvider1 = emojiData.emojiStoryData.getEmojiResource();

interface Props {
  onChange: any;
}

interface State {
  mentionProvider: Promise<MentionProvider>;
  emojiProvider: Promise<EmojiProvider>;
}

class DemoEditor extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      mentionProvider: mentionProvider1,
      emojiProvider: emojiProvider1,
    };
  }

  private toggleProvider = () => {
    const { mentionProvider } = this.state;
    if (mentionProvider === mentionProvider1) {
      this.setState({
        mentionProvider: mentionProvider2
      });
    } else {
      this.setState({
        mentionProvider: mentionProvider1
      });
    }
  }

  render() {
    const { mentionProvider, emojiProvider } = this.state;
    return (
      <div className={styles.content}>
        <Editor
          imageUploadHandler={imageUploadHandler}
          analyticsHandler={analyticsHandler}
          onCancel={CANCEL_ACTION}
          onSave={SAVE_ACTION}
          onChange={this.props.onChange}
          mentionProvider={mentionProvider}
          emojiProvider={emojiProvider}
          isExpandedByDefault
        />
        <div>
          <br />
          <button onClick={this.toggleProvider}>Toggle mention provider</button>
          {`Provider: ${mentionProvider === mentionProvider1 ? '1' : '2'}`}
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
