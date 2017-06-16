import CodeMirror from '../codemirror';
import { requireModes } from '../codemirror/utils';
import {
  browser,
  Selection,
  TextSelection,
  Schema,
  undo,
  redo,
  Node,
  EditorView,
  Fragment,
  NodeView,
} from '@atlaskit/editor-core';
import { findMode } from '../languageList';

const MOD = browser.mac ? 'Cmd' : 'Ctrl';

class CodeBlock {
  dom: HTMLElement;
  private node: Node;
  private view: EditorView;
  private getPos: any;
  private value: string;
  private selection: any;
  private cm: CodeMirror;
  private uniqueId: string;
  private updating: boolean = false;
  private schema: Schema<any, any>;
  private pluginState: any;

  constructor(node, view, getPos, schema, codeBlockStateKey) {
    this.node = node;
    this.view = view;
    this.getPos = getPos;
    this.schema = schema;
    this.value = node.textContent;
    this.selection = null;
    this.pluginState = codeBlockStateKey.getState(this.view.state);
    requireModes();
    this.cm = new CodeMirror(null, {
      value: this.value,
      mode: 'null',
      lineNumbers: true,
      lineWrapping: true,
      tabSize: 2,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      extraKeys: this.prepareExtraKeyMap(),
    });

    setTimeout(() => this.cm.refresh(), 20);

    this.dom = this.cm.getWrapperElement();

    this.updating = false;

    this.cm.on('changes', () => {
      if (!this.updating) {
        this.valueChanged();
        this.pluginState.update(this.view.state, this.view.docView, false);
      }
    });

    this.cm.on('focus', (cm, event) => {
      if (!this.updating) {
        this.forwardSelection();
      }
      this.pluginState.updateEditorFocused(true);
      this.pluginState.update(this.view.state, this.view.docView, true);
    });

    this.cm.on('mousedown', () => {
      this.pluginState.update(this.view.state, this.view.docView, true);
    });

    this.cm.on('blur', () => {
      this.pluginState.updateEditorFocused(false);
      this.pluginState.update(this.view.state, this.view.docView, true);
    });

    this.uniqueId = generateId();
    node.attrs['uniqueId'] = this.uniqueId;

    this.pluginState.subscribe(this.updateLanguage);
    this.pluginState.subscribeFocusHandler(this.focusCodeEditor);
  }

  updateLanguage = (state) => {
    const { language, uniqueId } = state;
    if (language && this.cm.getMode().name !== language && uniqueId === this.uniqueId) {
      this.setMode(language);
    }
  }

  focusCodeEditor = (state) => {
    const { uniqueId } = state;
    if (uniqueId === this.uniqueId) {
      this.cm.focus();
    }
  }

  prepareExtraKeyMap = () => {
    const keymap = {
      Up: () => this.maybeEscape('line', -1),
      Left: () => this.maybeEscape('char', -1),
      Down: () => this.maybeEscape('line', 1),
      Right: () => this.maybeEscape('char', 1),
      [`${MOD}-Z`]: () => undo(this.view.state, this.view.dispatch),
      'Enter': this.handleEnter,
    };
    if (browser.mac) {
      keymap[`Shift-${MOD}-Z`] = () => redo(this.view.state, this.view.dispatch);
    } else {
      keymap[`${MOD}-Y`] = () => redo(this.view.state, this.view.dispatch);
    }
    return CodeMirror.normalizeKeyMap(keymap);
  }

  findSelection() {
    return {
      head: this.cm.indexFromPos(this.cm.getCursor('head')),
      anchor: this.cm.indexFromPos(this.cm.getCursor('anchor'))
    };
  }

  setMode(language: string) {
    const modeInfo = findMode(language.toLowerCase());
    this.cm.setOption('mode', modeInfo ? modeInfo.mode : 'javascript');
  }

  selectionChanged(selection) {
    return !this.selection || selection.head !== this.selection.head || selection.anchor !== this.selection.anchor;
  }

  valueChanged() {
    let value = this.cm.getValue();
    if (value !== this.value) {
      let change = computeChange(this.value, value);
      this.value = value;
      let start = this.getPos() + 1;
      const content = change.text ? this.schema.text(change.text) : Fragment.empty;
      let tr = this.view.state.tr.replaceWith(start + change.from, start + change.to, content);
      if (this.cm.hasFocus()) {
        let selection = this.findSelection();
        if (this.selectionChanged(selection)) {
          tr.setSelection(TextSelection.create(tr.doc, start + selection.anchor, start + selection.head));
          this.selection = selection;
        }
      }
      this.view.dispatch(tr);
    }
  }

  forwardSelection() {
    if (!this.cm.hasFocus()) {
      this.selection = null;
      return;
    }
    let selection = this.findSelection();
    if (!this.selectionChanged(selection)) {
      return;
    }
    this.selection = selection;
    let base = this.getPos() + 1;
    this.view.dispatch(
      this.view.state.tr.setSelection(TextSelection.create(this.view.state.doc, base + selection.anchor,
        base + selection.head)));
  }

  maybeEscape(unit, dir) {
    let pos = this.cm.getCursor();
    if (this.cm.somethingSelected() || pos.line !== (dir < 0 ? this.cm.firstLine() : this.cm.lastLine()) ||
      (unit === 'char' && pos.ch !== (dir < 0 ? 0 : this.cm.getLine(pos.line).length))) {
      return CodeMirror.Pass;
    }
    this.view.focus();
    let targetPos = this.getPos() + (dir < 0 ? 0 : this.value.length + 2);
    let tr = this.view.state.tr;
    if ((dir < 0 && targetPos === 0) ||
      (dir > 0 && !Selection.findFrom(tr.doc.resolve(targetPos), dir))) {
      tr.insert(targetPos, this.view.state.schema.nodes.paragraph.create());
    }
    this.view.dispatch(tr.setSelection(Selection.near(tr.doc.resolve(targetPos), dir)).scrollIntoView());
    this.view.focus();
  }

  update(node) {
    if (node.type !== this.node.type) {
      return false;
    }
    this.node = node;
    let value = node.textContent;
    if (value !== this.value) {
      let change = computeChange(this.value, value);
      this.value = value;
      this.updating = true;
      this.cm.replaceRange(change.text, this.cm.posFromIndex(change.from), this.cm.posFromIndex(change.to), 'docUpdate');
      this.updating = false;
    }
    return true;
  }

  setSelection(anchor, head) {
    if (!this.cm.hasFocus()) {
      this.cm.focus();
    }
    this.cm.setSelection(this.cm.posFromIndex(anchor), this.cm.posFromIndex(head));
  }

  selectNode() {
    this.cm.focus();
  }

  stopEvent() {
    return true;
  }

  handleEnter = () => {
    const { state, dispatch } = this.view;
    const { selection, tr, schema: { nodes } } = state;
    const { $from, $head } = selection;
    const node = $from.node($from.depth);
    if (node && node.type === nodes.codeBlock) {
      if (node.textContent.slice(node.textContent.length - 2) === '\n\n') {
        const pos = $head.after();
        tr.replaceWith(pos, pos, state.schema.nodes.paragraph.createAndFill());
        tr.setSelection(Selection.near(tr.doc.resolve(pos), 1));
        tr.delete($from.pos - 2, $from.pos);
        dispatch(tr.scrollIntoView());
        this.view.focus();
      } else {
        tr.insertText('\n');
        dispatch(tr.scrollIntoView());
      }
    }
  }

  destroy() {
    this.node.attrs['uniqueId'] = undefined;
    this.pluginState.unsubscribe(this.updateLanguage);
    this.pluginState.unsubscribeFocusHandler();
  }
}

function computeChange(oldVal, newVal) {
  let start = 0;
  let oldEnd = oldVal.length;
  let newEnd = newVal.length;
  while (start < oldEnd && oldVal.charCodeAt(start) === newVal.charCodeAt(start)) {
    ++start;
  }
  while (oldEnd > start && newEnd > start && oldVal.charCodeAt(oldEnd - 1) === newVal.charCodeAt(newEnd - 1)) {
    oldEnd--;
    newEnd--;
  }
  return { from: start, to: oldEnd, text: newVal.slice(start, newEnd) };
}

export default (schema: Schema<any, any>, codeBlockStateKey) => {
  return (node: any, view: any, getPos: () => number): NodeView => {
    return new CodeBlock(node, view, getPos, schema, codeBlockStateKey);
  };
};

function generateId() {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for(let i = 0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
