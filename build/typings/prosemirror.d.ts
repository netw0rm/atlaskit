declare module 'prosemirror/dist/collab' {
    import { rebaseSteps } from 'prosemirror/dist/collab/rebase';
    export { rebaseSteps };
    const collabEditing: any;
    export { collabEditing };
}

declare module 'prosemirror/dist/collab/rebase' {
    import { Remapping, Transform } from 'prosemirror/dist/transform';
    function rebaseSteps(doc: any, forward: any, steps: any, maps: any): {
        doc: any;
        transform: any; mapping: Remapping;
        positions: any[];
    };
    export { rebaseSteps };
}

declare module 'prosemirror/dist/commands-list' {
    export function wrapInList(nodeType: any, attrs?: any): (pm: any, apply?: any) => boolean;
    export function splitListItem(nodeType: any): (pm: any) => boolean;
    export function liftListItem(nodeType: any): (pm: any, apply: any) => boolean;
    export function sinkListItem(nodeType: any): (pm: any, apply: any) => boolean;
}

declare module 'prosemirror/dist/commands-table' {
    export function addColumnBefore(pm: any, apply: any): boolean;
    export function addColumnAfter(pm: any, apply: any): boolean;
    export function removeColumn(pm: any, apply: any): boolean;
    export function addRowBefore(pm: any, apply: any): boolean;
    export function addRowAfter(pm: any, apply: any): boolean;
    export function removeRow(pm: any, apply: any): boolean;
    export function selectNextCell(pm: any, apply: any): boolean;
    export function selectPreviousCell(pm: any, apply: any): boolean;
}

declare module 'prosemirror/dist/edit/commands' {
    namespace commands {
      export * from 'prosemirror/dist/commands-list';
      export * from 'prosemirror/dist/commands-table';
      export function chainCommands(...commands: any[]): (pm: any, apply: any) => any;
      export function createParagraphNear(pm: any, apply: any): boolean;
      export function deleteCharAfter(pm: any, apply: any): boolean;
      export function deleteCharBefore(pm: any, apply: any): boolean;
      export function deleteSelection(pm: any, apply: any): boolean;
      export function deleteWordAfter(pm: any, apply: any): boolean;
      export function deleteWordBefore(pm: any, apply: any): boolean;
      export function joinBackward(pm: any, apply: any): boolean;
      export function joinDown(pm: any, apply: any): boolean;
      export function joinForward(pm: any, apply: any): boolean;
      export function joinUp(pm: any, apply: any): boolean;
      export function lift(pm: any, apply: any): boolean;
      export function liftEmptyBlock(pm: any, apply: any): boolean;
      export function newlineInCode(pm: any, apply: any): boolean;
      export function redo(pm: any, apply: any): boolean;
      export function selectParentNode(pm: any, apply: any): boolean;
      export function setBlockType(nodeType: any, attrs?: any): (pm: any, apply?: any) => boolean;
      export function splitBlock(pm: any, apply: any): boolean;
      export function toggleMark(markType: any, attrs?: any): (pm: any, apply?: any) => boolean;
      export function undo(pm: any, apply: any): boolean;
      export function wrapIn(nodeType: any, attrs: any): (pm: any, apply: any) => boolean;
      export let baseKeymap: any;
    }
}

declare module 'prosemirror/dist/edit/capturekeys' {
    const captureKeys: any;
    export { captureKeys };
}

declare module 'prosemirror/dist/edit/css' {

}

declare module 'prosemirror/dist/edit/domchange' {
    function readInputChange(pm: any): boolean;
    export { readInputChange };
    function readCompositionChange(pm: any, margin: any): boolean;
    export { readCompositionChange };
}

declare module 'prosemirror/dist/edit/dompos' {
    function posFromDOM(dom: any, domOffset: any, bias?: number): any;
    export { posFromDOM };
    function childContainer(dom: any): any;
    export { childContainer };
    function DOMFromPos(pm: any, pos: any, loose?: any): {
        node: any;
        offset: any;
    };
    export { DOMFromPos };
    function DOMFromPosFromEnd(pm: any, pos: any): {
        node: any;
        offset: any;
    };
    export { DOMFromPosFromEnd };
    function DOMAfterPos(pm: any, pos: any): any;
    export { DOMAfterPos };
    function scrollIntoView(pm: any, pos: any): void;
    export { scrollIntoView };
    function posAtCoords(pm: any, coords: any): {
        pos: any;
        inside: any;
    };
    export { posAtCoords };
    function coordsAtPos(pm: any, pos: any): {
        top: any;
        bottom: any;
        left: any;
        right: any;
    };
    export { coordsAtPos };
}

declare module 'prosemirror/dist/edit/draw' {
    const DIRTY_RESCAN: number, DIRTY_REDRAW: number;
    export { DIRTY_RESCAN };
    export { DIRTY_REDRAW };
    function draw(pm: any, doc: any): void;
    export { draw };
    function redraw(pm: any, dirty: any, doc: any, prev: any): void;
    export { redraw };
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
  export class TextSelection extends Selection {}
  export class NodeSelection extends Selection {}
}

declare module 'prosemirror/dist/edit/range' {
  export interface Selection {}
  export interface TextSelection {}
  export interface NodeSelection {}
  export interface MarkedRange {}
  export interface MarkedRange {}
}

declare module 'prosemirror/dist/edit' {
    export { ProseMirror } from 'prosemirror/dist/edit/main';
    export { Selection, TextSelection, NodeSelection } from 'prosemirror/dist/edit/selection';
    export { MarkedRange } from 'prosemirror/dist/edit/range';
    export { Plugin } from 'prosemirror/dist/edit/plugin';
    export const Keymap: any;
}

declare module 'prosemirror/dist/edit/input' {
    class Input {
        constructor(pm: any);
        dispatchKey(name: any, e: any): boolean;
        insertText(from: any, to: any, text: any, findSelection: any): void;
        composing: any;
        startComposition(dataLen: any, realStart: any): void;
        applyComposition(andFlush: any): void;
    }
    export { Input };
}

declare module 'prosemirror/dist/edit/main' {
    import { MarkedRange } from 'prosemirror/dist/edit/range';
    import { EditorTransform } from 'prosemirror/dist/edit/transform';
    import { UpdateScheduler } from 'prosemirror/dist/edit/update';
    import { Schema } from 'prosemirror/dist/model/schema';
    import { Slice } from 'prosemirror/dist/model';

    interface Subscription<Handler> {
      add(handler: Handler): void;
      dispatch(...args: any[]): any;
    }

    type AnySubscription = Subscription<(...args: any[]) => any>;

    interface On {
      transformPasted: Subscription<(slice: Slice) => any>;
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

    class ProseMirror {
        constructor(opts: any);
        on: On;
        schema: Schema;
        nodes: any;
        input: any;
        doc: any;
        sel: any;
        content: HTMLElement;
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
        markRange(from: any, to: any, options: any): MarkedRange;
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
        markRangeDirty(from: any, to: any, doc?: any): void;
        markAllDirty(): void;
        translate(string: any): any;
        scheduleDOMUpdate(f: any): void;
        unscheduleDOMUpdate(f: any): void;
        updateScheduler(subscriptions: any, start: any): UpdateScheduler;
    }
    export { ProseMirror };
}

declare module 'prosemirror/dist/edit/options' {
    function parseOptions(obj: any): any;
    export { parseOptions };
}

declare module 'prosemirror/dist/edit/plugin' {
    import { ProseMirror } from 'prosemirror/dist/edit';
    class Plugin<S> {
        constructor(state: { new(...args: any[]): S; }, options?: any, prop?: any);
        get(pm: ProseMirror): S;
        attach(pm: ProseMirror): any;
        detach(pm: ProseMirror): void;
        ensure(pm: ProseMirror): any;
        config(options: any): this;
    }
    export { Plugin };
}

declare module 'prosemirror/dist/edit/transform' {
    import { Transform } from 'prosemirror/dist/transform';
    class EditorTransform extends Transform {
        constructor(pm: any);
        apply(options?: any): any;
        applyAndScroll(): any;
        selection: any;
        setSelection(selection: any): this;
        replaceSelection(node: any, inheritMarks: any): this;
        deleteSelection(): any;
        typeText(text: any): this;
    }
    export { EditorTransform };
}

declare module 'prosemirror/dist/edit/update' {
    class EditorScheduler {
        constructor(pm: any);
        set(f: any): void;
        unset(f: any): void;
        force(): void;
        onFlush(): void;
    }
    export { EditorScheduler };
    class UpdateScheduler {
        constructor(pm: any, subscriptions: any, start: any);
        detach(): void;
        onEvent(): void;
        force(): void;
    }
    export { UpdateScheduler };
}

declare module 'prosemirror/dist/example-setup' {
    import { buildMenuItems } from 'prosemirror/dist/example-setup/menu';
    export { buildMenuItems };
    import { buildKeymap } from 'prosemirror/dist/example-setup/keymap';
    export { buildKeymap };
    export var exampleSetup: any;
    function buildInputRules(schema: any): any[];
    export { buildInputRules };
}

declare module 'prosemirror/dist/example-setup/keymap' {
    function buildKeymap(schema: any, mapKeys: any): any;
    export { buildKeymap };
}

declare module 'prosemirror/dist/example-setup/menu' {
    function buildMenuItems(schema: any): {};
    export { buildMenuItems };
}

declare module 'prosemirror/dist/example-setup/style' {
    const cls: string;
    export { cls as className };
}

declare module 'prosemirror/dist/history' {
    class History {
        constructor(pm: any, options: any);
        resetState(): void;
        detach(pm: any): void;
        recordTransform(transform: any, selection: any, options: any): void;
        undo(): any;
        redo(): any;
        undoDepth: any;
        redoDepth: any;
        cut(): void;
        shift(from: any, to: any): any;
        applyIgnoring(transform: any, selection: any): void;
        getVersion(): any;
        isAtVersion(version: any): boolean;
        backToVersion(version: any): boolean;
        rebased(newMaps: any, rebasedTransform: any, positions: any): void;
    }
    export { History };
    const historyPlugin: any;
    export { historyPlugin };
}

declare module 'prosemirror/dist/inputrules' {
    export { InputRule, inputRules, InputRules } from 'prosemirror/dist/inputrules/inputrules';
    export { emDash, ellipsis, openDoubleQuote, closeDoubleQuote, openSingleQuote, closeSingleQuote, smartQuotes, allInputRules } from 'prosemirror/dist/inputrules/rules';
    export { wrappingInputRule, textblockTypeInputRule, blockQuoteRule, orderedListRule, bulletListRule, codeBlockRule, headingRule } from 'prosemirror/dist/inputrules/util';
}

declare module 'prosemirror/dist/inputrules/inputrules' {
    class InputRule {
        constructor(match: any, filter: any, handler: any);
    }
    export { InputRule };
    class InputRules {
        constructor(pm: any, options: any);
        detach(): void;
        addRule(rule: any): void;
        removeRule(rule: any): boolean;
        onTextInput(text: any): void;
        backspace(): boolean;
    }
    export { InputRules };
    const inputRules: any;
    export { inputRules };
}

declare module 'prosemirror/dist/inputrules/rules' {
    import { InputRule } from 'prosemirror/dist/inputrules/inputrules';
    const emDash: InputRule;
    export { emDash };
    const ellipsis: InputRule;
    export { ellipsis };
    const openDoubleQuote: InputRule;
    export { openDoubleQuote };
    const closeDoubleQuote: InputRule;
    export { closeDoubleQuote };
    const openSingleQuote: InputRule;
    export { openSingleQuote };
    const closeSingleQuote: InputRule;
    export { closeSingleQuote };
    const smartQuotes: InputRule[];
    export { smartQuotes };
    const allInputRules: InputRule[];
    export { allInputRules };
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
    class MarkdownParser {
        constructor(schema: any, tokenizer: any, tokens: any);
        parse(text: any): any;
    }
    export { MarkdownParser };
    const defaultMarkdownParser: MarkdownParser;
    export { defaultMarkdownParser };
}

declare module 'prosemirror/dist/markdown' {
    export { defaultMarkdownParser, MarkdownParser } from 'prosemirror/dist/markdown/from_markdown';
    export { MarkdownSerializer, defaultMarkdownSerializer, MarkdownSerializerState } from 'prosemirror/dist/markdown/to_markdown';
}

declare module 'prosemirror/dist/markdown/to_markdown' {
    class MarkdownSerializer {
        constructor(nodes: any, marks: any);
        serialize(content: any, options: any): any;
    }
    export { MarkdownSerializer };
    const defaultMarkdownSerializer: MarkdownSerializer;
    export { defaultMarkdownSerializer };
    class MarkdownSerializerState {
        constructor(nodes: any, marks: any, options: any);
        flushClose(size: any): void;
        wrapBlock(delim: any, firstDelim: any, node: any, f: any): void;
        atBlank(): boolean;
        ensureNewLine(): void;
        write(content: any): void;
        closeBlock(node: any): void;
        text(text: any, escape: any): void;
        render(node: any): void;
        renderContent(parent: any): void;
        renderInline(parent: any): void;
        renderList(node: any, delim: any, firstDelim: any): void;
        esc(str: any, startOfLine: any): any;
        quote(str: any): string;
        repeat(str: any, n: any): string;
        markString(mark: any, open: any): any;
    }
    export { MarkdownSerializerState };
}

declare module 'prosemirror/dist/menu/icons' {
    function getIcon(icon: any): HTMLDivElement;
    export { getIcon };
}

declare module 'prosemirror/dist/menu' {
    export { MenuItem, Dropdown, DropdownSubmenu, renderGrouped, icons, joinUpItem, liftItem, selectParentNodeItem, undoItem, redoItem, toggleMarkItem, insertItem, wrapItem, blockTypeItem } from 'prosemirror/dist/menu/menu';
    export { menuBar } from 'prosemirror/dist/menu/menubar';
    export { tooltipMenu } from 'prosemirror/dist/menu/tooltipmenu';
}

declare module 'prosemirror/dist/menu/menu' {
    class MenuItem {
        constructor(spec: any);
        render(pm: any): any;
    }
    export { MenuItem };
    class Dropdown {
        constructor(content: any, options: any);
        render(pm: any): HTMLAnchorElement;
        expand(pm: any, dom: any, items: any): () => boolean;
    }
    export { Dropdown };
    class DropdownSubmenu {
        constructor(content: any, options: any);
        render(pm: any): HTMLAnchorElement;
    }
    export { DropdownSubmenu };
    function renderGrouped(pm: any, content: any): DocumentFragment;
    export { renderGrouped };
    const icons: {
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
    export { icons };
    const joinUpItem: MenuItem;
    export { joinUpItem };
    const liftItem: MenuItem;
    export { liftItem };
    const selectParentNodeItem: MenuItem;
    export { selectParentNodeItem };
    const undoItem: MenuItem;
    export { undoItem };
    const redoItem: MenuItem;
    export { redoItem };
    function toggleMarkItem(markType: any, options: any): MenuItem;
    export { toggleMarkItem };
    function insertItem(nodeType: any, options: any): MenuItem;
    export { insertItem };
    function wrapItem(nodeType: any, options: any): MenuItem;
    export { wrapItem };
    function blockTypeItem(nodeType: any, options: any): MenuItem;
    export { blockTypeItem };
}

declare module 'prosemirror/dist/menu/menubar' {
    const menuBar: any;
    export { menuBar };
}

declare module 'prosemirror/dist/menu/tooltipmenu' {
    const tooltipMenu: any;
    export { tooltipMenu };
}

declare module 'prosemirror/dist/model/diff' {
    function findDiffStart(a: any, b: any, pos: any): any;
    export { findDiffStart };
    function findDiffEnd(a: any, b: any, posA: any, posB: any): any;
    export { findDiffEnd };
}

declare module 'prosemirror/dist/model/fragment' {
    class Fragment {
        constructor(content: any, size?: any);
        toString(): string;
        toStringInner(): any;
        nodesBetween(from: any, to: any, f: any, nodeStart: any, parent: any): void;
        textBetween(from: any, to: any, separator: any): string;
        cut(from: any, to: any): Fragment;
        cutByIndex(from: any, to: any): any;
        append(other: any): any;
        replaceChild(index: any, node: any): Fragment;
        addToStart(node: any): Fragment;
        addToEnd(node: any): Fragment;
        toJSON(): any;
        static fromJSON(schema: any, value: any): any;
        static fromArray(array: any): any;
        eq(other: any): boolean;
        static from(nodes: any): any;
        firstChild: any;
        lastChild: any;
        childCount: any;
        child(index: any): any;
        offsetAt(index: any): number;
        maybeChild(index: any): any;
        forEach(f: any): void;
        findDiffStart(other: any, pos?: number): any;
        findDiffEnd(other: any, pos?: any, otherPos?: any): any;
        findIndex(pos: any, round?: number): {
            index: number;
            offset: number;
        };
        toDOM(options?: {}): any;
    }
    export { Fragment };
}

declare module 'prosemirror/dist/model/from_dom' {
    function parseDOM(schema: any, dom: any, options: any): any;
    export { parseDOM };
    function parseDOMInContext($context: any, dom: any, options?: {}): any;
    export { parseDOMInContext };
}

declare module 'prosemirror/dist/model/replace' {
    export const { ReplaceError }: any;
    export class Slice {
        constructor(content: any, openLeft: number, openRight: number, possibleParent?: any)
        content: any;
        openLeft: number;
        openRight: number;
        possibleParent: any;
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
    class Mark {
        constructor(type: any, attrs: any);
        toJSON(): {
            _: any;
        };
        type: MarkType;
        attrs: any;
        addToSet(set: any): any;
        removeFromSet(set: any): any;
        isInSet(set: any): boolean;
        eq(other: any): boolean;
        static sameSet(a: any, b: any): boolean;
        static setFrom(marks: any): any;
    }
    export { Mark };
}

declare module 'prosemirror/dist/model/node' {
    import { ResolvedPos } from 'prosemirror/dist/model/resolvedpos';
    class Node {
        constructor(type: any, attrs: any, content: any, marks: any);
        content: any;
        nodeSize: any;
        childCount: any;
        child(index: any): any;
        maybeChild(index: any): any;
        forEach(f: any): void;
        textBetween(from: any, to: any, separator: any): any;
        firstChild: any;
        lastChild: any;
        eq(other: any): any;
        sameMarkup(other: any): boolean;
        hasMarkup(type: any, attrs: any, marks: any): boolean;
        copy(content?: any): any;
        mark(marks: any): any;
        cut(from: any, to: any): any;
        slice(from: any, to?: any): any;
        replace(from: any, to: any, slice: any): any;
        nodeAt(pos: any): this;
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
        nodesBetween(from: any, to: any, f: any, pos?: number): void;
        descendants(f: any): void;
        resolve(pos: any): any;
        resolveNoCache(pos: any): ResolvedPos;
        marksAt(pos: any): any;
        rangeHasMark(from: any, to: any, type: any): boolean;
        isBlock: any;
        isTextblock: any;
        isInline: any;
        isText: any;
        toString(): any;
        type: any;
        attrs: any;
        marks: any;
        textContent: string;
        contentMatchAt(index: any): any;
        canReplace(from: any, to: any, replacement: any, start: any, end: any): any;
        canReplaceWith(from: any, to: any, type: any, attrs: any, marks: any): any;
        canAppend(other: any): any;
        defaultContentType(at: any): any;
        toJSON(): {
            type: any;
        };
        static fromJSON(schema: any, json: any): any;
        toDOM(options?: {}): any;
    }
    export { Node };
    class TextNode extends Node {
        constructor(type: any, attrs: any, content: any, marks: any);
        toString(): any;
        textContent: any;
        textBetween(from: any, to: any): any;
        nodeSize: any;
        mark(marks: any): TextNode;
        cut(from?: number, to?: any): any;
        eq(other: any): boolean;
        toJSON(): {
            type: any;
        };
    }
    export { TextNode };
}

declare module 'prosemirror/dist/model/resolvedpos' {
    class ResolvedPos {
        constructor(pos: any, path: any, parentOffset: any);
        depth: number;
        pos: number;
        parentOffset: number;
        resolveDepth(val: any): any;
        parent: any;
        node(depth: any): any;
        index(depth: any): any;
        indexAfter(depth: any): any;
        start(depth: any): any;
        end(depth: any): any;
        before(depth: any): any;
        after(depth: any): any;
        atNodeBoundary: boolean;
        nodeAfter: any;
        nodeBefore: any;
        sameDepth(other: any): number;
        blockRange(other: this, pred: any): any;
        sameParent(other: any): boolean;
        toString(): string;
        plusOne(): ResolvedPos;
        static resolve(doc: any, pos: any): ResolvedPos;
        static resolveCached(doc: any, pos: any): any;
    }
    export { ResolvedPos };
    class NodeRange {
        constructor($from: any, $to: any, depth: any);
        start: any;
        end: any;
        parent: any;
        startIndex: any;
        endIndex: any;
    }
    export { NodeRange };
}

declare module 'prosemirror/dist/model/schema' {
    import { Node, TextNode } from 'prosemirror/dist/model/node';
    class NodeType {
        constructor(name: any, schema: any);
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
        create(attrs: any, content: any, marks: any): Node;
        createChecked(attrs: any, content: any, marks: any): Node;
        createAndFill(attrs: any, content: any, marks: any): Node;
        validContent(content: any, attrs: any): any;
        static compile(nodes: any, schema: any): any;
        toDOM(_: any): void;
        matchDOMTag: any;
    }
    export { NodeType };
    class Block extends NodeType {
        isBlock: boolean;
        isTextblock: any;
    }
    export { Block };
    class Inline extends NodeType {
        isInline: boolean;
    }
    export { Inline };
    class Text extends Inline {
        selectable: boolean;
        isText: boolean;
        create(attrs: any, content: any, marks: any): TextNode;
        toDOM(node: any): any;
    }
    export { Text };
    class Attribute {
        constructor(options?: {});
        isRequired: boolean;
    }
    export { Attribute };
    class MarkType {
        constructor(name: any, rank: any, schema: any);
        name: string;
        schema: Schema;
        inclusiveRight: boolean;
        create(attrs: any): any;
        static compile(marks: any, schema: any): any;
        removeFromSet(set: any): any;
        isInSet(set: any): any;
        toDOM(_: any): void;
        matchDOMTag: any;
        matchDOMStyle: any;
    }
    export { MarkType };
    class Schema {
        constructor(spec: any, data?: any);
        marks: any;
        nodes: any;
        nodeSpec: any;
        node(type: any, attrs?: any, content?: any, marks?: any): any;
        text(text: any, marks?: any): any;
        mark(name: any, attrs?: any): any;
        nodeFromJSON(json: any): any;
        markFromJSON(json: any): any;
        nodeType(name: any): any;
        parseDOM(dom: any, options?: {}): any;
    }
    export { Schema };
}

declare module 'prosemirror/dist/model/to_dom' {
    function fragmentToDOM(fragment: any, options: any): any;
    export { fragmentToDOM };
    function nodeToDOM(node: any, options: any): any;
    export { nodeToDOM };
}

declare module 'prosemirror/dist/prompt' {
    class FieldPrompt {
        constructor(pm: any, title: any, fields: any);
        close(): void;
        open(callback: any): void;
        values(): any;
        prompt(): {
            close: () => void;
        };
        reportInvalid(dom: any, message: any): void;
    }
    export { FieldPrompt };
    class Field {
        constructor(options: any);
        read(dom: any): any;
        validateType(_value: any): void;
        validate(value: any): any;
        clean(value: any): any;
    }
    export { Field };
    class TextField extends Field {
        render(pm: any): HTMLAnchorElement;
    }
    export { TextField };
    class SelectField extends Field {
        render(pm: any): HTMLAnchorElement;
    }
    export { SelectField };
    function openPrompt(pm: any, content: any, options: any): {
        close: () => void;
    };
    export { openPrompt };
}

declare module 'prosemirror/dist/schema-basic' {
    import { Block, Inline, Text, Attribute, MarkType } from 'prosemirror/dist/model';
    export { Text };
    class Doc extends Block {
    }
    export { Doc };
    class BlockQuote extends Block {
        matchDOMTag: {
            'blockquote': any;
        };
        toDOM(): (string | number)[];
    }
    export { BlockQuote };
    class OrderedList extends Block {
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
    export { OrderedList };
    class BulletList extends Block {
        matchDOMTag: {
            'ul': any;
        };
        toDOM(): (string | number)[];
    }
    export { BulletList };
    class ListItem extends Block {
        matchDOMTag: {
            'li': any;
        };
        toDOM(): (string | number)[];
    }
    export { ListItem };
    class HorizontalRule extends Block {
        matchDOMTag: {
            'hr': any;
        };
        toDOM(): (string | string[])[];
    }
    export { HorizontalRule };
    class Heading extends Block {
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
    export { Heading };
    class CodeBlock extends Block {
        isCode: boolean;
        matchDOMTag: {
            'pre': {
                preserveWhitespace: boolean;
            }[];
        };
        toDOM(): (string | (string | number)[])[];
    }
    export { CodeBlock };
    class Paragraph extends Block {
        matchDOMTag: {
            'p': any;
        };
        toDOM(): (string | number)[];
    }
    export { Paragraph };
    class Image extends Inline {
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
    export { Image };
    class HardBreak extends Inline {
        selectable: boolean;
        isBR: boolean;
        matchDOMTag: {
            'br': any;
        };
        toDOM(): string[];
    }
    export { HardBreak };
    class EmMark extends MarkType {
        matchDOMTag: {
            'i': any;
            'em': any;
        };
        matchDOMStyle: {
            'font-style': (value: any) => any;
        };
        toDOM(): string[];
    }
    export { EmMark };
    class StrongMark extends MarkType {
        matchDOMTag: {
            'b': any;
            'strong': any;
        };
        matchDOMStyle: {
            'font-weight': (value: any) => any;
        };
        toDOM(): string[];
    }
    export { StrongMark };
    class LinkMark extends MarkType {
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
    export { LinkMark };
    class CodeMark extends MarkType {
        isCode: boolean;
        matchDOMTag: {
            'code': any;
        };
        toDOM(): string[];
    }
    export { CodeMark };
    const schema: any;
    export { schema };
}

declare module 'prosemirror/dist/tooltip' {
    class Tooltip {
        constructor(wrapper: any, options: any);
        detach(): void;
        getSize(node: any): {
            width: any;
            height: any;
        };
        open(node: any, pos: any): void;
        close(): void;
    }
    export { Tooltip };
}

declare module 'prosemirror/dist/transform/transform' {
    import { Node } from 'prosemirror/dist/model/node';
    import { Mark } from 'prosemirror/dist/model/mark';
    import { Slice } from 'prosemirror/dist/model/replace';
    import { MarkType } from 'prosemirror/dist/model/schema';
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
    class MapResult {
        constructor(pos: any, deleted?: boolean, recover?: any);
    }
    export { MapResult };
    class PosMap {
        constructor(ranges: any, inverted?: boolean);
        recover(value: any): any;
        mapResult(pos: any, bias: any): any;
        map(pos: any, bias: any): any;
        _map(pos: any, bias: any, simple: any): any;
        touches(pos: any, recover: any): boolean;
        invert(): PosMap;
        toString(): string;
    }
    export { PosMap };
    class Remapping {
        constructor(head?: any[], tail?: any[]);
        addToFront(map: any, corr: any): number;
        addToBack(map: any, corr: any): number;
        get(id: any): any;
        mapResult(pos: any, bias: any): any;
        map(pos: any, bias: any): any;
        _map(pos: any, bias: any, simple: any): any;
        toString(): string;
    }
    export { Remapping };
    function mapThrough(mappables: any, pos: any, bias: any, start: any): any;
    export { mapThrough };
    function mapThroughResult(mappables: any, pos: any, bias: any, start: any): MapResult;
    export { mapThroughResult };
}

declare module 'prosemirror/dist/transform/mark' {

}

declare module 'prosemirror/dist/transform/replace_step' {
    import { Step, StepResult } from 'prosemirror/dist/transform/step';
    import { PosMap } from 'prosemirror/dist/transform/map';
    class ReplaceStep extends Step {
        constructor(from: any, to: any, slice: any, structure: any);
        apply(doc: any): StepResult;
        posMap(): PosMap;
        invert(doc: any): any;
        map(mapping: any): any;
        static fromJSON(schema: any, json: any): any;
    }
    export { ReplaceStep };
    class ReplaceAroundStep extends Step {
        constructor(from: any, to: any, gapFrom: any, gapTo: any, slice: any, insert: any, structure: any);
        apply(doc: any): StepResult;
        posMap(): PosMap;
        invert(doc: any): ReplaceAroundStep;
        map(mapping: any): ReplaceAroundStep;
        static fromJSON(schema: any, json: any): ReplaceAroundStep;
    }
    export { ReplaceAroundStep };
}

declare module 'prosemirror/dist/transform/replace' {

}

declare module 'prosemirror/dist/transform/step' {
    class Step {
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
    export { Step };
    class StepResult {
        constructor(doc: any, failed: any);
        static ok(doc: any): StepResult;
        static fail(message: any): StepResult;
        static fromReplace(doc: any, from: any, to: any, slice: any): StepResult;
    }
    export { StepResult };
}

declare module 'prosemirror/dist/transform/structure' {
    function liftTarget(range: any): any;
    export { liftTarget };
    function findWrapping(range: any, nodeType: any, attrs: any, innerRange?: any): any;
    export { findWrapping };
    function canSplit(doc: any, pos: any, depth: number, typeAfter: any, attrsAfter: any): any;
    export { canSplit };
    function joinable(doc: any, pos: any): any;
    export { joinable };
    function joinPoint(doc: any, pos: any, dir?: number): any;
    export { joinPoint };
    function insertPoint(doc: any, pos: any, nodeType: any, attrs: any): any;
    export { insertPoint };
}

declare module 'prosemirror/dist/util/browser' {
    var _default: {
        mac: boolean;
        ie: boolean;
        ie_version: any;
        gecko: boolean;
        ios: boolean;
    };
    export default _default;
}

declare module 'prosemirror/dist/util/char' {
    function isWordChar(ch: any): boolean;
    export { isWordChar };
    function charCategory(ch: any): string;
    export { charCategory };
    function isExtendingChar(ch: any): boolean;
    export { isExtendingChar };
}

declare module 'prosemirror/dist/util/comparedeep' {
    function compareDeep(a: any, b: any): boolean;
    export { compareDeep };
}

declare module 'prosemirror/dist/util/dom' {
    function elt(tag: any, attrs: any, ...args: any[]): HTMLAnchorElement;
    export { elt };
    function requestAnimationFrame(f: any): any;
    export { requestAnimationFrame };
    function cancelAnimationFrame(handle: any): any;
    export { cancelAnimationFrame };
    function contains(parent: any, child: any): any;
    export { contains };
    function insertCSS(css: any): void;
    export { insertCSS };
    function ensureCSSAdded(): void;
    export { ensureCSSAdded };
}

declare module 'prosemirror/dist/util/error' {
    function ProseMirrorError(message: any): void;
    export { ProseMirrorError };
}

declare module 'prosemirror/dist/util/map' {
    const Map: any;
    export { Map };
}

declare module 'prosemirror/dist/util/obj' {
    function copyObj(obj: any, base: any): any;
    export { copyObj };
}

declare module 'prosemirror/dist/util/orderedmap' {
    class OrderedMap {
        constructor(content: any);
        find(key: any): number;
        get(key: any): any;
        update(key: any, value: any, newKey: any): OrderedMap;
        remove(key: any): OrderedMap;
        addToStart(key: any, value: any): OrderedMap;
        addToEnd(key: any, value: any): OrderedMap;
        addBefore(place: any, key: any, value: any): OrderedMap;
        forEach(f: any): void;
        prepend(map: any): OrderedMap;
        append(map: any): OrderedMap;
        subtract(map: any): this;
        size: number;
        static from(value: any): any;
    }
    export { OrderedMap };
}

declare module 'prosemirror/dist/test/build';
