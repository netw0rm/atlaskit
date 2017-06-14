import { BasicNodeSerializer } from '../util';

export default class BlockquoteSerializer extends BasicNodeSerializer {
  serialize() {
    return '-----';
  }
}
