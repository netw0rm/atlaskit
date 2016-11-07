import { HardBreak as HardBreakNodeType, Node } from 'ak-editor-prosemirror';

export { HardBreakNodeType };

export interface HardBreakNode extends Node {
  type: HardBreakNodeType;
}