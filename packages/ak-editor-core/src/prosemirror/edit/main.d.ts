import { DOMDocument, DOMEvent, DOMNode, DOMElement } from '../dom';
import { Mark, MarkedRange, MarkType, Node, UpdateScheduler, Schema, Selection, Slice, Transform } from '../';
import { Input } from './input';
import Keymap from 'browserkeymap';
import { EditorTransform } from './transform';
import { Subscription, StoppableSubscription, PipelineSubscription } from '../subscription';

export class ProseMirror {
  constructor(opts: { [key: string]: any }) {}

  input: Input; // private

  schema: Schema;
  content: DOMElement;
  wrapper: DOMElement;
  on: {
    change: Subscription<() => void>,
    selectionChange: Subscription<() => void>,
    textInput: Subscription<(text: string) => void>,
    beforeSetDoc: Subscription<(doc: Node, selection: Selection) => void>,
    setDoc: Subscription<(doc: Node, selection: Selection) => void>,
    interaction: Subscription<() => void>,
    focus: Subscription<() => void>,
    blur: Subscription<() => void>,
    click: StoppableSubscription<(pos: number, event: DOMEvent) => void>,
    clickOn: StoppableSubscription<(pos: number, node: Node, nodePos: number, event: DOMEvent) => void>,
    doubleClick: StoppableSubscription<(pos: number, event: DOMEvent) => void>,
    doubleClickOn: StoppableSubscription<(pos: number, node: Node, nodePos: number, event: DOMEvent) => void>,
    contextMenu: StoppableSubscription<(pos: number, node: Node, event: DOMEvent) => void>,
    transformPasted: PipelineSubscription<(slice: Slice) => Slice>,
    transformPastedText: PipelineSubscription<(text: string) => string>,
    transformPastedHTML: PipelineSubscription<(html: string) => string>,
    transform: Subscription<(transform: Transform, selectionBeforeTransform: Selection, options: { [key: string]: any }) => void>,
    beforeTransform: Subscription<(transform: Transform, options: { [key: string]: any }) => void>,
    filterTransform: StoppableSubscription<(transform: Transform) => void>,
    flushing: Subscription<() => void>,
    flush: Subscription<() => void>,
    draw: Subscription<() => void>,
    activeMarkChange: Subscription<() => void>,
    domPaste: StoppableSubscription<(_0: DOMEvent) => void>,
    domDrop: StoppableSubscription<(_0: DOMEvent) => void>
  };
  root: DOMDocument;
  getOption(name: string): any;
  selection: Selection;
  setTextSelection(anchor: number, head?: number): void;
  setNodeSelection(pos: number): void;
  setSelection(selection: Selection): void;
  doc: Node;
  history: History;
  setDoc(doc: Node, sel?: Selection): void;
  tr: EditorTransform;
  apply(transform: Transform, options?: { [key: string]: any }): Transform;
  ensureOperation(options?: { [key: string]: any }): Operation;
  startOperation(options?: { [key: string]: any }): Operation;
  flush(): boolean;
  addKeymap(map: Keymap, priority?: number): void;
  removeKeymap(map: string | Keymap): void;
  markRange(from: number, to: number, options?: { [key: string]: any }): MarkedRange;
  removeRange(range: MarkedRange): void;
  activeMarks(): Mark[];
  addActiveMark(mark: Mark): void;
  removeActiveMark(markType: MarkType): void;
  focus(): void;
  hasFocus(): boolean;
  posAtCoords(coords: { top: number, left: number }): number | null;
  contextAtCoords(coords: { top: number, left: number }): { pos: number, inside: { pos: number, node: Node }[] } | null;
  coordsAtPos(pos: number): { top: number, left: number, bottom: number };
  scrollIntoView(pos?: number): void;
  translate(string: string): string;
  scheduleDOMUpdate(f: () => (() => (() => void) | void) | void): void;
  unscheduleDOMUpdate(f: () => (() => (() => void) | void) | void): void;
  updateScheduler(subscriptions: Subscription<any>[], start: () => (() => void) | void): UpdateScheduler;
}

export interface Operation {};
