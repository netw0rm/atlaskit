import { DOMSerializer, EditorState, Node, Slice, Transaction, ParseRule } from '../';
import * as dom from '../dom';
import { Decoration, DecorationSet } from './decoration';

export class NodeViewDesc extends ViewDesc {
}

export class ViewDesc {
  constructor(parent: ViewDesc, children: ViewDesc[], dom: dom.Node, contentDOM?: dom.Node);
  matchesWidget(): boolean;
  matchesMark(): boolean;
  matchesNode(): boolean;
  matchesHack(): boolean;
  parseRule(): ParseRule;
  stopEvent(): boolean;
  size(): number;
  border(): number;
  posBeforeChild(child: ViewDesc): void;
  posAtStart(): number;
  posAtEnd(): number;
  localPosFromDOM(dom: dom.Node, offset: number, bias?: number): number;
  nearestDesc(dom: dom.Node, onlyNodes);
  getDesc(dom);
  posFromDOM(dom: dom.Node, offset: number, bias?: number);
  descAt(pos: number): NodeViewDesc;
  domFromPos(pos: number, searchDOM?: number): {node: dom.Node, offset: number};
}
