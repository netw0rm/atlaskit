import { Node as PMNode } from '../prosemirror';

export { default as ReactPMNode } from './prosemirror-node';

export interface PositionedNode extends PMNode {
  getPos: () => number;
}
