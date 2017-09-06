import { EditorView, TextSelection, Node } from '../../prosemirror';
import { getEditorValueWithMedia, insertFileFromDataUrl } from '../utils';

export default class EditorActions {
  private editorView?: EditorView;

  // This method needs to be public for context based helper components.
  _privateGetEditorView(): EditorView | undefined {
    return this.editorView;
  }

  // This method needs to be public for EditorContext component.
  _privateRegisterEditor(editorView: EditorView): void {
    if (!this.editorView && editorView) {
      this.editorView = editorView;
    } else if (this.editorView !== editorView) {
      throw new Error('Editor has already been registered! It\'s not allowed to re-register editor with the new Editor instance.');
    }
  }

  // This method needs to be public for EditorContext component.
  _privateUnregisterEditor(): void {
    this.editorView = undefined;
  }

  focus(): boolean {
    if (!this.editorView || this.editorView.hasFocus()) {
      return false;
    }

    this.editorView.focus();
    return true;
  }

  blur(): boolean {
    if (!this.editorView || !this.editorView.hasFocus()) {
      return false;
    }

    this.editorView.dom.blur();
    return true;
  }

  clear(): boolean {
    if (!this.editorView) {
      return false;
    }

    const editorView = this.editorView;
    const { state } = editorView;
    const tr = editorView.state.tr
      .setSelection(TextSelection.create(state.doc, 0, state.doc.nodeSize - 2))
      .deleteSelection();

    editorView.dispatch(tr);

    return true;
  }

  getValue(): Promise<Node | undefined> {
    return getEditorValueWithMedia(this.editorView && this.editorView.state);
  }

  replaceDocument(rawValue: Node | string | Object): boolean {
    if (!this.editorView || !rawValue) {
      return false;
    }

    const state = this.editorView.state;
    const schema = state.schema;

    let value;
    if (typeof rawValue === 'string') {
      try {
        value = JSON.parse(rawValue);
      } catch (e) {
        return false;
      }
    } else if (rawValue instanceof Node) {
      // If rawValue is instance of Node we convert it to JSON and re-create children,
      // so we get completely new document instead of changing the one that was passed to us
      value = rawValue.toJSON();
    } else {
      value = rawValue;
    }

    const content = (value.content || []).map(child => schema.nodeFromJSON(child));

    if (!content.length) {
      return false;
    }

    const tr = state.tr
      .replaceWith(0, state.doc.nodeSize - 2, content)
      .scrollIntoView();

    this.editorView.dispatch(tr);

    return true;
  }

  appendText(text: string): boolean {
    if (!this.editorView || !text) {
      return false;
    }

    const { state } = this.editorView;
    const lastChild = state.doc.lastChild;

    if (lastChild && lastChild.type !== state.schema.nodes.paragraph) {
      return false;
    }

    const tr = state.tr
      .insertText(text)
      .scrollIntoView();
    this.editorView.dispatch(tr);

    return true;
  }

  insertFileFromDataUrl(url: string, filename: string): boolean {
    if (!this.editorView) {
      return false;
    }
    insertFileFromDataUrl(this.editorView.state, url, filename);
    return true;
  }
}
