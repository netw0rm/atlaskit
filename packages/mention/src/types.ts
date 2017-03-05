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
  selected?: boolean;
  name?: string;
  mentionName?: string;
  status?: string;
  time?: string;
  highlight?: Highlight;
  lozenge?: string;
  presence?: Presence;
}

export interface OnSelection {
  (mention: Mention): void;
}
