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
    check('external link',
      `<p>Text <a class="external-link" href="https://atlassian.com" rel="nofollow">atlassian.com</a> text</p>`,
      doc(p('Text ', linkMark({ href: 'https://atlassian.com' })('atlassian.com'), ' text'))
    );

    check('mailto link',
      `<p>Text <a class="external-link" href="mailto:me@atlassian.com" rel="nofollow">me@atlassian.com</a> text</p>`,
      doc(p('Text ', linkMark({ href: 'mailto:me@atlassian.com' })('me@atlassian.com'), ' text'))
    );

    check('anchor',
      `<p>Text <a href="#hash">some anchor</a> text</p>`,
      doc(p('Text ', linkMark({ href: '#hash' })('some anchor'), ' text'))
    );
  });
});
