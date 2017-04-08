import { PureComponent } from 'react';
import { EmojiProvider } from '@atlaskit/emoji';
import { MentionProvider } from '@atlaskit/mention';
import { renderNode } from './nodes';
import { ServicesConfig, MediaProvider, EventHandlers } from './config';

export interface Props {
  document?: any;
  emojiProvider?: Promise<EmojiProvider>;
  mentionProvider?: Promise<MentionProvider>;
  mediaProvider?: Promise<MediaProvider>;
  eventHandlers?: EventHandlers;
}

export interface State {}

export default class Renderer extends PureComponent<Props, State> {
  static defaultProps = {
    document: {},
  };

  render() {
    const { props } = this;
    const { emojiProvider, mentionProvider, mediaProvider, eventHandlers } = props;

    let servicesConfig: ServicesConfig = {};

    if (emojiProvider) {
      servicesConfig.getEmojiProvider = () => emojiProvider;
    }

    if (mentionProvider) {
      servicesConfig.getMentionProvider = () => mentionProvider;
    }

    if (mediaProvider) {
      servicesConfig.getMediaProvider = () => mediaProvider;
    }

    return renderNode(this.props.document, servicesConfig, eventHandlers);
  }
}
