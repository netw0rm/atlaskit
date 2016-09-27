import { ProseMirror, InputRule } from 'ak-editor-prosemirror';

export const mentionRule = new InputRule(/(^|\s)@$/, '@', (pm: ProseMirror, match: string[], pos: number) => {
  const node = pm.schema.nodes.mention.create({ id: '' });
  return pm.tr.replaceWith(pos-1, pos, node).apply();
});
