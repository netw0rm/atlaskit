import { Node, NodeType, InputRule } from '../';

export function wrappingInputRule(regexp: RegExp, filter: string, nodeType: NodeType, getAttrs?: { [key: string]: any } | ((_0: string[]) => { [key: string]: any } | null), joinPredicate?: (_0: string[], _1: Node) => boolean): InputRule;

export function textblockTypeInputRule(regexp: RegExp, filter: string, nodeType: NodeType, getAttrs?: { [key: string]: any } | ((_0: string[]) => { [key: string]: any } | null)): InputRule;

export function blockQuoteRule(nodeType: NodeType): InputRule;

export function orderedListRule(nodeType: NodeType): InputRule;

export function bulletListRule(nodeType: NodeType): InputRule;

export function codeBlockRule(nodeType: NodeType): InputRule;

export function headingRule(nodeType: NodeType, maxLevel: number): InputRule;
