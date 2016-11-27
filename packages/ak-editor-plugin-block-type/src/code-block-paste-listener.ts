import { ProseMirror, TextSelection } from 'ak-editor-prosemirror';
import { isCodeBlockNode } from 'ak-editor-schema';

class CodeBlockPasteListener {
  constructor(pm: ProseMirror) {
    return (event: ClipboardEvent) => {
      const { $from, $to } = pm.selection;

      if (!isCodeBlockNode(pm.selection.$from.parent) ||
        !isCodeBlockNode(pm.selection.$to.parent)) {
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
