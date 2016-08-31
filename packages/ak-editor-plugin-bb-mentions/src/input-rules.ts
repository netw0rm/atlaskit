import { ProseMirror } from 'prosemirror/dist/edit';
import { InputRule } from 'prosemirror/dist/inputrules';

const makeNode = (pm: ProseMirror, data: string) => pm.schema.nodes.mention.create({ data: data });

export const mentionRule : InputRule = new InputRule(/(?:^|\s)@$/, '@', (pm: ProseMirror, match: string[], pos: number) => {
  return pm.tr.replaceWith(pos-1, pos, makeNode(pm, '@')).apply();
});

export const emoticonRule : InputRule = new InputRule(/(?:^|\s):$/, ':', (pm: ProseMirror, match: string[], pos: number) => {
  return pm.tr.replaceWith(pos-1, pos, makeNode(pm, ':')).apply();
});
