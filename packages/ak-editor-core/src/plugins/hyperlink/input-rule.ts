import { ProseMirror, InputRule } from '../../prosemirror';
import { URL } from './regex';

const urlAtEndOfLine = new RegExp(`${URL.source}$`);

export default new InputRule(urlAtEndOfLine, '', (
  pm: ProseMirror,
  match: string[],
  to: number
) : boolean => {
  const { schema } = pm;
  const from = to - match[1].length;
  const url = match[3] ? match[1] : `http://${match[1]}`;

  const markType = schema.mark(
    'link',
    {
      href: url,
    }
  );

  pm.tr.replaceWith(
    from,
    to,
    schema.text(
      match[1],
      [markType]
    )
  ).apply();

  pm.removeActiveMark(markType.type);

  return true;
});
