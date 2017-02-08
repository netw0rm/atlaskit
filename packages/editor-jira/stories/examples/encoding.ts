import { markFactory, nodeFactory } from 'ak-editor-core/test-helper';
import { Node } from 'ak-editor-core';
import { JIRASchemaWithLists, makeSchema } from '../../src/schema';
import { encode } from '../../src/html';

const schema = makeSchema(true) as JIRASchemaWithLists;

// Nodes
const br = nodeFactory(schema.nodes.hard_break);
const doc = nodeFactory(schema.nodes.doc);
const h1 = nodeFactory(schema.nodes.heading, { level: 1 });
const h2 = nodeFactory(schema.nodes.heading, { level: 2 });
const h3 = nodeFactory(schema.nodes.heading, { level: 3 });
const h4 = nodeFactory(schema.nodes.heading, { level: 4 });
const h5 = nodeFactory(schema.nodes.heading, { level: 5 });
const h6 = nodeFactory(schema.nodes.heading, { level: 6 });
const p = nodeFactory(schema.nodes.paragraph);
const li = nodeFactory(schema.nodes.list_item);
const ol = nodeFactory(schema.nodes.ordered_list);
const ul = nodeFactory(schema.nodes.bullet_list);

// Marks
const strong = markFactory(schema.marks.strong);
const em = markFactory(schema.marks.em);
const mono = markFactory(schema.marks.mono);
const strike = markFactory(schema.marks.strike);
const sub = markFactory(schema.marks.subsup, { type: 'sub' });
const sup = markFactory(schema.marks.subsup, { type: 'sup' });
const u = markFactory(schema.marks.u);

interface ExampleSeed {
  description: string;
  doc: Node;
}

const seeds: ExampleSeed[] = [
  {
    description: 'Empty',
    doc: doc()
  },
  {
    description: 'Paragraph',
    doc: doc(p('Paragraph')),
  },
  {
    description: 'Strong',
    doc: doc(p(strong('Strong'))),
  },
  {
    description: 'Emphasis',
    doc: doc(p(em('Emphasis'))),
  },
  {
    description: 'Monospace',
    doc: doc(p(mono('Monospace'))),
  },
  {
    description: 'Strikethrough',
    doc: doc(p(strike('Strikethrough'))),
  },
  {
    description: 'Subscript',
    doc: doc(p(sub('Subscript'))),
  },
  {
    description: 'Superscript',
    doc: doc(p(sup('Superscript'))),
  },
  {
    description: 'Underline',
    doc: doc(p(u('underline'))),
  },
  {
    description: 'Combined styles (1)',
    doc: doc(p(strong('Strong', em('Emphasis', mono('Monospace', strike('Strikethrough', sub('Subscript', sup('Superscript', u('Underline'))))))))),
  },
  {
    description: 'Combined styles (2)',
    doc: doc(p(u('Underline', sup('Superscript', sub('Subscript', strike('Strikethrough', mono('Monospace', em('Emphasis', strong('Strong'))))))))),
  },
  {
    description: 'Heading 1',
    doc: doc(h1('Heading 1')),
  },
  {
    description: 'Heading 2',
    doc: doc(h2('Heading 2')),
  },
  {
    description: 'Heading 3',
    doc: doc(h3('Heading 3')),
  },
  {
    description: 'Heading 4',
    doc: doc(h4('Heading 4')),
  },
  {
    description: 'Heading 5',
    doc: doc(h5('Heading 5')),
  },
  {
    description: 'Heading 6',
    doc: doc(h6('Heading 6')),
  },
  {
    description: 'Unordered list (1)',
    doc: doc(ul(li(p('Item')))),
  },
  {
    description: 'Unordered list (2)',
    doc: doc(ul(li(p('Line 1', br(), 'Line 2')))),
  },
  {
    description: 'Unordered list (3)',
    doc: doc(ul(li(p('Item 1')), li(p('Item 2')))),
  },
  {
    description: 'Ordered list (1)',
    doc: doc(ol(li(p('Item')))),
  },
  {
    description: 'Ordered list (2)',
    doc: doc(ol(li(p('Line 1', br(), 'Line 2')))),
  },
  {
    description: 'Ordered list (3)',
    doc: doc(ol(li(p('Item 1')), li(p('Item 2')))),
  }
];

interface Example {
  description: string;
  editor: string;
  jira: string;
}

export default seeds.map(seed => ({
  description: seed.description,
  editor: seed.doc.toString(),
  jira: encode(seed.doc, schema),
})) as Example[];
