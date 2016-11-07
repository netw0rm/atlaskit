import { Paragraph as ParagraphNodeType, Node } from 'ak-editor-prosemirror';

export { ParagraphNodeType };

export interface ParagraphNode extends Node {
	type: ParagraphNodeType;
}