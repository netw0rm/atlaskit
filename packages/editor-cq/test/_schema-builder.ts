import { markFactory, nodeFactory } from '@atlaskit/editor-core/dist/es5/test-helper';
import schema from '../src/schema';

// Nodes
export const ul = nodeFactory(schema.nodes.bullet_list);
export const doc = nodeFactory(schema.nodes.doc);
export const p = nodeFactory(schema.nodes.paragraph);
export const blockquote = nodeFactory(schema.nodes.blockquote);
export const br = schema.node(schema.nodes.hard_break);
export const h1 = nodeFactory(schema.nodes.heading, { level: 1 });
export const h2 = nodeFactory(schema.nodes.heading, { level: 2 });
export const h3 = nodeFactory(schema.nodes.heading, { level: 3 });
export const h4 = nodeFactory(schema.nodes.heading, { level: 4 });
export const h5 = nodeFactory(schema.nodes.heading, { level: 5 });
export const h6 = nodeFactory(schema.nodes.heading, { level: 6 });
export const hr = nodeFactory(schema.nodes.horizontal_rule);
export const li = nodeFactory(schema.nodes.list_item);
export const ol = nodeFactory(schema.nodes.ordered_list);
export const unsupportedBlock = (cxhtml: string) => nodeFactory(schema.nodes.unsupportedBlock, { cxhtml })();
export const unsupportedInline = (cxhtml: string) => nodeFactory(schema.nodes.unsupportedInline, { cxhtml })();

// Marks
export const code = markFactory(schema.marks.code);
export const strike = markFactory(schema.marks.strike);
export const em = markFactory(schema.marks.em);
export const strong = markFactory(schema.marks.strong);
export const sub = markFactory(schema.marks.subsup, { type: 'sub' });
export const sup = markFactory(schema.marks.subsup, { type: 'sup' });
export const u = markFactory(schema.marks.u);
