import { ProseMirror, Mark, InputRule } from 'ak-editor-prosemirror';
import { URL } from './regex';

const urlAtEndOfLine = new RegExp(`${URL.source}$`);

export default new InputRule(urlAtEndOfLine, ' ', (
  pm: ProseMirror,
  match: string[],
  pos: number
) : boolean => {
  const { schema } = pm;
  const to: number = pos - 1; // removing the whitespace on the end
  const from: number = to - match[1].length;
  const url: string = match[3] ? match[1] : `http://${match[1]}`;

  const markType: Mark = schema.mark(
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
      markType
    )
  ).apply();

  pm.removeActiveMark(markType);

  return true;
});
