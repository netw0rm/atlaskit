import { Doc as DocNodeType, Node } from 'ak-editor-prosemirror';

export { DocNodeType };

export interface DocNode extends Node {
	type: DocNodeType;
}