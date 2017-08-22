import { uuid } from '../utils';

let staticValue: string | boolean = false;

export default {
  setStatic(value: string | boolean) {
    staticValue = value;
  },

  generate() {
    return staticValue || uuid();
  }
};
