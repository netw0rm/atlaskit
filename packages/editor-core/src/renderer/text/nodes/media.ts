import { BasicNodeSerializer } from '../util';

export default class MediaSerializer extends BasicNodeSerializer {
  serialize() {
    const { id, collection } = this.node.attrs;
    return `media attachment (${id} in collection ${collection})`;
  }
}
