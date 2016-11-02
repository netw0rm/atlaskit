import { ProseMirror, TextSelection } from 'ak-editor-prosemirror';

export default (pm: ProseMirror) => {
  pm.root.addEventListener('paste', (event: ClipboardEvent) => {
    if (pm.selection.$head.node(1).type.name !== 'code_block') {
      return;
    }

    const text = event.clipboardData.getData('text/plain');
    if (!text) {
      return;
    }

    const textNode = pm.schema.nodes.text.create({}, text);

    const sel = pm.selection;
    const tr = pm.tr.replaceWith(sel.$from.pos, sel.$to.pos, textNode);
    const posAftePaste = tr.map(sel.$to.pos);
    tr.setSelection(new TextSelection(tr.doc.resolve(posAftePaste)));
    tr.applyAndScroll();

    event.preventDefault();
    event.stopPropagation();
  }, true);
}
