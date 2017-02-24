import { InputRule, Mark, ProseMirror, Schema } from '../../prosemirror';

function replaceWithMark(
  pm: ProseMirror,
  match: string[],
  pos: number,
  mark: string
): boolean {
  const schema: Schema = pm.schema;
  const to = pos;
  const from = pos - 1;
  const markType: Mark = schema.mark(mark);
  const marks: Mark[] = [...pm.tr.doc.marksAt(pos), markType];

  pm.tr.replaceWith(
    from,
    to,
    schema.text(
      '@',
      marks,
    )
  ).apply();

  pm.addActiveMark(markType);

  return true;
}

export const mentionQueryRule = new InputRule(/(^|[^\w\`])@$/, '@', (
  pm: ProseMirror,
  match: string[],
  pos: number
) => replaceWithMark(pm, match, pos, 'mention_query'));
