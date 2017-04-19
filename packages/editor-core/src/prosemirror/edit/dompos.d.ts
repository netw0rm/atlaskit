import { DOMNode } from '../dom';
import { ProseMirror } from '../';

export function posFromDOM(dom: DOMNode, domOffset: number|null): {pos: number, inLeaf: number};

export function childContainer(dom: DOMNode): DOMNode | null;

export function DOMFromPos(pm: ProseMirror, pos: number, /* private */loose?: boolean): { node: DOMNode, offset: number };

export function DOMFromPosFromEnd(pm: ProseMirror, pos: number): { node: DOMNode, offset: number };

export function DOMAfterPos(pm: ProseMirror, pos: number): DOMNode;

export function coordsAtPos(pm: ProseMirror, pos: number): ClientRect;
