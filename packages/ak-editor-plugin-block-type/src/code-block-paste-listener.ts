import { ProseMirror } from 'ak-editor-prosemirror';
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

    pm.tr.replaceWith(pm.selection.$from.pos, pm.selection.$to.pos, textNode).apply();
    pm.tr.applyAndScroll();

    event.preventDefault();
    event.stopPropagation();
  }, true);
}
