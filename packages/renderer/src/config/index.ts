import { MentionProvider } from '@atlaskit/mention';
import { ContextConfig, CardEventHandler } from '@atlaskit/media-core';
import { SyntheticEvent } from 'react';

export interface MediaProvider {
  viewContext: Promise<ContextConfig>;
};

export interface ServicesConfig {
  getMentionProvider?: () => Promise<MentionProvider>;
  getMediaProvider?: () => Promise<MediaProvider>;
};

export type MentionEventHandler = (mentionId: string, text: string, event?: SyntheticEvent<HTMLSpanElement>) => void;

export interface EventHandlers {
  mention?: {
    onClick?: MentionEventHandler;
    onMouseEnter?: MentionEventHandler;
    onMouseLeave?: MentionEventHandler;
  };
  media?: {
    onClick?: CardEventHandler;
  };
};
