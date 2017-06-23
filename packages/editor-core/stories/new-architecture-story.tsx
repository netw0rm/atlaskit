import { storiesOf } from '@kadira/storybook';
import * as React from 'react';

import { emoji as emojiData, mention as mentionData } from '@atlaskit/util-data-test';

import Editor from './../src/editor';
import { Content } from './styles';
import { name } from '../package.json';
import { toJSON } from '../src/utils';

const emojiProvider1 = emojiData.emojiStoryData.getEmojiResource();

const mentionProvider1 = new Promise<any>(resolve => {
  resolve(mentionData.mentionStoryData.resourceProvider);
});

const mentionProvider2 = new Promise<any>(resolve => {
  resolve(mentionData.mentionStoryData.resourceProvider2);
});

class DemoEditor extends React.PureComponent<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      mentionProvider: mentionProvider1,
      jsonDocument: '{}'
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

  private extractDocument = editorView => {
    this.setState({
      jsonDocument: JSON.stringify(toJSON(editorView.state.doc), null, 2)
    });
  }

  render() {
    const { mentionProvider, jsonDocument } = this.state;
    return (
      <Content>
        <Editor
          appearance="tray"
          mentionProvider={mentionProvider}
          emojiProvider={emojiProvider1}
          allowTextFormatting={true}
          onChange={this.extractDocument}
        />
        <div>
          <br />
          <button onClick={this.toggleProvider}>Toggle mention provider</button>
          {`Provider: ${mentionProvider === mentionProvider1 ? '1' : '2'}`}
        </div>
        <details>
          <summary>JSON Document</summary>
          <pre>{jsonDocument}</pre>
        </details>
      </Content>
    );
  }
}

storiesOf(name, module).add('Tray Editor', () => <DemoEditor />);
