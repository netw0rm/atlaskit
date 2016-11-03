import { ProseMirror, TextSelection } from 'ak-editor-prosemirror';

class CodeBlockPasteListener {
  constructor(pm: ProseMirror) {
    return (event: ClipboardEvent) => {
      const sel = pm.selection;
      if (sel.$head.node(1).type.name !== 'code_block') {
        return;
      }

      const text = event.clipboardData.getData('text/plain');
      if (!text) {
        return;
      }

      const textNode = pm.schema.nodes.text.create({}, text);

      const tr = pm.tr.replaceWith(sel.$from.pos, sel.$to.pos, textNode);
      const posAfterPaste = tr.map(sel.$to.pos);
      tr.setSelection(new TextSelection(tr.doc.resolve(posAfterPaste)));
      tr.applyAndScroll();

      event.preventDefault();
      event.stopPropagation();
    };
  }
}

interface CodeBlockPasteListener {
  (event: ClipboardEvent): void;
}

export default CodeBlockPasteListener;
