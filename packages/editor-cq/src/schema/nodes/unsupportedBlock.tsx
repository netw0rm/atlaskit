// import {
//   akBorderRadius,
//   akColorN30,
//   akColorN50,
// } from '@atlaskit/util-shared-styles';

// import {
//   NodeSpec,
// } from '@atlaskit/editor-core';

// import { style } from 'typestyle';

// const nodeClassName = style({
//   alignItems: 'center',
//   background: akColorN30,
//   border: `1px dashed ${akColorN50}`,
//   borderRadius: akBorderRadius,
//   boxSizing: 'border-box',
//   cursor: 'default',
//   display: 'block',
//   fontSize: '13px',
//   margin: '10px 0',
//   minHeight: 24,
//   padding: '10px',
//   textAlign: 'center',
//   userSelect: 'all',
//   verticalAlign: 'text-bottom',
//   whiteSpace: 'nowrap',

//   $nest: {
//     '&.ProseMirror-selectednode': {
//       background: akColorN50,
//       outline: 'none'
//     }
//   }
// });

// export class UnsupportedBlockNodeType extends Block {
//   constructor(name: string, schema: Schema) {
//     super(name, schema);
//     if (name !== 'unsupportedBlock') {
//       throw new Error('UnsupportedBlockNodeType must be named "unsupportedBlock".');
//     }
//   }

//   get attrs() {
//     return {
//       cxhtml: new Attribute({ default: null })
//     };
//   }

//   get matchDOMTag() {
//     return {
//       'div[data-unsupported-block-cxhtml]': (dom: HTMLElement) => ({
//         cxhtml: dom.getAttribute('data-unsupported-block-cxhtml')!
//       })
//     };
//   }

//   toDOM(node: PMNode): [string, any] {
//     // NOTE: This node cannot be "contenteditable: false". If it's the only node in a document, PM throws an error because there's nowhere to put the cursor.
//     const attrs = {
//       'class': nodeClassName,
//       'data-unsupported-block-cxhtml': node.attrs['cxhtml'],
//       'spellcheck': 'false',
//     };
//     return ['div', attrs, 'Embedded content'];
//   }
// }


// export interface UnsupportedBlockNode extends PMNode {
//     type: UnsupportedBlockNodeType;
// }

// export function isUnsupportedBlockNode(node: PMNode): node is UnsupportedBlockNode {
//   return node.type instanceof UnsupportedBlockNodeType;
// }

