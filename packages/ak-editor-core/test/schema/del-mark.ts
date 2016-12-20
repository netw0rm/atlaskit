import { schema } from '../_schema-builder';
import { Fragment, Node } from '../../src';
import { chaiPlugin, fromHTML as fromHTML_, toHTML } from '../../test-helper';
import * as chai from 'chai';
import { expect } from 'chai';

chai.use(chaiPlugin);

const fromHTML = (html: string) => fromHTML_(html, schema);

describe('Del mark - parsing from DOM', () => {
  const del = schema.marks.del.create();

  it('supports <del> tag', () => {
    const doc = fromHTML(`
      <p><del>text</del></p>
    `);

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
