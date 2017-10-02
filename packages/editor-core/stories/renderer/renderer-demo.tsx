import * as React from 'react';
import { PureComponent } from 'react';
import { action } from '@kadira/storybook';
import { profilecard as profilecardUtils } from '@atlaskit/util-data-test';
import { storyData as emojiStoryData } from '@atlaskit/emoji/dist/es5/support';
import { CardEvent } from '@atlaskit/media-card';
import { CardSurroundings } from '../../src/ui/Renderer';

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
} from '@atlaskit/profilecard';

import {
  renderDocument,
  TextSerializer,
} from '../../src/renderer';

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
    onClick: action('onMentionClick'),
    onMouseEnter: action('onMentionMouseEnter'),
    onMouseLeave: action('onMentionMouseLeave'),
  },
  media: {
    onClick: (result: CardEvent, surroundings?: CardSurroundings) => {
      // json-safe-stringify does not handle cyclic references in the react mouse click event
      return action('onMediaClick')('[react.MouseEvent]', result.mediaItemDetails, surroundings);
    }
  },
  actionTarget: {
    onClick: (action) => action('onClick', action)
  },
  applicationCard: {
    onClick: action('onClick'),
    onActionClick: action('onActionClick'),
  },
};

interface DemoRendererProps {
  withPortal?: boolean;
  withProviders?: boolean;
  serializer: 'react' | 'text';
}

interface DemoRendererState {
  input: string;
  portal?: HTMLElement;
}

export default class RendererDemo extends PureComponent<DemoRendererProps, DemoRendererState> {
  textSerializer = new TextSerializer();
  state: DemoRendererState = { input: JSON.stringify(document, null, 2), portal: undefined };
  refs: { input: HTMLTextAreaElement };

  private handlePortalRef = (portal?: HTMLElement) => {
    this.setState({ portal });
  }

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
        {this.renderRenderer()}
        {this.renderTextOutput()}
      </div>
    );
  }

  private renderRenderer() {
    if (this.props.serializer !== 'react') {
      return null;
    }

    try {
      const props: RendererProps = {
        document: JSON.parse(this.state.input)
      };

      if (this.props.withProviders) {
        props.eventHandlers = eventHandlers;
        props.dataProviders = providerFactory;
      }

      if (this.props.withPortal) {
        props.portal = this.state.portal;
      }

      return (
        <div>
          <div style={{color: '#ccc', marginBottom: '8px'}}>&lt;Renderer&gt;</div>
          <Renderer {...props}/>
          <div style={{color: '#ccc', marginTop: '8px'}}>&lt;/Renderer&gt;</div>
          <div ref={this.handlePortalRef}/>
        </div>
      );
    } catch (ex) {
      return (
        <pre>Invalid document: {ex.stack}</pre>
      );
    }
  }

  private renderTextOutput() {
    if (this.props.serializer !== 'text') {
      return null;
    }

    try {
      const doc = JSON.parse(this.state.input);

      return (
        <div>
          <h1>Text output</h1>
          <pre>{renderDocument(doc, this.textSerializer).result}</pre>
        </div>
      );
    } catch (ex) {
      return null;
    }
  }

  private onDocumentChange = () => this.setState({ input: this.refs.input.value });
}
