import { InputRule, ProseMirror } from '../../prosemirror';
import { URL } from '../hyperlink/regex';

const urlWithASpace = new RegExp(`${URL.source} $`);

export default new InputRule(urlWithASpace, '', (
  pm: ProseMirror,
  match: string[],
  to: number
) : boolean => {
  const url = match[3] ? match[1] : `http://${match[1]}`;
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
  return true;
});
