import { ProseMirror, TextSelection } from 'ak-editor-prosemirror';

class CodeBlockPasteListener {
  constructor(pm: ProseMirror) {
    return (event: ClipboardEvent) => {
      const sel = pm.selection;
      if (sel.$head.parent.type.name !== 'code_block') {
        return;
      }

      const text = event.clipboardData.getData('text/plain');
      if (!text) {
        return;
      }

      const textNode = pm.schema.nodes.text.create({}, text);

      pm.tr.replaceSelection(textNode).applyAndScroll();

      event.preventDefault();
      event.stopPropagation();
    };
  }
}

interface CodeBlockPasteListener {
  (event: ClipboardEvent): void;
}

export default CodeBlockPasteListener;
