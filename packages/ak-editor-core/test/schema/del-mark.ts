import { schema } from '../../src/schema/schema';
import { Fragment, Node } from '../../src/prosemirror';
import { default as chai, expect } from 'chai';
import { chaiPlugin } from '../../src/test-helper';
import { fromHTML, toHTML } from '../../src/test-helper';

chai.use(chaiPlugin);

describe('Del mark - parsing from DOM', () => {
  const del = schema.marks.del.create();

  it('supports <del> tag', () => {
    const doc = fromHTML(`
      <p><del>text</del></p>
    `);

    debugger;
    expect(doc).to.have.textWithMarks('text', [ del ]);
  });

  it('supports <s> tag', () => {
    const doc = fromHTML(`
      <p><s>text</s></p>
    `);
    expect(doc).to.have.textWithMarks('text', [ del ]);
  });

  it('supports <strike> tag', () => {
    const doc = fromHTML(`
      <p><strike>text</strike></p>
    `);
    expect(doc).to.have.textWithMarks('text', [ del ]);
  });

  it('supports line-through text decoration', () => {
    const doc = fromHTML(`
      <p><span style="text-decoration: line-through">text</span></p>
    `);
    expect(doc).to.have.textWithMarks('text', [ del ]);
  });
});

describe('Del mark - serializing to DOM', () => {
  it('should render a <del> tag', () => {
    const node = schema.text('foo', [ schema.marks.del.create() ] );
    expect(toHTML(node)).to.equal('<del>foo</del>');
  });
});
