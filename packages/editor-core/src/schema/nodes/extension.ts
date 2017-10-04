import { NodeSpec } from '../../prosemirror';
import { TopLevel } from './doc';

export interface Attributes {
  extensionId: string;
  extensionData: {};
}

/**
 * @name extension_node
 */
export interface Definition {
  type: 'extension';
  attrs: Attributes;
  content: TopLevel;
}

export const extension: NodeSpec = {
  attrs: {
    extensionId: { default: '' },
    extensionData: { default: {} }
  },
  content: 'block+',
  group: 'block'
};
