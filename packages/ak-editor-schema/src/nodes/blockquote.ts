import { BlockQuote as BlockQuoteNodeType, Node } from 'ak-editor-prosemirror';

export { BlockQuoteNodeType };

export interface BlockQuoteNode extends Node {
  type: BlockQuoteNodeType;
}