import { BasicNodeSerializer } from '../util';

export default class ImageSerializer extends BasicNodeSerializer {
  serialize() {
    const { alt, src } = this.node.attrs;

    if (alt) {
      return `image (${alt})`;
    }

    if (src) {
      return `image (${src})`;
    }

    return 'image';
  }
}
