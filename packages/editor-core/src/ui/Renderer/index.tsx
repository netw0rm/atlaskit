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
  render() {
    const {
      document,
      emojiProvider,
      eventHandlers,
      mediaProvider,
      mentionProvider,
      schema,
    } = this.props;

    const providers = new ProviderFactory();
    providers.setProvider('emojiProvider', emojiProvider);
    providers.setProvider('mediaProvider', mediaProvider);
    providers.setProvider('mentionProvider', mentionProvider);

    const serializer = new ReactSerializer(providers, eventHandlers);
    return renderDocument(document, serializer, schema || defaultSchema);
  }
}
