import { Node as PMNode } from '../prosemirror';

export {
  default as ReactPMNode,
  ReactProsemirrorNodeProps,
} from './prosemirror-node';

export interface PositionedNode extends PMNode {
  getPos: () => number;
}
