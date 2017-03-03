import { MentionProvider } from '@atlaskit/mention';
import { SyntheticEvent } from 'react';

export interface ServicesConfig {
  getMentionProvider?: () => Promise<MentionProvider>;
};

export type MentionEventHandler = (mentionId: string, text: string, event?: SyntheticEvent<HTMLSpanElement>) => void;

export interface EventHandlers {
  mention?: {
    onClick?: MentionEventHandler;
    onMouseEnter?: MentionEventHandler;
    onMouseLeave?: MentionEventHandler;
  };
};
