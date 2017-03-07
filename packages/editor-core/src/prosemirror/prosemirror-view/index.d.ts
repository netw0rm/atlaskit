import { DOMSerializer, EditorState, Node, Slice, Transaction } from '../';
import * as dom from '../dom';
import { Decoration, DecorationSet } from './decoration';
import { NodeViewDesc } from './viewdesc';
export { Decoration, DecorationSet, NodeViewDesc };
import * as browser from './browser';

export { browser };

export class EditorView {
  constructor(place: dom.Node | ((_0: dom.Node) => void) | null, props: EditorProps);

  props: EditorProps;
  state: EditorState<any>;
  content: dom.Element;
  dom: dom.Element;
  docView: NodeViewDesc;
  update(props: EditorProps): void;
  updateState(state: EditorState<any>): void;
  hasFocus(): boolean;
  someProp(propName: string, f: (prop: any) => any): any;
  focus(): void;
  root: dom.Document | dom.DocumentFragment;
  posAtCoords(coords: { left: number, top: number }): { pos: number, inside: number } | null;
  coordsAtPos(pos: number): { left: number, right: number, top: number, bottom: number };
  endOfTextblock(dir: 'up' | 'down' | 'left' | 'right' | 'forward' | 'backward', state?: EditorState<any>): boolean;
  destroy(): void;
  dispatch(tr: Transaction): void;
  dispatchEvent(event: string | CustomEvent);
}

export interface PluginProps {
  handleDOMEvents?: { [key: string]: (view: EditorView, event: dom.Event) => boolean };
  handleKeyDown?: (view: EditorView, event: dom.KeyboardEvent) => boolean;
  handleKeyPress?: (view: EditorView, event: dom.KeyboardEvent) => boolean;
  handleTextInput?: (view: EditorView, from: number, to: number, text: string) => boolean;
  handleClickOn?: (view: EditorView, pos: number, node: Node, nodePos: number, event: dom.MouseEvent, direct: boolean) => boolean;
  handleClick?: (view: EditorView, pos: number, event: dom.MouseEvent) => boolean;
  handleDoubleClickOn?: (view: EditorView, pos: number, node: Node, nodePos: number, event: dom.MouseEvent, direct: boolean) => boolean;
  handleDoubleClick?: (view: EditorView, pos: number, event: dom.MouseEvent) => boolean;
  handleTripleClickOn?: (view: EditorView, pos: number, node: Node, nodePos: number, event: dom.MouseEvent, direct: boolean) => boolean;
  handleTripleClick?: (view: EditorView, pos: number, event: dom.MouseEvent) => boolean;
  handleContextMenu?: (view: EditorView, pos: number, event: dom.MouseEvent) => boolean;
  onFocus?: (view: EditorView, event: dom.Event) => void;
  onBlur?: (view: EditorView, event: dom.Event) => void;
  domParser?: DOMParser;
  clipboardParser?: DOMParser;
  transformPasted?: (_0: Slice) => Slice;
  transformPastedHTML?: (_0: string) => string;
  transformPastedText?: (_0: string) => string;
  nodeViews?: { [key: string]: (node: Node, view: EditorView, getPos: () => number, decorations: Decoration[]) => NodeView };
  clipboardSerializer?: DOMSerializer;
  decorations?: (view: EditorState<any>) => DecorationSet;
  editable?: (_0: EditorState<any>) => boolean;
  attributes?: { [key: string]: string } | ((_0: EditorState<any>) => { [key: string]: string } | void);
  scrollThreshold?: number;
  scrollMargin?: number;
}

export interface EditorProps extends PluginProps {
  state: EditorState<any>;
  dispatchTransaction?: (tr: Transaction) => void;
}
