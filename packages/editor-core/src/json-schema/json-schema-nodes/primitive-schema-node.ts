import { PrimitiveType } from './schema-node';
import SchemaNodeWithVadators, { Indexed } from './schema-node-with-validators';

export default class PrimitiveSchemaNode<
  T extends Indexed
  > extends SchemaNodeWithVadators<T> {
  constructor(type: PrimitiveType, validators: T = {} as T) {
    super(type, validators);
  }

  toJSON(): object {
    const keys = Object.keys(this.validators) as [keyof T];
    const obj = { type: this.type };
    return keys.length ? this.mergeValidationInfo(keys, obj) : obj;
  }
}

export { Indexed };
