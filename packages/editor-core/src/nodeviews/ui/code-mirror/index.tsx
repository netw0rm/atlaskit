import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CodeMirror from '../../../codemirror';
import {
  browser,
  Selection,
  TextSelection,
  Schema,
  undo,
  redo,
  Node,
  NodeView,
  EditorView,
  Fragment,
} from '../../../prosemirror';
import {
  CodeBlockState,
  codeBlockStateKey,
  codeMirrorStateKey,
  CodeMirrorState,
} from '../../../plugins';
import { DEFAULT_LANGUAGES } from '../../../ui/LanguagePicker/languageList';
import { CodeMirrorDiv } from './styles';

const MOD = browser.mac ? 'Cmd' : 'Ctrl';

class CodeBlock {
  private node: Node;
  private view: EditorView;
  private getPos: Function;
  private value: string;
  private selection: Selection | undefined;
  private cm: any;
  private containerRef: HTMLDivElement | undefined;
  private domRef: HTMLDivElement | undefined;
  private uniqueId: string;
  private updating: boolean = false;
  private schema: Schema<any, any>;
  private pluginState: CodeBlockState;
  private codeMirrorState: CodeMirrorState;

  constructor(node: Node, view: EditorView, getPos: () => number, schema: Schema<any, any>) {
    this.node = node;
    this.view = view;
    this.getPos = getPos;
    this.schema = schema;
    this.value = node.textContent;
    this.selection = undefined;
    this.pluginState = codeBlockStateKey.getState(this.view.state);
    this.codeMirrorState = codeMirrorStateKey.getState(this.view.state);
    this.renderReactComponent();
  }

  private renderReactComponent = () => {
    this.containerRef = document.createElement('div');
    ReactDOM.render(
      <CodeMirrorDiv innerRef={this.setDomRef}>
        <textarea ref={this.handleRef} />
      </CodeMirrorDiv>,
      this.containerRef
    );
  }

  setDomRef = (ref) => {
    this.domRef = ref;
  }

  get dom() {
    return this.domRef;
  }

  private handleRef = (ref) => {
    this.cm = CodeMirror.fromTextArea(ref, {
      value: this.value,
      mode: undefined,
      lineNumbers: true,
      lineWrapping: true,
      tabSize: 2,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      extraKeys: this.prepareExtraKeyMap(),
    });

    // This line of code is inspired from Marijn's code example here:
    // https://github.com/ProseMirror/website/blob/master/pages/examples/codemirror/example.js#L43
    setTimeout(() => this.cm.refresh(), 20);
    this.setMode(this.node.attrs['language']);
    this.updating = false;
    this.cm.on('changes', () => {
      if (!this.updating) {
        this.valueChanged();
        this.pluginState.update(this.view.state, this.view.docView, false);
      }
    });
    this.cm.on('focus', (cm: CodeMirror.Editor) => {
      if (!this.updating) {
        this.forwardSelection();
      }
      this.pluginState.updateEditorFocused(true);
      this.pluginState.update(this.view.state, this.view.docView, true);
    });
    this.cm.on('mousedown', () => {
      this.forwardSelection();
      this.pluginState.update(this.view.state, this.view.docView, true);
    });
    this.cm.on('blur', () => {
      this.pluginState.updateEditorFocused(false);
      this.pluginState.update(this.view.state, this.view.docView, true);
    });
    this.uniqueId = this.node.attrs['uniqueId'] || generateId();
    this.node.attrs['uniqueId'] = this.uniqueId;
    this.pluginState.subscribe(this.updateLanguage);
    this.codeMirrorState.subscribe(this.focusCodeEditor);
  }

  private prepareExtraKeyMap(): any {
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
    return CodeMirror['normalizeKeyMap'](keymap);
  }

  private handleEnter = (): void => {
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
        return CodeMirror.Pass;
      }
    }
  }

  private maybeEscape(unit: string, dir: number): void {
    const pos = this.cm.getCursor();
    if (this.cm.somethingSelected() ||
      pos.line !== (dir < 0 ? this.cm.firstLine() : this.cm.lastLine()) ||
      (unit === 'char' && pos.ch !== (dir < 0 ? 0 : this.cm.getLine(pos.line).length))) {
      return CodeMirror.Pass;
    }
    this.view.focus();
    const targetPos = this.getPos() + (dir < 0 ? 0 : this.value.length + 2);
    const tr = this.view.state.tr;
    if ((dir < 0 && targetPos === 0) ||
      (dir > 0 && !Selection.findFrom(tr.doc.resolve(targetPos), dir))) {
      tr.insert(targetPos, this.view.state.schema.nodes.paragraph.create());
    }
    this.view.dispatch(
      tr.setSelection(
        Selection.near(tr.doc.resolve(targetPos), dir)
      ).scrollIntoView()
    );
    this.view.focus();
  }

  private updateLanguage = (state: CodeBlockState) => {
    const { language, uniqueId } = state;
    if (language && this.cm.getMode().name !== language && uniqueId === this.uniqueId) {
      this.setMode(language);
    }
  }

  private focusCodeEditor = (uniqueId: string) => {
    if (uniqueId === this.uniqueId) {
      this.cm.focus();
    }
  }

  private setMode(language: string): void {
    if (language) {
      const modeInfo = findMode(language.toLowerCase());
      this.cm.setOption('mode', modeInfo ? modeInfo.mode : 'javascript');
    }
  }

  private selectionChanged(selection: Selection): boolean {
    return !this.selection ||
      selection.head !== this.selection.head ||
      selection.anchor !== this.selection.anchor;
  }

  private valueChanged(): void {
    const value = this.cm.getValue();
    if (value !== this.value) {
      const change = computeChange(this.value, value);
      this.value = value;
      const start = this.getPos() + 1;
      const content = change.text ? this.schema.text(change.text) : Fragment.empty;
      const tr = this.view.state.tr.replaceWith(start + change.from, start + change.to, content);
      if (this.cm.hasFocus()) {
        const selection = this.findSelection();
        if (this.selectionChanged(selection)) {
          this.view.dispatch(
            tr.setSelection(
              TextSelection.create(
                tr.doc,
                start + selection.anchor,
                start + selection.head
              )
            ).scrollIntoView()
          );
          this.selection = selection;
        }
      }
    }
  }

  private forwardSelection(): void {
    if (!this.cm.hasFocus()) {
      this.selection = undefined;
      return;
    }
    const selection = this.findSelection();
    if (!this.selectionChanged(selection)) {
      return;
    }
    this.selection = selection;
    const base = this.getPos() + 1;
    this.view.dispatch(
      this.view.state.tr.setSelection(TextSelection.create(
        this.view.state.doc, base + selection.anchor, base + selection.head
      ))
    );
  }

  private findSelection(): any {
    return {
      head: this.cm.indexFromPos(this.cm.getCursor('head')),
      anchor: this.cm.indexFromPos(this.cm.getCursor('anchor'))
    };
  }

  update(node: Node): boolean {
    if (node.type !== this.node.type) {
      return false;
    }
    this.node = node;
    const value = node.textContent;
    if (value !== this.value) {
      const change = computeChange(this.value, value);
      this.value = value;
      this.updating = true;
      this.cm.replaceRange(
        change.text,
        this.cm.posFromIndex(change.from),
        this.cm.posFromIndex(change.to),
        'docUpdate'
      );
      this.updating = false;
    }
    return true;
  }

  setSelection(anchor: number, head: number): void {
    if (!this.cm.hasFocus()) {
      this.cm.focus();
    }
    this.cm.setSelection(
      this.cm.posFromIndex(anchor),
      this.cm.posFromIndex(head)
    );
  }

  selectNode(): void {
    this.cm.focus();
  }

  stopEvent(): boolean {
    return true;
  }

  destroy() {
    this.node.attrs['uniqueId'] = undefined;
    ReactDOM.unmountComponentAtNode(this.containerRef!);
    this.containerRef = undefined;
    this.domRef = undefined;
    this.pluginState.unsubscribe(this.updateLanguage);
    this.codeMirrorState.unsubscribe(this.focusCodeEditor);
  }
}

function computeChange(oldVal: string, newVal: string): any {
  let start = 0;
  let oldEnd = oldVal.length;
  let newEnd = newVal.length;
  while (start < oldEnd && oldVal.charCodeAt(start) === newVal.charCodeAt(start)) {
    ++start;
  }
  while (oldEnd > start &&
    newEnd > start &&
    oldVal.charCodeAt(oldEnd - 1) === newVal.charCodeAt(newEnd - 1)
  ) {
    oldEnd--;
    newEnd--;
  }
  return { from: start, to: oldEnd, text: newVal.slice(start, newEnd) };
}

export default (schema: Schema<any, any>): any => {
  return (node: any, view: any, getPos: () => number): NodeView => {
    return new CodeBlock(node, view, getPos, schema);
  };
};

function generateId(): string {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for(let i = 0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function findMode(mode: string) {
  const matches = DEFAULT_LANGUAGES.filter(language => language.alias.indexOf(mode.toLowerCase()) !== -1);
  if (!matches.length) {
    return false;
  }
  const modes = matches[0].alias.map(
    lang => CodeMirror['findModeByName'](lang)
  ).filter(mode => !!mode);
  return modes[0];
}
