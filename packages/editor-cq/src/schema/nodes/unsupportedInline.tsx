// import {
//   akBorderRadius,
//   akColorN30,
//   akColorN50,
// } from '@atlaskit/util-shared-styles';
// import {
//   Attribute,
//   Inline,
//   Node as PMNode,
//   Schema,
// } from '@atlaskit/editor-core';
// import { style } from 'typestyle';

// const nodeClassName = style({
//   alignItems: 'center',
//   background: akColorN30,
//   border: `1px dashed ${akColorN50}`,
//   borderRadius: akBorderRadius,
//   boxSizing: 'border-box',
//   cursor: 'default',
//   display: 'inline-flex',
//   fontSize: '13px',
//   margin: '0 2px',
//   minHeight: 24,
//   padding: '0 10px',
//   userSelect: 'all',
//   verticalAlign: 'middle',
//   whiteSpace: 'nowrap',

//   $nest: {
//     '&.ProseMirror-selectednode': {
//       background: akColorN50,
//       outline: 'none'
//     }
//   }
// });

// export class UnsupportedInlineNodeType extends Inline {
//   constructor(name: string, schema: Schema) {
//     super(name, schema);
//     if (name !== 'unsupportedInline') {
//       throw new Error('UnsupportedInlineNodeType must be named "unsupportedInline".');
//     }
//   }

//   get attrs() {
//     return {
//       cxhtml: new Attribute({ default: null })
//     };
//   }

//   get matchDOMTag() {
//     return {
//       'div[data-unsupported-inline-cxhtml]': (dom: HTMLElement) => ({
//         cxhtml: dom.getAttribute('data-unsupported-inline-cxhtml')!
//       })
//     };
//   }

//   toDOM(node: PMNode): [string, any] {
//     const attrs = {
//       'class': nodeClassName,
//       'contenteditable': 'false',
//       'data-unsupported-inline-cxhtml': node.attrs['cxhtml'],
//       'spellcheck': 'false',
//     };
//     return ['div', attrs, 'Embedded content'];
//   }
// }


// export interface UnsupportedInlineNode extends PMNode {
//     type: UnsupportedInlineNodeType;
// }

// export function isUnsupportedInlineNode(node: PMNode): node is UnsupportedInlineNode {
//   return node.type instanceof UnsupportedInlineNodeType;
// }

