import { BasicNodeSerializer } from '../util';

export default class HardBreakSerializer extends BasicNodeSerializer {
  serialize() {
    return '\n';
  }
}
