import { ProseMirror, Node, Mark, Slice, Fragment, Transform } from 'ak-editor-prosemirror';

function persistNewLines(
  pm: ProseMirror,
  node: Node
) : Node {
  // empty code block will be removed
  // plain text is converted to paragraph

  // when copying from a code block and paste into an empty code block, `node.type.name` is `code_block`
  // which would create a new code block (don't do anything) (might be a problem when we add language features)

  // when copying from a code block and paste into a code block with some text, `node.type.name` is `text`
  // which would create a new code block (don't do anything)

  // when copying with multiple lines from a code block and paste into a code block with some text, `node.type.name` is `text`
  // which would strip the newlines (add the newlines back)

  // when copying from text (except for <pre> tag) and paste into an empty code block `node.type.name` is the original type
  // when would remove the code block (convert to code block)

  // when copying from text (except for <pre> tag) and paste into a code block with some text, `node.type.name` is `text`
  // which continues in the code block (don't do anything)

  // when copying from text with multiple lines (except for <pre> tag) and paste into a code block with some text, the first node `node.type.name` is `code_block`
  // which creates a new code block (convert to text)
  // the rest are the original type
  // which is not in a code block (convert to text but don't strip the newlines)

  // the goal here is to make it code block if the original code block is empty
  // make it text node if the original code block is not empty. But newlines must be preserved

  if (node.type.name === 'text') {
    return node;
  }

  let nodeText = '';

  node.content.content.forEach((node: Node) => {
    if (node.text) {
      nodeText += node.text;
    } else {
      nodeText += '\n';
    }
  });

  const textNode = pm.schema.nodes.text.create({}, nodeText);
  return pm.schema.nodes.code_block.create({}, textNode);
}

export default function(pm: ProseMirror, slice: Slice): Slice {
  var nodeType = pm.selection.$from.node(1).type;

  if (nodeType.name === 'code_block') {
    const nodes = slice.content.content
      .map((node: Node) => persistNewLines(pm, node));

    return new Slice(Fragment.fromArray(nodes), 0, 0);
  }

  return slice;
}
