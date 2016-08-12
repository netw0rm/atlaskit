/* eslint-disable */
import hyperlink from 'atlassian-editorkit-hyperlink-plugin/dist/pastehandler';
import { Slice } from 'prosemirror/dist/model';
import { markdownParser } from './markdown-parser';

export const hyperlinkTransformer = hyperlink.pasteTransformer;

export const markdownTransformer = function(schema, slice) {
  var sliceContents = '';
  const canParseAsMarkdown = slice.content.content.every((node) => {
    // we attempt to convert to Markdown if only all nodes are paragraphs
    if (node.type.name !== "paragraph") return false;

    sliceContents = sliceContents + node.toDOM().innerText + '\n';
    // all nodes in a paragraph should either be text (without any marks) and hard breaks.
    return node.content.content.every((child) => {
      return ['text', 'hard_break'].indexOf(child.type.name) > -1 && !child.marks.length
    });
  });

  if (canParseAsMarkdown && sliceContents.length) {
    const parsed = markdownParser(schema).parse(sliceContents);
    return new Slice(parsed.content, slice.openLeft, slice.openRight, slice.possibleParent);
  } else {
    return slice
  }
}
