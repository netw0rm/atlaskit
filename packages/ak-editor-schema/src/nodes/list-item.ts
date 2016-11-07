import { ListItem as ListItemNodeType, Node } from 'ak-editor-prosemirror';

export { ListItemNodeType };

export interface ListItemNode extends Node {
	type: ListItemNodeType;
}