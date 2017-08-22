import { NodeSpec, Node as PMNode } from '../../prosemirror';

/**
 * @name applicationCard_node
 * @additionalProperties false
 */
export interface Definition {
  type: 'applicationCard';
  /**
   * @additionalProperties false
   */
  attrs: Attributes;
}

export interface Attributes {
  text: string;
  textUrl?: string;
  link?: {
    /**
     * @pattern "^https:\/\/|^data:image\/"
     */
    url: string;
  };
  background?: {
    /**
     * @pattern "^https:\/\/|^data:image\/"
     */
    url: string;
  };
  collapsible?: boolean;
  preview?: {
    /**
     * @pattern "^https:\/\/|^data:image\/"
     */
    url: string;
  };
  title: {
    text: string;
    user?: {
      icon: Icon;
    };
    lozenge?: AppCardLozenge;
  };
  description?: {
    title?: string;
    text: string;
  };
  details?: Array<Detail>;
  context?: {
    text: string;
    icon?: Icon;
  };
  actions?: Array<AppCardAction>;
}

export interface AppCardAction {
  title: string;
}

export interface AppCardLozenge {
  text: string;
  bold?: boolean;
  appearance?: 'default' | 'success' | 'removed' | 'inprogress' | 'new' | 'moved';
}

export interface AppCardBadge {
  value: number;
  max?: number;
  theme?: 'default' | 'dark';
  appearance?: 'default' | 'primary' | 'important' | 'added' | 'removed';
}

export interface Detail {
  title?: string;
  text?: string;
  icon?: Icon;
  badge?: AppCardBadge;
  lozenge?: AppCardLozenge;
  users?: Array<User>;
}

export interface User {
  id?: string;
  icon: Icon;
}

export interface Icon {
  /**
   * @pattern "^https:\/\/|^data:image\/"
   */
  url: string;
  label: string;
}

const defaultAttrs = {
  text: { default: '' },
  textUrl: { default: null },
  link: { default: null },
  background: { default: null },
  collapsible: { default: null },
  preview: { default: null },
  title: { default: { text: '' } },
  description: { default: null },
  details: { default: null },
};

export const applicationCard: NodeSpec = {
  inline: false,
  selectable: true,
  attrs: defaultAttrs,
  parseDOM: [{
    tag: 'div[data-node-type="media"]',
    getAttrs: (dom: HTMLElement) => {
      const attrs: Attributes = { text: '', title: { text: '' } };

      Object.keys(defaultAttrs).forEach(key => {
        attrs[key] = dom.dataset[key];
      });

      return attrs;
    }
  }],
  toDOM(node: PMNode) {
    return ['div', node.attrs];
  }
};
