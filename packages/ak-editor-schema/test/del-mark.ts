import { schema as schemaSpec } from '../src/schema';
import { Fragment, Node, Schema } from 'ak-editor-prosemirror';
import * as chai from 'chai';
import { assert } from 'chai';

// FIXME: initiazling schema should happen in src/schema.ts
const schema = new Schema(schemaSpec);

const parse = (html: string) => {
  const el = document.createElement('div');
  el.innerHTML = html;
  return schema.parseDOM(el);
}

const hasDelMark = (doc: Node) => {
  return assert(doc.rangeHasMark(0, 2, schema.marks['del']), 'should contain del mark');
}

const matchDOM = (node: Node, html: string) => {
  const el = document.createElement('div');
  el.appendChild(node.toDOM());
  return assert(el.innerHTML === html, 'not the expected DOM output');
}

describe('Del mark - parsing from DOM', () => {
  it('supports <del> tag', () => {
    const doc = parse(`
      <p><del>text</del></p>
    `);
    hasDelMark(doc);
  });

  it('supports <s> tag', () => {
    const doc = parse(`
      <p><s>text</s></p>
    `);
    hasDelMark(doc);
  });

  it('supports <strike> tag', () => {
    const doc = parse(`
      <p><strike>text</strike></p>
    `);
    hasDelMark(doc);
  });

  it('supports line-through text decoration', () => {
    const doc = parse(`
      <p><span style="text-decoration: line-through">text</span></p>
    `);
    hasDelMark(doc);
  });
});

describe('Del mark - serializing to DOM', () => {
  it('should render a <del> tag', () => {
    const node = schema.text('foo', [ schema.marks['del'].create({}) ] );
    matchDOM(node, '<del>foo</del>');
  });
});
