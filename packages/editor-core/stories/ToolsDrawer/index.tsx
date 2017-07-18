import * as React from 'react';
import { emoji as emojiData, mention as mentionData } from '@atlaskit/util-data-test';
import { defaultClientId, defaultServiceHost } from '@atlaskit/media-test-helpers/dist/es5/contextProvider';
import { defaultCollectionName } from '@atlaskit/media-test-helpers/dist/es5/collectionNames';
import { StoryBookTokenProvider } from '@atlaskit/media-test-helpers/dist/es5/tokenProvider';

import { Content } from './../styles';

import { MentionResource } from '../../src';
import { toJSON } from '../../src/utils';
import { storyMediaProviderFactory } from '../../src/test-helper';

const mediaTestHelpers = {
  defaultClientId,
  defaultServiceHost,
  defaultCollectionName,
  StoryBookTokenProvider,
};

const rejectedPromise = Promise.reject(new Error('Simulated provider rejection'));
const pendingPromise = new Promise<any>(() => {});
const providers = {
  mentionProvider: {
    resolved: Promise.resolve(mentionData.mentionStoryData.resourceProvider),
    'resolved 2': Promise.resolve(new MentionResource({
      url: 'https://pf-mentions-service.staging.atlassian.io/mentions/f7ebe2c0-0309-4687-b913-41d422f2110b',
      containerId: 'b0d035bd-9b98-4386-863b-07286c34dc14',
      productId: 'hipchat'
    })),
    pending: pendingPromise,
    rejected: rejectedPromise,
    'undefined' : undefined,
  },
  emojiProvider: {
    resolved: emojiData.emojiStoryData.getEmojiResource(),
    pending: pendingPromise,
    rejected: rejectedPromise,
    'undefined' : undefined,
  },
  mediaProvider: {
    resolved: storyMediaProviderFactory(mediaTestHelpers),
    pending: pendingPromise,
    rejected: rejectedPromise,
    'view only': storyMediaProviderFactory(mediaTestHelpers, undefined, undefined, false),
    'undefined' : undefined,
  },
};
rejectedPromise.catch(() => {});

interface State {
  editorEnabled: boolean;
  mentionProvider: string;
  mediaProvider: string;
  emojiProvider: string;
  jsonDocument?: string;
}

export default class ToolsDrawer extends React.Component<any, State> {
  constructor(props) {
    super(props);

    this.state = {
      editorEnabled: true,
      mentionProvider: 'resolved',
      mediaProvider: 'resolved',
      emojiProvider: 'resolved',
      jsonDocument: '{}',
    };
  }


  private onChange = editorView => {
    this.setState({
      jsonDocument: JSON.stringify(toJSON(editorView.state.doc), null, 2)
    });
  }

  render() {
    const { mentionProvider, emojiProvider, mediaProvider, editorEnabled } = this.state;
    return (
      <Content>
        <div>
          {
            editorEnabled ?
            (this.props.renderEditor({
              mediaProvider: providers.mediaProvider[mediaProvider],
              mentionProvider: providers.mentionProvider[mentionProvider],
              emojiProvider: providers.emojiProvider[emojiProvider],
              onChange: this.onChange
            })) :
            ''
          }
        </div>
      </Content>
    );
  }
}
