import schema from 'ak-editor-schema';
import { Node } from 'ak-editor-prosemirror';

export default function(html: string): Node {
  const el = document.createElement('div');
  el.innerHTML = html;

  return schema.parseDOM(el);
}
