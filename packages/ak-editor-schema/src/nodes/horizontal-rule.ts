import { HorizontalRule as HorizontalRuleNodeType, Node } from 'ak-editor-prosemirror';

export { HorizontalRuleNodeType };

export interface HorizontalRuleNode extends Node {
	type: HorizontalRuleNodeType;
}