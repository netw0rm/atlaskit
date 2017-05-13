import { Node as PMNode } from '../prosemirror';

export interface ReactNodeProps {
  selected: boolean;
}

export {
  default as ReactPMNode,
  ReactProsemirrorNodeProps,
} from './prosemirror-node';

export interface PositionedNode extends PMNode {
  getPos: () => number;
}
