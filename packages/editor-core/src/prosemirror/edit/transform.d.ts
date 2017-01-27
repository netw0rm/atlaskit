import { Node, Transform, Selection } from '../';

export class EditorTransform extends Transform {
  apply(options?: { [key: string]: any }): this;
  applyAndScroll(): this;
  selection: Selection;
  setSelection(selection: Selection): this;
  replaceSelection(node?: Node, inheritMarks?: boolean): this;
  deleteSelection(): this;
  typeText(text: string): this;
}
