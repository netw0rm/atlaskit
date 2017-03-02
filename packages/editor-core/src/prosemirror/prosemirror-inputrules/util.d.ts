import { NodeType, Transaction } from '../';

export function wrappingInputRule(regexp: RegExp, nodeType: NodeType, getAttrs: Function | { [key: string]: any }, joinPredicate: Function): Transaction;
export function textblockTypeInputRule(regexp: RegExp, nodeType: NodeType, getAttrs: Function | { [key: string]: any }): Transaction;
export function blockQuoteRule(nodeType: NodeType): Transaction;
export function orderedListRule(nodeType: NodeType): Transaction;
export function bulletListRule(nodeType: NodeType): Transaction;
export function codeBlockRule(nodeType: NodeType): Transaction;
export function headingRule(nodeType: NodeType, maxLevel: number): Transaction;
