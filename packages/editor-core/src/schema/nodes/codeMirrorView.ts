import CodeMirror from '../../codemirror';
import 'codemirror/mode/javascript/javascript';
import '!style!css!less!codemirror/lib/codemirror.css';
import {
  Selection,
  TextSelection,
  Schema,
  exitCode,
  undo,
  redo,
  keymap,
  Node,
  EditorView,
  Fragment,
} from '../../prosemirror';
import {stateKey} from '../../plugins/code-block';

export default class CodeMirrorView {
  dom: HTMLElement;
  private node: Node;
  private view: EditorView;
  private getPos: any;
  private value: string;
  private selection: any;
  private cm: CodeMirror;
  private updating: boolean = false;
  private schema: Schema<any, any>;

  constructor(node, view, getPos, schema) {
    this.node = node;
    this.view = view;
    this.getPos = getPos;
    this.schema = schema;
    this.value = node.textContent;
    this.selection = null;
    let mod = /Mac/.test(navigator.platform) ? 'Cmd' : 'Ctrl';

    this.cm = new CodeMirror(null, {
      value: this.value,
      mode: 'javascript',
      lineNumbers: true,
      extraKeys: CodeMirror.normalizeKeyMap({
        Up: () => this.maybeEscape('line', -1),
        Left: () => this.maybeEscape('char', -1),
        Down: () => this.maybeEscape('line', 1),
        Right: () => this.maybeEscape('char', 1),
        [`${mod}-Z`]: () => undo(this.view.state, this.view.dispatch),
        [`Shift-${mod}-Z`]: () => redo(this.view.state, this.view.dispatch),
        [`${mod}-Y`]: () => redo(this.view.state, this.view.dispatch),
        'Ctrl-Enter': () => {
          if (exitCode(view.state, view.dispatch)) {
            view.focus();
          }
        }
      })
    });

    setTimeout(() => this.cm.refresh(), 20);

    this.dom = this.cm.getWrapperElement();

    this.updating = false;
    this.cm.on('changes', () => {
      if (!this.updating) {
        this.valueChanged();
      }
    });
    this.cm.on('cursorActivity', () => {
      if (!this.updating) {
        this.forwardSelection();
      }
    });
    this.cm.on('focus', () => {
      const codeBlockPluginState = stateKey.getState(this.view.state);
      codeBlockPluginState.updateEditorFocused(true);
      codeBlockPluginState.update(this.view.state, this.view.docView, true);
      if (!this.updating) {
        this.forwardSelection();
      }
    });
  }

  findSelection() {
    return {
      head: this.cm.indexFromPos(this.cm.getCursor('head')),
      anchor: this.cm.indexFromPos(this.cm.getCursor('anchor'))
    };
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
    this.view.dispatch(this.view.state.tr.setSelection(Selection.near(this.view.state.doc.resolve(targetPos), dir)).scrollIntoView());
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
    this.cm.focus();
    this.cm.setSelection(this.cm.posFromIndex(anchor), this.cm.posFromIndex(head));
  }

  selectNode() {
    this.cm.focus();
  }

  stopEvent() {
    return true;
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

function arrowHandler(dir) {
  return (state, dispatch, view) => {
    if (state.selection.empty && view.endOfTextblock(dir)) {
      let side = dir === 'left' || dir === 'up' ? -1 : 1;
      const $head = state.selection.$head;
      let nextPos = Selection.near(state.doc.resolve(side > 0 ? $head.after() : $head.before()), side) as TextSelection;
      if (nextPos.$head && nextPos.$head.parent.type.name === 'codeBlock') {
        dispatch(state.tr.setSelection(nextPos));
        return true;
      }
    }
    return false;
  };
}

export const codeMirrorKeymap = keymap({
  ArrowLeft: arrowHandler('left'),
  ArrowRight: arrowHandler('right'),
  ArrowUp: arrowHandler('up'),
  ArrowDown: arrowHandler('down')
});
