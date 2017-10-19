/*
 *
 *
 * PLEASE DO NOT REMOVE THIS STORY
 * IT'S USED FOR developer.atlassian.com documentation playground
 *
 *
 * */
import { storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { PureComponent } from 'react';
import { storyData as emojiStoryData } from '@atlaskit/emoji/dist/es5/support';

import Editor from './editor';
import { createSchema } from '@atlaskit/editor-common';
import { JSONSerializer } from '../src/renderer';
import ProviderFactory from '../src/providerFactory';
import { name } from '../package.json';

const providerFactory = new ProviderFactory();
providerFactory.setProvider('emojiProvider', emojiStoryData.getEmojiResource());

const schema = createSchema({
  nodes: [
    'doc',
    'paragraph',
    'text',
    'bulletList',
    'orderedList',
    'listItem',
    'heading',
    'blockquote',
    'codeBlock',
    'panel',
    'rule',
    'hardBreak',
    'emoji',
  ],
  marks: [
    'em',
    'strong',
    'code',
    'strike',
    'underline',
    'link',
    'emojiQuery',
    'subsup',
  ]
});

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
        schema={schema}
        height={200}
        isExpandedByDefault={true}
        onChange={this.onChange}
        emojiProvider={emojiProvider}
      />
    );
  }
}

storiesOf(name, module)
  .add('DAC editor example', () => <DACEditor/>);
