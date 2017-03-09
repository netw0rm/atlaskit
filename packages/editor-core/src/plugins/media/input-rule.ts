import { InputRule, ProseMirror } from '../../prosemirror';
import { URL } from '../hyperlink/regex';

const urlWithASpace = new RegExp(`${URL.source} $`);

export default new InputRule(urlWithASpace, '', (
  pm: ProseMirror,
  match: string[],
  to: number
) : boolean => {
  // const { schema } = pm;
  // const from = to - match[1].length;
  const url = match[3] ? match[1] : `http://${match[1]}`;

  // const markType = schema.mark(
  //   'link',
  //   {
  //     href: url,
  //   }
  // );

  // pm.tr.replaceWith(
  //   from,
  //   to,
  //   schema.text(
  //     match[1],
  //     [markType]
  //   )
  // ).apply();

  // pm.removeActiveMark(markType.type);

  const $from = pm.selection.$from;
  const afterHere = $from.end($from.depth) + 1;

  // do nothing if there's already a following card
  if (pm.doc.nodeAt(afterHere)) {
    return true;
  }

  pm.tr.insert(
    $from.end($from.depth) + 1,
    pm.schema.nodes.media.create({ url, type: 'link' })
  ).apply();

    // pm.schema.nodes.paragraph.create(
      // {},
    //   [ pm.schema.nodes.text.create({}, 'hello world') ]
    // )
  // debugger;

  return true;
});
