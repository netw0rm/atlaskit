import { BulletList as BulletListNodeType, Node } from 'ak-editor-prosemirror';

export { BulletListNodeType };

export interface BulletListNode extends Node {
	type: BulletListNodeType;
}