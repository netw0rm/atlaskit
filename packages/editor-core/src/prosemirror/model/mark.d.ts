import { MarkType } from '../';

export class Mark {
  type: MarkType;
  attrs: { [key: string]: any };
  toJSON(): { [key: string]: any };
  addToSet(set: Mark[]): Mark[];
  removeFromSet(set: Mark[]): Mark[];
  isInSet(set: Mark[]): boolean;
  eq(other: Mark): boolean;

  static sameSet(a: Mark[], b: Mark[]): boolean;
  static setFrom(marks?: Mark | Mark[]): Mark[];
  static none: Mark[];
}
