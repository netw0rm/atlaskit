import { SyntheticEvent } from 'react';

export interface HighlightDetail {
  start: number;
  end: number;
}

export interface Highlight {
  name: HighlightDetail[];
  mentionName: HighlightDetail[];
  nickname: HighlightDetail[];
}

export interface Presence {
  time?: string;
  status?: string;
}

export interface MentionDescription {
  id: string;
  avatarUrl?: string;
  name?: string;
  mentionName?: string;
  nickname?: string;
  highlight?: Highlight;
  lozenge?: string;
  presence?: Presence;
  accessLevel?: string;
}

export interface OnMentionEvent {
  (mention: MentionDescription, event?: SyntheticEvent<any>): void;
}

enum UserAccessLevel {
    NONE,
    SITE,
    APPLICATION,
    CONTAINER,
}

export function isRestricted(accessLevel) {
  if (accessLevel && accessLevel !== UserAccessLevel[UserAccessLevel.CONTAINER]) {
    return true;
  }
  return false;
}
