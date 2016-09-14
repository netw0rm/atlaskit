import { MarkType } from 'ak-editor-prosemirror';

export class DelMark extends MarkType {
  get matchDOMTag() { return {"del": null, "s": null, "strike": null} }
  get matchDOMStyle() {
    return {
      "text-decoration": (value: string) => value == "line-through" ? null : false,
    }
  }
  toDOM() { return ['del']; }
}
