import { Node } from 'ak-editor-core';
import { chaiPlugin, markFactory, nodeFactory } from 'ak-editor-core/test-helper';
import * as chai from 'chai';
import { expect } from 'chai';
import { name } from '../package.json';
import { encode, parse } from '../src/html';
import { JIRASchemaWithLists, makeSchema } from '../src/schema';

chai.use(chaiPlugin);

const schema = makeSchema(true) as JIRASchemaWithLists;

// Nodes
const ul = nodeFactory(schema.nodes.bullet_list);
const doc = nodeFactory(schema.nodes.doc);
const p = nodeFactory(schema.nodes.paragraph);
const li = nodeFactory(schema.nodes.list_item);
const ol = nodeFactory(schema.nodes.ordered_list);

// Marks
const strong = markFactory(schema.marks.strong);

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
  describe('lists', () => {
    check('bullet list',
      '<ul class="alternate" type="square"><li>one</li><li>two</li></ul>',
      doc(
        ul(
          li(p('one')),
          li(p('two'))
        )
      ));

    check('ordered list',
      '<ol><li>one</li><li>two</li></ol>',
      doc(
        ol(
          li(p('one')),
          li(p('two'))
        )
      ));

    check('bullet list with strong',
      '<ul class="alternate" type="square"><li>A piggy</li><li><b>Bigger</b> piggy</li></ul>',
      doc(
        ul(
          li(p('A piggy')),
          li(p(strong('Bigger'), ' piggy'))
        )
      ));

    check('ordered list with strong',
      '<ol><li>A piggy</li><li><b>Bigger</b> piggy</li></ol>',
      doc(
        ol(
          li(p('A piggy')),
          li(p(strong('Bigger'), ' piggy'))
        )
      ));
  });
});
