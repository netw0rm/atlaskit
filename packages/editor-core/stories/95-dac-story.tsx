import { storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { ChangeEvent, PureComponent } from 'react';
import { storyData as emojiStoryData } from '@atlaskit/emoji/dist/es5/support';

import Editor from './editor';
import { JSONSerializer } from '../src/renderer';
import ProviderFactory from '../src/providerFactory';
import { name } from '../package.json';
import { document as simpleDoc } from './story-data-dac';

import {
  default as Renderer,
  Props as RendererProps,
} from '../src/ui/Renderer';

export interface DACRendererState {
  input?: string;
}

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

class DACRenderer extends PureComponent<{}, DACRendererState> {
  state: DACRendererState = { input: JSON.stringify(simpleDoc, null, 2) };

  private onDocumentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      input: evt.target.value
    });
  }

  get renderer() {
    const { input } = this.state;

    if (!input) {
      return null;
    }

    try {
      const props: RendererProps = {
        document: JSON.parse(input),
        dataProviders: providerFactory,
      };

      return (
        <Renderer {...props}/>
      );
    } catch (ex) {
      return (
        <div>Invalid document: {ex.message}</div>
      );
    }
  }

  render() {
    return (
      <div>
        <textarea
          style={{
            boxSizing: 'border-box',
            border: '1px solid lightgray',
            fontFamily: 'monospace',
            fontSize: 16,
            padding: 10,
            width: '100%',
            height: 320
          }}
          onChange={this.onDocumentChange}
          value={this.state.input}
        />
        {this.renderer}
      </div>
    );
  }
}

storiesOf(name, module)
  .add('DAC editor example (do not remove)', () => <DACEditor/>)
  .add('DAC renderer example (do not remove)', () => <DACRenderer/>);
