import { Node } from '@atlaskit/editor-core';
import { chaiPlugin, markFactory, nodeFactory } from '@atlaskit/editor-core/dist/es5/test-helper';
import * as chai from 'chai';
import { expect } from 'chai';
import { name } from '../package.json';
import { encode, parse } from '../src/html';
import { JIRASchema, makeSchema } from '../src/schema';

chai.use(chaiPlugin);

const schema = makeSchema({ allowMentions: true }) as JIRASchema;

// Nodes
const mention = (attrs: { id: string, displayName?: string }) => schema.nodes.mention!.createChecked(attrs);
const doc = nodeFactory(schema.nodes.doc);
const p = nodeFactory(schema.nodes.paragraph);

// Marks
const mentionQuery = markFactory(schema.marks.mention_query!);

const mentionEncoder = (userId: string) => `/secure/ViewProfile?name=${userId}`;

function check(description: string, html: string, node: Node, customEncoders) {
  it(`parses HTML: ${description}`, () => {
    const actual = parse(html, schema);
    expect(actual).to.deep.equal(node);
  });

  it(`encodes HTML: ${description}`, () => {
    const encoded = encode(node, schema, customEncoders);
    expect(html).to.deep.equal(encoded);
  });

  it(`round-trips HTML: ${description}`, () => {
    const roundTripped = parse(encode(node, schema, customEncoders), schema);
    expect(roundTripped).to.deep.equal(node);
  });
};

describe(name, () => {
  describe('mentions', () => {
    it(`encodes HTML: mention_query mark`, () => {
      const encoded = encode(doc(p(mentionQuery('@star'))), schema, { mention: mentionEncoder });
      expect('<p>@star</p>').to.equal(encoded);
    });

    check('mention node',
      `<p>Text <a class="user-hover" href="/secure/ViewProfile?name=Starr" rel="Starr">@Cheryll Maust</a> text</p>`,
      doc(p('Text ', mention({ id: 'Starr', displayName: '@Cheryll Maust' }), ' text')),
      { mention: mentionEncoder }
    );
  });
});
