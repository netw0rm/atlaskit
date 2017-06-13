
export interface Details {
  background?: string; // an image URL
  preview?: string; // an image URL
  user?: Icon;
  title: string;
  description?: Description;
  meta?: Metadata[];
  context?: Context;
  actions?: Action[];
  collapsible?: boolean;
}

export interface Description {
  title?: string; // the bolded bit
  text: string;
}

export interface Icon {
  src: string;   // an image URL
  label: string;  // accessibility text e.g. tooltip or voiceover
}

export interface Badge {
  value: number;
  max?: number;
  theme?: 'default' | 'dark';
  appearance?: 'default' | 'primary' | 'important' | 'added' | 'removed';
}

export interface Lozenge {
  text: string;
  bold?: boolean;
  appearance?: 'default' | 'success' | 'removed' | 'inprogress' | 'new' | 'moved';
}

export interface Metadata {
  title?: string;
  icon?: Icon;
  badge?: Badge;
  lozenge?: Lozenge;
  users?: Icon[];
  text?: string;
}

export interface Context {
  text: string;
  icon?: Icon;
  href?: string;  // a page URL
}

export interface Action {
  title: string;
  description?: string;
  handler: () => void;
}
