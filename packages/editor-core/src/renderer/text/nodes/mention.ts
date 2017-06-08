import { BasicNodeSerializer } from '../util';

export default class MentionSerializer extends BasicNodeSerializer {
  serialize() {
    const { text } = this.node.attrs;
    return text.replace(/^@/, '');
  }
}
