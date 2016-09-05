import { ProseMirror, InputRule } from 'ak-editor-prosemirror';

const makeNode = (pm: ProseMirror) => pm.schema.nodes.mention.create({ data: '' });

export const mentionRule : InputRule = new InputRule(/(?:^|\s)@$/, '@', (pm: ProseMirror, match: string[], pos: number) => {
  return pm.tr.replaceWith(pos-1, pos, makeNode(pm)).apply();
});

export const emoticonRule : InputRule = new InputRule(/(?:^|\s):$/, ':', (pm: ProseMirror, match: string[], pos: number) => {
  return pm.tr.replaceWith(pos-1, pos, makeNode(pm)).apply();
});
