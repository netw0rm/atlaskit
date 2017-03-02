import { Node, NodeRange, NodeType } from '../';

export function liftTarget(range: NodeRange): number | undefined;

export function findWrapping(range: NodeRange, nodeType: NodeType, attrs?: { [key: string]: any }, innerRange?: NodeRange): { type: NodeType, attrs?: { [key: string]: any } }[] | null;

export function canSplit(doc: any, pos: number, depth?: number, typesAfter?: (null | {type: NodeType, attrs?: Object})[]): boolean;

export function canJoin(doc: Node, pos: number): boolean;

export function joinPoint(doc: Node, pos: number, dir?: number): number | null;

export function insertPoint(doc: Node, pos: number, nodeType: NodeType, attrs?: { [key: string]: any }): number | null;
