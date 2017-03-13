import { Node } from '@atlaskit/editor-core';
import { chaiPlugin, markFactory, nodeFactory } from '@atlaskit/editor-core/src/test-helper';
import * as chai from 'chai';
import { expect } from 'chai';
import { name } from '../package.json';
import { encode, parse } from '../src/html';
import { JIRASchema, makeSchema } from '../src/schema';

chai.use(chaiPlugin);

const schema = makeSchema({ allowLinks: true }) as JIRASchema;

// Nodes
const doc = nodeFactory(schema.nodes.doc);
const p = nodeFactory(schema.nodes.paragraph);

// Marks
const linkMark = (attrs) => markFactory(schema.marks.link!, attrs);

function check(description: string, html: string, node: Node) {
  it(`parses HTML: ${description}`, () => {
    const actual = parse(html, schema);
    expect(actual).to.deep.equal(node);
  });

  it(`encodes HTML: ${description}`, () => {
    const encoded = encode(node, schema);
    expect(html).to.deep.equal(encoded);
  });

  it(`round-trips HTML: ${description}`, () => {
    const roundTripped = parse(encode(node, schema), schema);
    expect(roundTripped).to.deep.equal(node);
  });
};

describe(name, () => {
  describe('links', () => {
    check('link mark',
      `<p>Text <a href="atlassian.com">atlassian.com</a> text</p>`,
      doc(p('Text ', linkMark({ href: 'atlassian.com' })('atlassian.com'), ' text'))
    );
  });
});
