import { ProseMirror, Node, Mark, Slice, Fragment, Transform, isCodeBlockNode } from '../../';
import { URL } from './regex';

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
  let urlMatches = nodeText.match(URL);

  if (!urlMatches || !node.isBlock || isCodeBlockNode(node)) {
    return node;
  }

  const transform: Transform = new Transform(node);

  while (urlMatches) {
    matchIndex += nodeText.slice(matchIndex).indexOf(urlMatches[1]);

    applyLinkMarkerToNode(
      pm,
      transform,
      urlMatches[1],
      matchIndex
    );

    urlMatches = (
      nodeText
      .slice(matchIndex + urlMatches[1].length)
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
