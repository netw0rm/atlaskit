import { storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { PureComponent } from 'react';
import { storyData as emojiStoryData } from '@atlaskit/emoji/dist/es5/support';

import Editor from './editor';
import { JSONSerializer } from '../src/renderer';
import ProviderFactory from '../src/providerFactory';
import { name } from '../package.json';

const providerFactory = new ProviderFactory();
providerFactory.setProvider('emojiProvider', emojiStoryData.getEmojiResource());

class DACEditor extends PureComponent<{}, {}> {
  private serializer = new JSONSerializer();

  onChange = (editor: Editor) => {
    if (!editor.doc) {
      return;
    }

    const json = this.serializer.serializeFragment(editor.doc.content);
    window.parent.postMessage({ doc: json, editor: true }, '*');
  }

  render() {
    const emojiProvider = emojiStoryData.getEmojiResource();

    return (
      <Editor
        height={200}
        isExpandedByDefault={true}
        onChange={this.onChange}
        emojiProvider={emojiProvider}
      />
    );
  }
}

storiesOf(name, module)
  .add('DAC editor example (do not remove)', () => <DACEditor/>);
