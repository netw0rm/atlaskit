import { schema } from '../src/schema';
import { Fragment, Node } from 'ak-editor-prosemirror';
import * as chai from 'chai';
import { expect } from 'chai';
import { chaiPlugin } from 'ak-editor-test';

chai.use(chaiPlugin);

const parse = (html: string) => {
  const el = document.createElement('div');
  el.innerHTML = html;
  return schema.parseDOM(el);
}

const toHTML = (node: Node) => {
  const el = document.createElement('div');
  el.appendChild(node.toDOM());
  return el.innerHTML
}

describe('Del mark - parsing from DOM', () => {
  const del = schema.marks['del'].create({});

  it('supports <del> tag', () => {
    const doc = parse(`
      <p><del>text</del></p>
    `);
    expect(doc).to.have.textWithMarks('text', [ del ]);
  });

  it('supports <s> tag', () => {
    const doc = parse(`
      <p><s>text</s></p>
    `);
    expect(doc).to.have.textWithMarks('text', [ del ]);
  });

  it('supports <strike> tag', () => {
    const doc = parse(`
      <p><strike>text</strike></p>
    `);
    expect(doc).to.have.textWithMarks('text', [ del ]);
  });

  it('supports line-through text decoration', () => {
    const doc = parse(`
      <p><span style="text-decoration: line-through">text</span></p>
    `);
    expect(doc).to.have.textWithMarks('text', [ del ]);
  });
});

describe('Del mark - serializing to DOM', () => {
  it('should render a <del> tag', () => {
    const node = schema.text('foo', [ schema.marks['del'].create({}) ] );
    expect(toHTML(node)).to.equal('<del>foo</del>');
  });
});
