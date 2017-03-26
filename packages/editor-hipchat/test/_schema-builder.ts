import { nodeFactory } from '@atlaskit/editor-core/dist/es5/test-helper';
import schema from '../src/schema';

export const doc = nodeFactory(schema.nodes.doc);
export const p = nodeFactory(schema.nodes.paragraph);
export const br = schema.node(schema.nodes.hard_break);
