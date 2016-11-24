declare module 'prosemirror/dist/collab' {
    export import { rebaseSteps } from 'prosemirror/dist/collab/rebase';
    export const collabEditing: any;
}

declare module 'prosemirror/dist/collab/rebase' {
    import { Remapping, Transform } from 'prosemirror/dist/transform';
    export function rebaseSteps(doc: any, forward: any, steps: any, maps: any): {
        doc: any;
        transform: any; mapping: Remapping;
        positions: any[];
    };
}

declare module 'prosemirror/dist/commands-list' {
    import { ProseMirror } from 'prosemirror/dist/edit';
    export function wrapInList(nodeType: any, attrs?: any): (pm: ProseMirror, apply?: any) => boolean;
    export function splitListItem(nodeType: any): (pm: ProseMirror) => boolean;
    export function liftListItem(nodeType: any): (pm: ProseMirror, apply: any) => boolean;
    export function sinkListItem(nodeType: any): (pm: ProseMirror, apply: any) => boolean;
}

declare module 'prosemirror/dist/commands-table' {
    import { ProseMirror } from 'prosemirror/dist/edit';
    export function addColumnBefore(pm: ProseMirror, apply: any): boolean;
    export function addColumnAfter(pm: ProseMirror, apply: any): boolean;
    export function removeColumn(pm: ProseMirror, apply: any): boolean;
    export function addRowBefore(pm: ProseMirror, apply: any): boolean;
    export function addRowAfter(pm: ProseMirror, apply: any): boolean;
    export function removeRow(pm: ProseMirror, apply: any): boolean;
    export function selectNextCell(pm: ProseMirror, apply: any): boolean;
    export function selectPreviousCell(pm: ProseMirror, apply: any): boolean;
}

declare module 'prosemirror/dist/edit/commands' {
    import { ProseMirror } from 'prosemirror/dist/edit';
    export namespace commands {
      export * from 'prosemirror/dist/commands-list';
      export * from 'prosemirror/dist/commands-table';
      export function chainCommands(...commands: any[]): (pm: ProseMirror, apply: any) => any;
      export function createParagraphNear(pm: ProseMirror, apply: any): boolean;
      export function deleteCharAfter(pm: ProseMirror, apply: any): boolean;
      export function deleteCharBefore(pm: ProseMirror, apply: any): boolean;
      export function deleteSelection(pm: ProseMirror, apply: any): boolean;
      export function deleteWordAfter(pm: ProseMirror, apply: any): boolean;
      export function deleteWordBefore(pm: ProseMirror, apply: any): boolean;
      export function joinBackward(pm: ProseMirror, apply: any): boolean;
      export function joinDown(pm: ProseMirror, apply: any): boolean;
      export function joinForward(pm: ProseMirror, apply: any): boolean;
      export function joinUp(pm: ProseMirror, apply: any): boolean;
      export function lift(pm: ProseMirror, apply?: any): boolean;
      export function liftEmptyBlock(pm: ProseMirror, apply: any): boolean;
      export function newlineInCode(pm: ProseMirror, apply: any): boolean;
      export function redo(pm: ProseMirror, apply: any): boolean;
      export function selectParentNode(pm: ProseMirror, apply: any): boolean;
      export function setBlockType(nodeType: any, attrs?: any): (pm: ProseMirror, apply?: any) => boolean;
      export function splitBlock(pm: ProseMirror, apply: any): boolean;
      export function toggleMark(markType: any, attrs?: any): (pm: ProseMirror, apply?: any) => boolean;
      export function undo(pm: ProseMirror, apply: any): boolean;
      export function wrapIn(nodeType: any, attrs?: any): (pm: ProseMirror, apply?: any) => boolean;
      export let baseKeymap: any;
    }
}

declare module 'prosemirror/dist/edit/capturekeys' {
    export const captureKeys: any;
}

declare module 'prosemirror/dist/edit/css' {

}

declare module 'prosemirror/dist/edit/domchange' {
    import { ProseMirror } from 'prosemirror/dist/edit';
    export function readInputChange(pm: ProseMirror): boolean;
    export function readCompositionChange(pm: ProseMirror, margin: any): boolean;
}

declare module 'prosemirror/dist/edit/dompos' {
    import { ProseMirror } from 'prosemirror/dist/edit';
    export function posFromDOM(dom: any, domOffset: any, bias?: number): any;
    export function childContainer(dom: any): any;
    export function DOMFromPos(pm: ProseMirror, pos: any, loose?: any): {
        node: any;
        offset: any;
    };
    export function DOMFromPosFromEnd(pm: ProseMirror, pos: any): {
        node: any;
        offset: any;
    };
    export function DOMAfterPos(pm: ProseMirror, pos: any): any;
    export function scrollIntoView(pm: ProseMirror, pos: any): void;
    export function posAtCoords(pm: ProseMirror, coords: any): {
        pos: any;
        inside: any;
    };
    export function coordsAtPos(pm: ProseMirror, pos: any): {
        top: any;
        bottom: any;
        left: any;
        right: any;
    };
}

declare module 'prosemirror/dist/edit/draw' {
    import { ProseMirror } from 'prosemirror/dist/edit';
    export const DIRTY_RESCAN: number;
    export const DIRTY_REDRAW: number;
    export function draw(pm: ProseMirror, doc: any): void;
    export function redraw(pm: ProseMirror, dirty: any, doc: any, prev: any): void;
}

declare module 'prosemirror/dist/edit/selection' {
  import {
    ResolvedPos
  } from 'prosemirror/dist/model/resolvedpos';

  export class Selection {
    $from : ResolvedPos;
    $to: ResolvedPos;
    from: number;
    to: number;
  }
  export class TextSelection extends Selection {
      constructor($anchor: ResolvedPos, $head?: ResolvedPos);
      $anchor: ResolvedPos;
      $head: ResolvedPos;
  }
  export class NodeSelection extends Selection {
      constructor($from: ResolvedPos)
  }
}

declare module 'prosemirror/dist/edit/range' {
  export interface MarkedRange {}
  export interface RangeStore {}
}

declare module 'prosemirror/dist/edit' {
    export { commands } from 'prosemirror/dist/edit/commands';
    export { ProseMirror } from 'prosemirror/dist/edit/main';
    export { Selection, TextSelection, NodeSelection } from 'prosemirror/dist/edit/selection';
    export { MarkedRange } from 'prosemirror/dist/edit/range';
    export { Plugin } from 'prosemirror/dist/edit/plugin';
    export const Keymap: any;
}

declare module 'prosemirror/dist/edit/input' {
    import { ProseMirror } from 'prosemirror/dist/edit';
    export class Input {
        constructor(pm: ProseMirror);
        dispatchKey(name: any, e: any): boolean;
        insertText(from: number, to: number, text: any, findSelection: any): void;
        composing: any;
        startComposition(dataLen: any, realStart: any): void;
        applyComposition(andFlush: any): void;
    }
}

declare module 'prosemirror/dist/edit/main' {
    import { MarkedRange } from 'prosemirror/dist/edit/range';
    import { EditorTransform } from 'prosemirror/dist/edit/transform';
    import { UpdateScheduler } from 'prosemirror/dist/edit/update';
    import { Schema } from 'prosemirror/dist/model/schema';
    import { Selection } from 'prosemirror/dist/edit/selection';
    import { Slice } from 'prosemirror/dist/model';

    interface Subscription<Handler> {
      add(handler: Handler): void;
      dispatch(...args: any[]): any;
    }

    type AnySubscription = Subscription<(...args: any[]) => any>;

    interface On {
      transformPasted: Subscription<(slice: Slice) => Slice>;
      flush: AnySubscription;
      change: AnySubscription;
      activeMarkChange: AnySubscription;
      interaction: AnySubscription;
      selectionChange: AnySubscription;
      change: AnySubscription;
      selectionChange: AnySubscription;
      textInput: AnySubscription;
      beforeSetDoc: AnySubscription;
      setDoc: AnySubscription;
      interaction: AnySubscription;
      focus: AnySubscription;
      blur: AnySubscription;
      click: AnySubscription;
      clickOn: AnySubscription;
      doubleClick: AnySubscription;
      doubleClickOn: AnySubscription;
      contextMenu: AnySubscription;
      transformPasted: AnySubscription;
      transformPastedText: AnySubscription;
      transformPastedHTML: AnySubscription;
      transform: AnySubscription;
      beforeTransform: AnySubscription;
      filterTransform: AnySubscription;
      flushing: AnySubscription;
      flush: AnySubscription;
      draw: AnySubscription;
      activeMarkChange: AnySubscription;
      domDrop: AnySubscription;
    }

    export class ProseMirror {
        constructor(opts: any);
        on: On;
        schema: Schema;
        nodes: any;
        input: any;
        doc: any;
        sel: any;
        content: HTMLElement;
        root: HTMLElement;
        wrapper: HTMLElement;
        getOption(name: any): any;
        selection: any;
        setTextSelection(anchor: any, head?: any): void;
        setNodeSelection(pos: any): void;
        setSelection(selection: any): void;
        setDocInner(doc: any): void;
        setDoc(doc: any, sel: any): void;
        updateDoc(doc: any, mapping: any, selection: any): void;
        tr: EditorTransform;
        apply(transform: any, options?: {}): any;
        ensureOperation(options: any): any;
        startOperation(options: any): any;
        unscheduleFlush(): void;
        flush(): boolean;
        addKeymap(map: any, priority?: number): void;
        removeKeymap(map: any): boolean;
        markRange(from: number, to: number, options: any): MarkedRange;
        removeRange(range: any): void;
        activeMarks(): any;
        addActiveMark(mark: any): void;
        removeActiveMark(markType: any): void;
        focus(): void;
        hasFocus(): any;
        posAtCoords(coords: any): any;
        contextAtCoords(coords: any): {
            pos: any;
            inside: any[];
        };
        coordsAtPos(pos: any): {
            top: any;
            bottom: any;
            left: any;
            right: any;
        };
        scrollIntoView(pos?: any): void;
        markRangeDirty(from: number, to: number, doc?: any): void;
        markAllDirty(): void;
        translate(string: any): any;
        scheduleDOMUpdate(f: any): void;
        unscheduleDOMUpdate(f: any): void;
        updateScheduler(subscriptions: any, start: any): UpdateScheduler;
    }
}

declare module 'prosemirror/dist/edit/options' {
    export function parseOptions(obj: any): any;
}

declare module 'prosemirror/dist/edit/plugin' {
    import { ProseMirror } from 'prosemirror/dist/edit';

    interface PluginStateCtor<S> {
      new(pm: ProseMirror, ...args: any[]): S;
    }

    export class Plugin<S> {
        constructor(state: PluginStateCtor<S>, options?: any, prop?: any);
        get(pm: ProseMirror): S;
        attach(pm: ProseMirror): any;
        detach(pm: ProseMirror): void;
        ensure(pm: ProseMirror): any;
        config(options: any): this;
    }
}

declare module 'prosemirror/dist/edit/transform' {
    import { ProseMirror } from 'prosemirror/dist/edit';
    import { Transform } from 'prosemirror/dist/transform';
    export class EditorTransform extends Transform {
        constructor(pm: ProseMirror);
        apply(options?: any): any;
        applyAndScroll(): any;
        selection: any;
        setSelection(selection: any): this;
        replaceSelection(node: any, inheritMarks?: any): this;
        deleteSelection(): any;
        typeText(text: any): this;
        pm: ProseMirror;
    }
}

declare module 'prosemirror/dist/edit/update' {
    import { ProseMirror } from 'prosemirror/dist/edit';
    export class EditorScheduler {
        constructor(pm: ProseMirror);
        set(f: any): void;
        unset(f: any): void;
        force(): void;
        onFlush(): void;
    }
    export class UpdateScheduler {
        constructor(pm: ProseMirror, subscriptions: any, start: any);
        detach(): void;
        onEvent(): void;
        force(): void;
    }
}

declare module 'prosemirror/dist/example-setup' {
    export { buildMenuItems } from 'prosemirror/dist/example-setup/menu';
    export { buildKeymap } from 'prosemirror/dist/example-setup/keymap';
    export var exampleSetup: any;
    export function buildInputRules(schema: any): any[];
}

declare module 'prosemirror/dist/example-setup/keymap' {
    export function buildKeymap(schema: any, mapKeys: any): any;
}

declare module 'prosemirror/dist/example-setup/menu' {
    export function buildMenuItems(schema: any): {};
}

declare module 'prosemirror/dist/example-setup/style' {
    export const className: string;
}

declare module 'prosemirror/dist/history' {
    import { ProseMirror } from 'prosemirror/dist/edit';
    export class History {
        constructor(pm: ProseMirror, options: any);
        resetState(): void;
        detach(pm: ProseMirror): void;
        recordTransform(transform: any, selection: any, options: any): void;
        undo(): any;
        redo(): any;
        undoDepth: any;
        redoDepth: any;
        cut(): void;
        shift(from: number, to: number): any;
        applyIgnoring(transform: any, selection: any): void;
        getVersion(): any;
        isAtVersion(version: any): boolean;
        backToVersion(version: any): boolean;
        rebased(newMaps: any, rebasedTransform: any, positions: any): void;
    }
    export const historyPlugin: any;
}

declare module 'prosemirror/dist/inputrules' {
    export { InputRule, inputRules, InputRules } from 'prosemirror/dist/inputrules/inputrules';
    export { emDash, ellipsis, openDoubleQuote, closeDoubleQuote, openSingleQuote, closeSingleQuote, smartQuotes, allInputRules } from 'prosemirror/dist/inputrules/rules';
    export { wrappingInputRule, textblockTypeInputRule, blockQuoteRule, orderedListRule, bulletListRule, codeBlockRule, headingRule } from 'prosemirror/dist/inputrules/util';
}

declare module 'prosemirror/dist/inputrules/inputrules' {
    import { ProseMirror } from 'prosemirror/dist/edit';
    export class InputRule {
        constructor(match: any, filter: any, handler: any);
    }
    export class InputRules {
        constructor(pm: ProseMirror, options: any);
        detach(): void;
        addRule(rule: any): void;
        removeRule(rule: any): boolean;
        onTextInput(text: any): void;
        backspace(): boolean;
    }
    export const inputRules: any;
}

declare module 'prosemirror/dist/inputrules/rules' {
    import { InputRule } from 'prosemirror/dist/inputrules/inputrules';
    export const emDash: InputRule;
    export const ellipsis: InputRule;
    export const openDoubleQuote: InputRule;
    export const closeDoubleQuote: InputRule;
    export const openSingleQuote: InputRule;
    export const closeSingleQuote: InputRule;
    export const smartQuotes: InputRule[];
    export const allInputRules: InputRule[];
}

declare module 'prosemirror/dist/inputrules/util' {
    import { InputRule } from 'prosemirror/dist/inputrules/inputrules';
    export function wrappingInputRule(regexp: any, filter: any, nodeType: any, getAttrs: any, joinPredicate: any): InputRule;
    export function textblockTypeInputRule(regexp: any, filter: any, nodeType: any, getAttrs: any): InputRule;
    export function blockQuoteRule(nodeType: any): any;
    export function orderedListRule(nodeType: any): InputRule;
    export function bulletListRule(nodeType: any): any;
    export function codeBlockRule(nodeType: any): any;
    export function headingRule(nodeType: any, maxLevel: any): InputRule;
}

declare module 'prosemirror/dist/markdown/from_markdown' {
    export class MarkdownParser {
        constructor(schema: any, tokenizer: any, tokens: any);
        parse(text: any): any;
    }
    export const defaultMarkdownParser: MarkdownParser;
}

declare module 'prosemirror/dist/markdown' {
    export { defaultMarkdownParser, MarkdownParser } from 'prosemirror/dist/markdown/from_markdown';
    export { MarkdownSerializer, defaultMarkdownSerializer, MarkdownSerializerState } from 'prosemirror/dist/markdown/to_markdown';
}

declare module 'prosemirror/dist/markdown/to_markdown' {
    export class MarkdownSerializer {
        protected nodes: any;
        protected marks: any;
        constructor(nodes: any, marks: any);
        serialize(content: any, options?: Object): any;
    }
    export const defaultMarkdownSerializer: MarkdownSerializer;
    export class MarkdownSerializerState {
      out: string;
      closed: boolean;
      marks: {
        [markTypeName: string] : {
          open: String | Function,
          close: String | Function,
          mixable?: boolean
        }
      };
      constructor(nodes: any, marks: any, options: any);
        flushClose(size: any): void;
        wrapBlock(delim: any, firstDelim: any, node: any, f: any): void;
        atBlank(): boolean;
        ensureNewLine(): void;
        write(content?: any): void;
        closeBlock(node: any): void;
        text(text: any, escape?: boolean): void;
        render(node: any): void;
        renderContent(parent: any): void;
        renderInline(parent: any): void;
        renderList(node: any, delim: any, firstDelim: any): void;
        esc(str: any, startOfLine?: boolean): any;
        quote(str: any): string;
        repeat(str: any, n: any): string;
        markString(mark: any, open: any): any;
    }
}

declare module 'prosemirror/dist/menu/icons' {
    export function getIcon(icon: any): HTMLDivElement;
}

declare module 'prosemirror/dist/menu' {
    export { MenuItem, Dropdown, DropdownSubmenu, renderGrouped, icons, joinUpItem, liftItem, selectParentNodeItem, undoItem, redoItem, toggleMarkItem, insertItem, wrapItem, blockTypeItem } from 'prosemirror/dist/menu/menu';
    export { menuBar } from 'prosemirror/dist/menu/menubar';
    export { tooltipMenu } from 'prosemirror/dist/menu/tooltipmenu';
}

declare module 'prosemirror/dist/menu/menu' {
    import { ProseMirror } from 'prosemirror/dist/edit';
    export class MenuItem {
        constructor(spec: any);
        render(pm: ProseMirror): any;
    }
    export class Dropdown {
        constructor(content: any, options: any);
        render(pm: ProseMirror): HTMLAnchorElement;
        expand(pm: ProseMirror, dom: any, items: any): () => boolean;
    }
    export class DropdownSubmenu {
        constructor(content: any, options: any);
        render(pm: ProseMirror): HTMLAnchorElement;
    }
    export function renderGrouped(pm: ProseMirror, content: any): DocumentFragment;
    export const icons: {
        join: {
            width: number;
            height: number;
            path: string;
        };
        lift: {
            width: number;
            height: number;
            path: string;
        };
        selectParentNode: {
            text: string;
            css: string;
        };
        undo: {
            width: number;
            height: number;
            path: string;
        };
        redo: {
            width: number;
            height: number;
            path: string;
        };
        strong: {
            width: number;
            height: number;
            path: string;
        };
        em: {
            width: number;
            height: number;
            path: string;
        };
        code: {
            width: number;
            height: number;
            path: string;
        };
        link: {
            width: number;
            height: number;
            path: string;
        };
        bulletList: {
            width: number;
            height: number;
            path: string;
        };
        orderedList: {
            width: number;
            height: number;
            path: string;
        };
        blockquote: {
            width: number;
            height: number;
            path: string;
        };
    };
    export const joinUpItem: MenuItem;
    export const liftItem: MenuItem;
    export const selectParentNodeItem: MenuItem;
    export const undoItem: MenuItem;
    export const redoItem: MenuItem;
    export function toggleMarkItem(markType: any, options: any): MenuItem;
    export function insertItem(nodeType: any, options: any): MenuItem;
    export function wrapItem(nodeType: any, options: any): MenuItem;
    export export function blockTypeItem(nodeType: any, options: any): MenuItem;
}

declare module 'prosemirror/dist/menu/menubar' {
    export const menuBar: any;
}

declare module 'prosemirror/dist/menu/tooltipmenu' {
    export const tooltipMenu: any;
}

declare module 'prosemirror/dist/model/diff' {
    export function findDiffStart(a: any, b: any, pos: any): any;
    export function findDiffEnd(a: any, b: any, posA: any, posB: any): any;
}

declare module 'prosemirror/dist/model/fragment' {
    import { Node } from 'prosemirror/dist/model';
    export class Fragment {
        constructor(content: any, size?: any);
        toString(): string;
        toStringInner(): any;
        nodesBetween(from: number, to: number, f: any, nodeStart: any, parent: any): void;
        textBetween(from: number, to: number, separator: any): string;
        cut(from: number, to: number): Fragment;
        cutByIndex(from: number, to: number): any;
        append(other: Fragment): Fragment;
        replaceChild(index: number, node: Node): Fragment;
        addToStart(node: Node): Fragment;
        addToEnd(node: Node): Fragment;
        toJSON(): any;
        static fromJSON(schema: any, value: any): Fragment;
        static fromArray(array: any): Fragment;
        eq(other: any): boolean;
        static from(nodes: any): Fragment;
        firstChild: Node | null;
        lastChild: Node | null;
        childCount: number;
        child(index: number): Node;
        offsetAt(index: number): number;
        maybeChild(index: number): Node | undefined;
        forEach(f: (node: Node, offset?: number, index?: number) => any): void;
        findDiffStart(other: any, pos?: number): any;
        findDiffEnd(other: any, pos?: any, otherPos?: any): any;
        findIndex(pos: any, round?: number): {
            index: number;
            offset: number;
        };
        toDOM(options?: {}): any;
    }
}

declare module 'prosemirror/dist/model/from_dom' {
    export function parseDOM(schema: any, dom: any, options: any): any;
    export function parseDOMInContext($context: any, dom: any, options?: {}): any;
}

declare module 'prosemirror/dist/model/replace' {
    export const { ReplaceError }: any;
    export class Slice {
        constructor(content: any, openLeft: number, openRight: number, possibleParent?: any)
        content: any;
        openLeft: number;
        openRight: number;
        possibleParent: any;
        static empty: boolean;
    }
}

declare module 'prosemirror/dist/model/content' {
    export const { ContentMatch }: any;
}

declare module 'prosemirror/dist/model' {
    export { Node } from 'prosemirror/dist/model/node';
    export { ResolvedPos, NodeRange } from 'prosemirror/dist/model/resolvedpos';
    export { Fragment } from 'prosemirror/dist/model/fragment';
    export { Slice, ReplaceError } from 'prosemirror/dist/model/replace';
    export { Mark } from 'prosemirror/dist/model/mark';
    export { Schema, NodeType, Block, Inline, Text, MarkType, Attribute } from 'prosemirror/dist/model/schema';
    export { ContentMatch } from 'prosemirror/dist/model/content';
    export { parseDOMInContext } from 'prosemirror/dist/model/from_dom';
}

declare module 'prosemirror/dist/model/mark' {
    import { MarkType } from 'prosemirror/dist/model/schema';
    export class Mark {
        constructor(type: MarkType, attrs: any);
        toJSON(): {
            _: any;
        };
        type: MarkType;
        attrs: any;
        addToSet(set: Mark[]): Mark[];
        removeFromSet(set: Mark[]): Mark[];
        isInSet(set: Mark[]): boolean;
        eq(other: Mark): boolean;
        static sameSet(a: any, b: any): boolean;
        static setFrom(marks: any): any;
    }
}

declare module 'prosemirror/dist/model/node' {
    import { ResolvedPos } from 'prosemirror/dist/model/resolvedpos';
    import { Mark, Fragment } from 'prosemirror/dist/model';
    import { NodeType } from 'prosemirror/dist/model';
    export class Node {
        constructor(type?: any, attrs?: any, content?: any, marks?: any);
        content: Fragment;
        nodeSize: number;
        childCount: number;
        child(index: any): any;
        maybeChild(index: any): any;
        forEach(f: any): void;
        textBetween(from: number, to: number, separator?: any): any;
        firstChild: any;
        lastChild: any;
        eq(other: any): boolean;
        sameMarkup(other: any): boolean;
        hasMarkup(type: any, attrs: any, marks: any): boolean;
        copy(content?: any): any;
        mark(marks: Mark[]): this;
        cut(from: number, to: number): any;
        slice(from: number, to?: number): any;
        replace(from: number, to: number, slice: any): any;
        nodeAt(pos: number): this;
        childAfter(pos: any): {
            node: any;
            index: any;
            offset: any;
        };
        childBefore(pos: any): {
            node: any;
            index: any;
            offset: any;
        };
        nodesBetween(from: number, to: number, f: any, pos?: number): void;
        descendants(f: any): void;
        resolve(pos: any): any;
        resolveNoCache(pos: any): ResolvedPos;
        marksAt(pos: any): any;
        rangeHasMark(from: number, to: number, type: any): boolean;
        isBlock: boolean;
        isTextblock: boolean;
        isInline: boolean;
        isText: boolean;
        toString(): string;
        type: NodeType;
        attrs: any;
        marks: any;
        textContent: string;
        text?: string;
        contentMatchAt(index: any): any;
        canReplace(from: number, to: number, replacement: any, start: any, end: any): any;
        canReplaceWith(from: number, to: number, type: any, attrs: any, marks: any): any;
        canAppend(other: any): any;
        defaultContentType(at: any): any;
        toJSON(): {
            type: any;
        };
        static fromJSON(schema: any, json: any): any;
        toDOM(options?: {}): any;
    }
    export class TextNode extends Node {
        constructor(type: any, attrs: any, content: any, marks: any);
        toString(): any;
        textContent: any;
        textBetween(from: number, to: number): any;
        nodeSize: any;
        mark(marks: any): TextNode;
        cut(from?: number, to?: any): any;
        eq(other: any): boolean;
        toJSON(): {
            type: any;
        };
    }
}

declare module 'prosemirror/dist/model/resolvedpos' {
    import { Node } from 'prosemirror/dist/model';
    export class ResolvedPos {
        constructor(pos: number, path: any, parentOffset: any);
        depth: number;
        pos: number;
        parentOffset: number;
        resolveDepth(val: any): any;
        parent: any;
        node(depth: number): Node;
        index(depth?: number): number;
        indexAfter(depth?: number): number;
        start(depth?: number): number;
        end(depth?: number): number;
        before(depth?: number): number;
        after(depth?: number): number;
        atNodeBoundary: boolean;
        nodeAfter: Node | null;
        nodeBefore: Node | null;
        sameDepth(other: ResolvedPos): number;
        blockRange(other: this = this, pred?: any): NodeRange;
        sameParent(other: ResolvedPos): boolean;
        toString(): string;
        plusOne(): ResolvedPos;
        static resolve(doc: Node, pos: number): ResolvedPos;
        static resolveCached(doc: Node, pos: number): any;
    }
    export class NodeRange {
        constructor($from: any, $to: any, depth: number);
        start: any;
        end: any;
        parent: any;
        startIndex: any;
        endIndex: any;
    }
}

declare module 'prosemirror/dist/model/schema' {
    import { Node, TextNode } from 'prosemirror/dist/model/node';
    import { OrderedMap } from 'prosemirror/dist/util/orderedmap';
    import { Mark, Schema } from 'prosemirror/dist/model';
    export class NodeType {
        constructor(name: string, schema: Schema);
        name: string;
        schema: Schema;
        isBlock: boolean;
        isTextblock: boolean;
        isInline: boolean;
        isText: boolean;
        isLeaf: any;
        selectable: boolean;
        draggable: boolean;
        hasRequiredAttrs(ignore: any): boolean;
        compatibleContent(other: any): any;
        computeAttrs(attrs: any): any;
        create(attrs?: any, content?: any, marks?: any): Node;
        createChecked(attrs?: any, content?: any, marks?: any): Node;
        createAndFill(attrs?: any, content?: any, marks?: any): Node;
        validContent(content: any, attrs?: any): boolean;
        static compile(nodes: any, schema: any): any;
        toDOM(node?: Node): any[];
        get matchDOMTag(): any;
        contentExpr: any;
    }
    export class Block extends NodeType {
        isBlock: boolean;
        isTextblock: any;
    }
    export class Inline extends NodeType {
        isInline: boolean;
    }
    export class Text extends Inline {
        selectable: boolean;
        isText: boolean;
        create(attrs: any, content: any, marks: any): TextNode;
        toDOM(node: any): any;
    }
    export class Attribute {
        constructor(options?: { default?: any, compute?: () => any });
        get isRequired(): boolean;
    }
    export class MarkType {
        constructor(name: string, rank: number, schema: Schema);
        name: string;
        get attrs(): { [name: string]: Attribute };
        schema: Schema;
        inclusiveRight: boolean;
        create(attrs?: { [name: string]: any }): Mark;
        static compile(marks: any, schema: any): any;
        removeFromSet(set: any): any;
        isInSet(set: this[]): this | undefined;
        toDOM(_: any): void;
        matchDOMTag: any;
        matchDOMStyle: any;
    }
    export class Schema {
        constructor(spec: any, data?: any);
        marks: any;
        nodes: any;
        nodeSpec: OrderedMap;
        markSpec: OrderedMap;
        node(type: any, attrs?: any, content?: any, marks?: any): any;
        text(text: string, marks?: any): TextNode;
        mark(name: string, attrs?: any): any;
        nodeFromJSON(json: any): any;
        markFromJSON(json: any): any;
        nodeType(name: string): any;
        parseDOM(dom: any, options?: {}): any;
    }
}

declare module 'prosemirror/dist/model/to_dom' {
    export function fragmentToDOM(fragment: any, options: any): any;
    export function nodeToDOM(node: any, options: any): any;
}

declare module 'prosemirror/dist/prompt' {
    import { ProseMirror } from 'prosemirror/dist/edit';
    export class FieldPrompt {
        constructor(pm: ProseMirror, title: any, fields: any);
        close(): void;
        open(callback: any): void;
        values(): any;
        prompt(): {
            close: () => void;
        };
        reportInvalid(dom: any, message: any): void;
    }
    export class Field {
        constructor(options: any);
        read(dom: any): any;
        validateType(_value: any): void;
        validate(value: any): any;
        clean(value: any): any;
    }
    export class TextField extends Field {
        render(pm: ProseMirror): HTMLAnchorElement;
    }
    export class SelectField extends Field {
        render(pm: ProseMirror): HTMLAnchorElement;
    }
    export function openPrompt(pm: ProseMirror, content: any, options: any): {
        close: () => void;
    };
}

declare module 'prosemirror/dist/schema-basic' {
    import { Block, Inline, Text, Attribute, MarkType, Schema } from 'prosemirror/dist/model';
    export class Doc extends Block {
    }
    export class BlockQuote extends Block {
        matchDOMTag: {
            'blockquote': any;
        };
        toDOM(): (string | number)[];
    }
    export class OrderedList extends Block {
        attrs: {
            order: Attribute;
        };
        matchDOMTag: {
            'ol': (dom: any) => {
                order: number;
            };
        };
        toDOM(node: any): (string | {
            start: any;
        } | number)[];
    }
    export class BulletList extends Block {
        matchDOMTag: {
            'ul': any;
        };
        toDOM(): (string | number)[];
    }
    export class ListItem extends Block {
        matchDOMTag: {
            'li': any;
        };
        toDOM(): (string | number)[];
    }
    export class HorizontalRule extends Block {
        matchDOMTag: {
            'hr': any;
        };
        toDOM(): (string | string[])[];
    }
    export class Heading extends Block {
        attrs: {
            level: Attribute;
        };
        maxLevel: number;
        matchDOMTag: {
            'h1': {
                level: number;
            };
            'h2': {
                level: number;
            };
            'h3': {
                level: number;
            };
            'h4': {
                level: number;
            };
            'h5': {
                level: number;
            };
            'h6': {
                level: number;
            };
        };
        toDOM(node: any): (string | number)[];
    }
    export class CodeBlock extends Block {
        isCode: boolean;
        matchDOMTag: {
            'pre': {
                preserveWhitespace: boolean;
            }[];
        };
        toDOM(): (string | (string | number)[])[];
    }
    export class Paragraph extends Block {
        matchDOMTag: {
            'p': any;
        };
        toDOM(): (string | number)[];
    }
    export class Image extends Inline {
        attrs: {
            src: Attribute;
            alt: Attribute;
            title: Attribute;
        };
        draggable: boolean;
        matchDOMTag: {
            'img[src]': (dom: any) => {
                src: any;
                title: any;
                alt: any;
            };
        };
        toDOM(node: any): any[];
    }
    export class HardBreak extends Inline {
        selectable: boolean;
        isBR: boolean;
        matchDOMTag: {
            'br': any;
        };
        toDOM(): string[];
    }
    export class EmMark extends MarkType {
        matchDOMTag: {
            'i': any;
            'em': any;
        };
        matchDOMStyle: {
            'font-style': (value: any) => any;
        };
        toDOM(): string[];
    }
    export class StrongMark extends MarkType {
        matchDOMTag: {
            'b': any;
            'strong': any;
        };
        matchDOMStyle: {
            'font-weight': (value: any) => any;
        };
        toDOM(): string[];
    }
    export class LinkMark extends MarkType {
        attrs: {
            href: Attribute;
            title: Attribute;
        };
        matchDOMTag: {
            'a[href]': (dom: any) => {
                href: any;
                title: any;
            };
        };
        toDOM(node: any): any[];
    }
    export class CodeMark extends MarkType {
        isCode: boolean;
        matchDOMTag: {
            'code': any;
        };
        toDOM(): string[];
    }
    export const schema: Schema;
}

declare module 'prosemirror/dist/tooltip' {
    export class Tooltip {
        constructor(wrapper: any, options: any);
        detach(): void;
        getSize(node: any): {
            width: any;
            height: any;
        };
        open(node: any, pos: any): void;
        close(): void;
    }
}

declare module 'prosemirror/dist/transform/transform' {
    import { Node } from 'prosemirror/dist/model/node';
    import { Mark } from 'prosemirror/dist/model/mark';
    import { Slice } from 'prosemirror/dist/model/replace';
    import { MarkType, NodeType } from 'prosemirror/dist/model/schema';
    import { NodeRange } from 'prosemirror/dist/model/resolvedpos';
    import { Step } from 'prosemirror/dist/transform/step';
    export class Transform {
      constructor(doc: Node)
      addMark(from: number, to: number, mark: Mark|MarkType): this;
      removeMark(from: number, to: number, mark?: Mark|MarkType): this;
      delete(from: number, to: number): this;
      replace(from: number, to: number, slice: Slice): this;
      replaceWith(from: number, to: number, content: any): this;
      insert(pos: number, content: any): this;
      insertText(pos: number, text: string) : this;
      insertInline(pos: number, node: Node) : this;
      doc: Node;
      lift(range: NodeRange, target: number): this;
      map(pos: number, bias?: number): number;
      setNodeType(pos: number, type?: NodeType, attrs?: Object): this;
      step(step: Step): this;
    }
    export interface TransformError {}
}

declare module 'prosemirror/dist/transform/mark_step' {
    export const { AddMarkStep, RemoveMarkStep }: any;
}

declare module 'prosemirror/dist/transform' {
    export { Transform, TransformError } from 'prosemirror/dist/transform/transform';
    export { Step, StepResult } from 'prosemirror/dist/transform/step';
    export { joinPoint, joinable, canSplit, insertPoint, liftTarget, findWrapping } from 'prosemirror/dist/transform/structure';
    export { PosMap, MapResult, Remapping, mapThrough, mapThroughResult } from 'prosemirror/dist/transform/map';
    export { AddMarkStep, RemoveMarkStep } from 'prosemirror/dist/transform/mark_step';
    export { ReplaceStep, ReplaceAroundStep } from 'prosemirror/dist/transform/replace_step';
}

declare module 'prosemirror/dist/transform/map' {
    export class MapResult {
        constructor(pos: any, deleted?: boolean, recover?: any);
    }
    export class PosMap {
        constructor(ranges: any, inverted?: boolean);
        recover(value: any): any;
        mapResult(pos: any, bias: any): any;
        map(pos: any, bias: any): any;
        _map(pos: any, bias: any, simple: any): any;
        touches(pos: any, recover: any): boolean;
        invert(): PosMap;
        toString(): string;
    }
    export class Remapping {
        constructor(head?: any[], tail?: any[]);
        addToFront(map: any, corr: any): number;
        addToBack(map: any, corr: any): number;
        get(id: any): any;
        mapResult(pos: any, bias: any): any;
        map(pos: any, bias: any): any;
        _map(pos: any, bias: any, simple: any): any;
        toString(): string;
    }
    export function mapThrough(mappables: any, pos: any, bias: any, start: any): any;
    export function mapThroughResult(mappables: any, pos: any, bias: any, start: any): MapResult;
}

declare module 'prosemirror/dist/transform/mark' {

}

declare module 'prosemirror/dist/transform/replace_step' {
    import { Step, StepResult } from 'prosemirror/dist/transform/step';
    import { PosMap } from 'prosemirror/dist/transform/map';
    export class ReplaceStep extends Step {
        constructor(from: number, to: number, slice: any, structure?: any);
        apply(doc: any): StepResult;
        posMap(): PosMap;
        invert(doc: any): any;
        map(mapping: any): any;
        static fromJSON(schema: any, json: any): any;
    }
    export class ReplaceAroundStep extends Step {
        constructor(from: number, to: number, gapFrom: any, gapTo: any, slice: any, insert: any, structure: any);
        apply(doc: any): StepResult;
        posMap(): PosMap;
        invert(doc: any): ReplaceAroundStep;
        map(mapping: any): ReplaceAroundStep;
        static fromJSON(schema: any, json: any): ReplaceAroundStep;
    }
}

declare module 'prosemirror/dist/transform/replace' {

}

declare module 'prosemirror/dist/transform/step' {
    export class Step {
        apply(_doc: any): void;
        posMap(): any;
        invert(_doc: any): void;
        map(_mapping: any): void;
        toJSON(): {
            stepType: any;
        };
        static fromJSON(schema: any, json: any): any;
        static jsonID(id: any, stepClass: any): any;
    }
    export class StepResult {
        constructor(doc: any, failed: any);
        static ok(doc: any): StepResult;
        static fail(message: any): StepResult;
        static fromReplace(doc: any, from: number, to: number, slice: any): StepResult;
    }
}

declare module 'prosemirror/dist/transform/structure' {
    export function liftTarget(range: any): any;
    export function findWrapping(range: any, nodeType: any, attrs: any, innerRange?: any): any;
    export function canSplit(doc: any, pos: any, depth: number, typeAfter: any, attrsAfter: any): any;
    export function joinable(doc: any, pos: any): any;
    export function joinPoint(doc: any, pos: any, dir?: number): any;
    export function insertPoint(doc: any, pos: any, nodeType: any, attrs: any): any;
}

declare module 'prosemirror/dist/util/browser' {
    export const mac: boolean;
    export const ie: boolean;
    export const ie_version: any;
    export const gecko: boolean;
    export const ios: boolean;
}

declare module 'prosemirror/dist/util/char' {
    export function isWordChar(ch: any): boolean;
    export function charCategory(ch: any): string;
    export function isExtendingChar(ch: any): boolean;
}

declare module 'prosemirror/dist/util/comparedeep' {
    export function compareDeep(a: any, b: any): boolean;
}

declare module 'prosemirror/dist/util/dom' {
    export function elt(tag: any, attrs: any, ...args: any[]): HTMLAnchorElement;
    export function requestAnimationFrame(f: any): any;
    export function cancelAnimationFrame(handle: any): any;
    export function contains(parent: any, child: any): any;
    export function insertCSS(css: any): void;
    export function ensureCSSAdded(): void;
}

declare module 'prosemirror/dist/util/error' {
    export function ProseMirrorError(message: any): void;
}

declare module 'prosemirror/dist/util/map' {
    export const Map: any;
}

declare module 'prosemirror/dist/util/obj' {
    export function copyObj(obj: any, base: any): any;
}

declare module 'prosemirror/dist/util/orderedmap' {
    export class OrderedMap {
        constructor(content: any);
        find(key: any): number;
        get(key: any): any;
        update(key: any, value: any, newKey: any): OrderedMap;
        remove(key: any): OrderedMap;
        addToStart(key: any, value: any): OrderedMap;
        addToEnd(key: any, value: any): OrderedMap;
        addBefore(place: any, key: any, value: any): OrderedMap;
        forEach(f: (key: any, value: any) => void): void;
        prepend(map: any): OrderedMap;
        append(map: any): OrderedMap;
        subtract(map: any): this;
        size: number;
        static from(value: any): any;
    }
}

declare module 'prosemirror/dist/test/build';
