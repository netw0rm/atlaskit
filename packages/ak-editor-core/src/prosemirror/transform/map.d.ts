export interface Mappable {
  map(pos: number, bias: number | null);
  mapResult(pos: number, bias: number | null): MapResult;
}

export class MapResult {
  pos: number;
  deleted: boolean;
}

export class PosMap {
  constructor(ranges: number[]);

  mapResult(pos: number, bias?: number): MapResult;
  map(pos: number, bias?: number): number;
  forEach(f: (oldStart: number, oldEnd: number, newStart: number, newEnd: number) => void): void;
  invert(): PosMap;
}

export class Remapping {
  constructor(head?: PosMap[], tail?: PosMap[]);

  head: PosMap[];
  tail: PosMap[];
  addToFront(map: PosMap, corr?: number): number;
  addToBack(map: PosMap, corr?: number): number;
  mapResult(pos: number, bias?: number): MapResult;
  map(pos: number, bias?: number): number;
}

export function mapThrough(mappables: Mappable[], pos: number, bias?: number, start?: number): number;

export function mapThroughResult(mappables: Mappable[], pos: number, bias?: number, start?: number): MapResult;
