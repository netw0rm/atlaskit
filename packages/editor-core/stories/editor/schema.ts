import { Schema } from '../../src/prosemirror/future';
import { doc } from '../../src/schema/nodes/doc';
import { paragraph } from '../../src/schema/nodes/paragraph';
import { text } from '../../src/schema/nodes/text';

const nodes = { doc, paragraph, text };
const marks = {};

export default new Schema<typeof nodes, typeof marks>({ nodes, marks });
