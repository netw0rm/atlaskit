import './polyfill';
import * as base64fileconverter from './base64fileconverter';
import { offsetRefs, BuilderContent, coerce } from './schema-builder';
import { ProseMirror } from 'ak-editor-prosemirror';

export { base64fileconverter };
export { default as chaiPlugin } from './chai';
export { default as SyncPlugin } from './sync-plugin';
export { default as makeEditor } from './make-editor';
export { default as fixtures } from './fixtures';
export {
  doc, p, blockquote, pre,
  h1, h2, h3, h4, h5, h6,
  li, ul, ol, br, img, hr, em, strong, code, del, a,
  text, fragment, slice
} from './schema-builder';
export { fromHTML, toHTML } from './html-helpers';

/**
 * Insert nodes at the current selection.
 *
 * @returns refs from the inserted nodes, made relative to the document
 *   insertion position
 */
export const insert = (pm: ProseMirror, ...content: BuilderContent[]) => {
  const { from, to } = pm.selection;
  const { nodes, refs } = coerce(content);
  pm.tr.replaceWith(from, to, nodes).apply();
  return offsetRefs(refs, from);
};
