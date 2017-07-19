import * as React from 'react';
import { PureComponent } from 'react';
import { action } from '@kadira/storybook';
import { emoji as emojiData } from '@atlaskit/util-data-test';
import { StoryBookTokenProvider, defaultClientId, defaultServiceHost } from '@atlaskit/media-test-helpers';
import ProviderFactory from '../src/providerFactory';
import Renderer from '../src/ui/Renderer';
import { document } from './story-data';

const mentionProvider = Promise.resolve({
  shouldHighlightMention(mention) {
    return mention.id === 'ABCDE-ABCDE-ABCDE-ABCDE';
  }
});

const mediaProvider = Promise.resolve({
  viewContext: Promise.resolve({
    clientId: defaultClientId,
    serviceHost: defaultServiceHost,
    tokenProvider: StoryBookTokenProvider.tokenProvider,
  })
});

const emojiProvider = emojiData.emojiStoryData.getEmojiResource();

const providerFactory = new ProviderFactory();
providerFactory.setProvider('mentionProvider', mentionProvider);
providerFactory.setProvider('mediaProvider', mediaProvider);
providerFactory.setProvider('emojiProvider', emojiProvider);

const eventHandlers = {
  mention: {
    onClick: action('onClick'),
    onMouseEnter: action('onMouseEnter'),
    onMouseLeave: action('onMouseLeave'),
  },
  media: {
    onClick: action('onClick'),
  },
};

type DemoRendererProps = { withProviders: boolean; };
type DemoRendererState = { input: string };

export default class RendererDemo extends PureComponent<DemoRendererProps, DemoRendererState> {
  state = { input: JSON.stringify(document, null, 2) };
  refs: { input: HTMLTextAreaElement };

  render() {
    return (
      <div ref="root" style={{ padding: 20 }}>
        <fieldset style={{ marginBottom: 20 }}>
          <legend>Input</legend>
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
            ref="input"
            onChange={this.onDocumentChange}
            value={this.state.input}
          />
        </fieldset>
        {this.renderer}
      </div>
    );
  }

  get renderer() {
    const props: any = {
      document: JSON.parse(this.state.input)
    };

    try {
      if (this.props.withProviders) {
        props.eventHandlers = eventHandlers;
        props.dataProviders = providerFactory;
      }

      return (
        <Renderer {...props}/>
      );
    } catch (ex) {
      return (
        <div>Invalid document: {ex.message}</div>
      );
    }
  }

  private onDocumentChange = () => this.setState({ input: this.refs.input.value });
}
