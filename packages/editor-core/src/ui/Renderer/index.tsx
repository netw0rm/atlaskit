export { EmojiProvider, EmojiResource } from '@atlaskit/emoji';
export { MediaProvider } from '@atlaskit/media-core';
export { MentionProvider, MentionResource } from '@atlaskit/mention';

import { EmojiProvider } from '@atlaskit/emoji';
import { MediaProvider, CardEventHandler } from '@atlaskit/media-core';
import { MentionProvider } from '@atlaskit/mention';
import { PureComponent, SyntheticEvent } from 'react';

import { Schema } from '../../prosemirror';
import ProviderFactory from '../../providerFactory';
import {
  ReactSerializer,
  renderDocument,
} from '../../renderer';
import { defaultSchema } from '../../schema';

export type MentionEventHandler = (mentionId: string, text: string, event?: SyntheticEvent<HTMLSpanElement>) => void;

export interface MentionEventHandlers {
  onClick?: MentionEventHandler;
  onMouseEnter?: MentionEventHandler;
  onMouseLeave?: MentionEventHandler;
}

export interface EventHandlers {
  mention?: MentionEventHandlers;
  media?: {
    onClick?: CardEventHandler;
  };
}

export interface Props {
  document?: any;
  emojiProvider?: Promise<EmojiProvider>;
  eventHandlers?: EventHandlers;
  mediaProvider?: Promise<MediaProvider>;
  mentionProvider?: Promise<MentionProvider>;
  schema?: Schema<any, any>;
}

export default class Renderer extends PureComponent<Props, {}> {
  private providerFactory: ProviderFactory;

  constructor(props: Props) {
    super(props);

    const {
      emojiProvider,
      mediaProvider,
      mentionProvider,
    } = props;

    this.providerFactory = new ProviderFactory();
    this.providerFactory.setProvider('emojiProvider', emojiProvider);
    this.providerFactory.setProvider('mediaProvider', mediaProvider);
    this.providerFactory.setProvider('mentionProvider', mentionProvider);
  }

  render() {
    const {
      document,
      eventHandlers,
      schema,
    } = this.props;

    const serializer = new ReactSerializer(this.providerFactory, eventHandlers);
    return renderDocument(document, serializer, schema || defaultSchema);
  }

  componentWillUnmount() {
    this.providerFactory.destroy();
  }
}
