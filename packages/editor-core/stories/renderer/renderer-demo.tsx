import * as React from 'react';
import { PureComponent } from 'react';
import { action } from '@kadira/storybook';
import { profilecard as profilecardUtils } from '@atlaskit/util-data-test';
import { storyData as emojiStoryData } from '@atlaskit/emoji/src/support';

import {
  StoryBookTokenProvider,
  defaultClientId,
  defaultServiceHost,
} from '@atlaskit/media-test-helpers';

import ProviderFactory from '../../src/providerFactory';
import { document } from '../story-data';
import {
  default as Renderer,
  Props as RendererProps,
} from '../../src/ui/Renderer';

import {
  AkProfileClient,
  modifyResponse,
} from '../../src/utils/profilecard';

const { getMockProfileClient: getMockProfileClientUtil } = profilecardUtils;
// tslint:disable-next-line:variable-name
const MockProfileClient = getMockProfileClientUtil(AkProfileClient, modifyResponse);

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

const emojiProvider = emojiStoryData.getEmojiResource();

const profilecardProvider = Promise.resolve({
  cloudId: 'DUMMY-CLOUDID',
  resourceClient: new MockProfileClient({
    cacheSize: 10,
    cacheMaxAge: 5000,
  }),
  getActions: (id: string) => {
    const actions = [
      {
        label: 'Mention',
        callback: action('profile-card:mention'),
      },
      {
        label: 'Message',
        callback: action('profile-card:message'),
      },
    ];

    return (id === '1') ? actions : actions.slice(0, 1);
  },
});

const providerFactory = new ProviderFactory();
providerFactory.setProvider('mentionProvider', mentionProvider);
providerFactory.setProvider('mediaProvider', mediaProvider);
providerFactory.setProvider('emojiProvider', emojiProvider);
providerFactory.setProvider('profilecardProvider', profilecardProvider);

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
    try {
      const props: RendererProps = {
        document: JSON.parse(this.state.input)
      };

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
