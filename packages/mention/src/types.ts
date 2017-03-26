import { SyntheticEvent } from 'react';

export interface HighlightDetail {
  start: number;
  end: number;
}

export interface Highlight {
  name: HighlightDetail[];
  mentionName: HighlightDetail[];
}

export interface Presence {
  time?: string;
  status?: string;
}

export interface Mention {
  id: string;
  avatarUrl?: string;
  name?: string;
  mentionName?: string;
  highlight?: Highlight;
  lozenge?: string;
  presence?: Presence;
}

export interface OnMentionEvent {
  (mention: Mention, event?: SyntheticEvent<any>): void;
}
