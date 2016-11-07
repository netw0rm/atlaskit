import { OrderedList as OrderedListNodeType, Node } from 'ak-editor-prosemirror';

export { OrderedListNodeType };

export interface OrderedListNode extends Node {
	type: OrderedListNodeType;
}