import { DOMSerializer, EditorState, Node, Slice, Transaction } from '../';
import * as dom from '../dom';
import { Decoration, DecorationSet } from './decoration';
import { NodeView } from './viewdesc';

export interface NodeView {
  dom?: dom.Node;
  contentDOM?: dom.Node;
  update?: (node: Node, decorations: Decoration[]) => boolean;
  selectNode?: () => void;
  deselectNode?: () => void;
  setSelection?: (anchor: number, head: number, root: dom.Document) => void;
  stopEvent?: (event: dom.Event) => boolean;
  ignoreMutation?: (_0: dom.MutationRecord) => boolean;
  destroy?: () => void;
}
