// The names of the blocks don't map precisely to schema nodes, because
// of concepts like "paragraph" <-> "Normal text" and "Unknown".
//
// Rather than half-match half-not, this plugin introduces its own
// nomenclature for what 'block type' is active.
export const NORMAL_TEXT = { name: 'normal', title: 'Normal text' };
export const HEADING_1 = { name: 'heading1', title: 'Heading 1' };
export const HEADING_2 = { name: 'heading2', title: 'Heading 2' };
export const HEADING_3 = { name: 'heading3', title: 'Heading 3' };
export const HEADING_4 = { name: 'heading4', title: 'Heading 4' };
export const HEADING_5 = { name: 'heading5', title: 'Heading 5' };
export const BLOCK_QUOTE = { name: 'blockquote', title: 'Block quote' };
export const CODE_BLOCK = { name: 'codeblock', title: 'Code block' };
export const PANEL = { name: 'panel', title: 'Panel' };
export const OTHER = { name: 'other', title: 'Other…' };

export const ALL_BLOCK_TYPES = [NORMAL_TEXT, HEADING_1, HEADING_2, HEADING_3, HEADING_4, HEADING_5,
  BLOCK_QUOTE, CODE_BLOCK, PANEL];

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
