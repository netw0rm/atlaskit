import { BasicNodeSerializer } from '../util';

const DELIMITER = '\n';

export default class BlockquoteSerializer extends BasicNodeSerializer {
  serialize() {
    const nodeText = super.serialize();

    return nodeText
      .split(DELIMITER)
      .map(line => `> ${line}`)
      .join(DELIMITER);
  }
}
