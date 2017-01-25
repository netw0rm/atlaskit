import { Node, NodeRange, NodeType } from '../';

export function liftTarget(range: NodeRange): number | null;

export function findWrapping(range: NodeRange, nodeType: NodeType, attrs?: { [key: string]: any }): { type: NodeType, attrs?: { [key: string]: any } }[] | null;

export function canSplit(doc: Node, pos: number, depth?: NodeType, typeAfter?: { [key: string]: any }): boolean;

export function joinable(doc: Node, pos: number): boolean;

export function joinPoint(doc: Node, pos: number, dir?: number): number | null;

export function insertPoint(doc: Node, pos: number, nodeType: NodeType, attrs?: { [key: string]: any }): number | null;
