import { ProseMirror, Node, Mark, Slice, Fragment, Transform } from 'ak-editor-prosemirror';
import { URL } from './regex';

// This could be somehow added via schema ?
const UNSUPPORTED_NODE_TYPES: string[] = [
  'code',
];

function applyLinkMarkerToNode(
  pm: ProseMirror,
  transform: Transform,
  linkText: string,
  from: number
) : Transform {
  const mark: Mark = pm.schema.marks['link'].create({ href: linkText });
  return transform.addMark(from, from + linkText.length, mark);
}

function addLinkMarkerToNode(
  pm: ProseMirror,
  node: Node
) : Node {
  const nodeText: string = node.textContent;

  let matchIndex: number = 0;
  let match = nodeText.match(URL);

  if (!match || UNSUPPORTED_NODE_TYPES.some((nodeType: string) => node.type.name.indexOf(nodeType) !== -1)) {
    return node;
  }

  const transform: Transform = new Transform(node);

  while (match) {
    matchIndex += nodeText.slice(matchIndex).indexOf(match[1]);

    applyLinkMarkerToNode(
      pm,
      transform,
      match[1],
      matchIndex
    );

    match = (
      nodeText
      .slice(matchIndex + match[1].length)
      .match(URL)
    );
  }

  return transform.doc;
}

export default function(pm: ProseMirror, slice: Slice): Slice {
  const nodes = slice.content.content
    .map((node: Node) => addLinkMarkerToNode(pm, node));
  return new Slice(Fragment.fromArray(nodes), 0, 0);
}
