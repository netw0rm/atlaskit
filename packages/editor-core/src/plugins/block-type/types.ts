// The names of the blocks don't map precisely to schema nodes, because
// of concepts like "paragraph" <-> "Normal text" and "Unknown".
//
// Rather than half-match half-not, this plugin introduces its own
// nomenclature for what 'block type' is active.
export const NORMAL_TEXT = makeBlockType('normal', 'Normal text');
export const HEADING_1 = makeBlockType('heading1', 'Heading 1');
export const HEADING_2 = makeBlockType('heading2', 'Heading 2');
export const HEADING_3 = makeBlockType('heading3', 'Heading 3');
export const HEADING_4 = makeBlockType('heading4', 'Heading 4');
export const HEADING_5 = makeBlockType('heading5', 'Heading 5');
export const BLOCK_QUOTE = makeBlockType('blockquote', 'Block quote');
export const CODE_BLOCK = makeBlockType('codeblock', 'Code block');
export const PANEL = makeBlockType('panel', 'Panel');
export const OTHER = makeBlockType('other', 'Other…');

function makeBlockType(name: BlockTypeName, title: string): BlockType {
  return { name, title };
}

export type BlockTypeName =
  'normal' |
  'heading1' |
  'heading2' |
  'heading3' |
  'heading4' |
  'heading5' |
  'blockquote' |
  'codeblock' |
  'panel' |
  'other';

export interface BlockType {
  name: BlockTypeName;
  title: string;
}
