import HyperlinkPlugin from '../src';
import { Slice, Node, Fragment } from 'prosemirror/dist/model';
import { Plugin, ProseMirror } from 'prosemirror/dist/edit';
import { schema } from 'prosemirror/dist/schema-basic';
import testing from 'ak-editor-test';
import * as chai from 'chai';
import { expect } from 'chai';

const { builder, chaiPlugin, makeEditor } = testing({ Fragment, Node, Plugin, schema, Slice })
const { a, code, doc, p, pre, slice, text } = builder;
chai.use(chaiPlugin);

describe('ak-editor-plugin-hyperlink paste transformer', () => {
  const editor = () => makeEditor({
    doc: doc(p()),
    plugin: HyperlinkPlugin,
  });

  function pasted(pm: ProseMirror, slice: Slice): Slice {
    return pm.on.transformPasted.dispatch(slice);
  };

  it('Should convert only the hyperlink and leave pading text intact', () => {
    const { pm } = editor();
    const actual = pasted(pm, slice(p('a http://a.com f')));
    const expected = slice(p('a ', a({ href: 'http://a.com' })('http://a.com'), ' f'));
    expect(actual).to.deep.equal(expected);
  });

  it('Should convert all occurrences to hyperlink and leave surrounding text intact', () => {
    const { pm } = editor();
    const actual = pasted(pm, slice(p('a http://a.com/ f http://b.com/')));
    const expected = slice(p(
      'a ',
      a({ href: 'http://a.com/' })('http://a.com/'),
      ' f ',
      a({ href: 'http://b.com/' })('http://b.com/')));
    expect(actual).to.deep.equal(expected);
  });

  it('Should convert hyperlinks on multiline pasted content', () => {
    const { pm } = editor();
    const actual = pasted(pm, slice(p('http://a.com/'), p('http://b.com/')));
    const expected = slice(
      p(a({ href: 'http://a.com/' })('http://a.com/')),
      p(a({ href: 'http://b.com/' })('http://b.com/')));
    expect(actual).to.deep.equal(expected);
  });

  it('Should convert all occurrences of hyperlinks on each multiline pasted content', () => {
    const { pm } = editor();
    const actual = pasted(pm,
      slice(
        p('a http://a.com/ f http://b.com/'),
        p('a http://a.com/ f http://b.com/')));
    const expected =
        slice(
          p('a ',
            a({ href: 'http://a.com/' })('http://a.com/'),
            ' f ',
            a({ href: 'http://b.com/' })('http://b.com/')),
          p('a ',
            a({ href: 'http://a.com/' })('http://a.com/'),
            ' f ',
            a({ href: 'http://b.com/' })('http://b.com/')));
    expect(actual).to.deep.equal(expected);
  });

  it('Should not convert links inside code blocks', () => {
    const { pm } = editor();
    const content = slice(pre(code('http://a.com/')));
    expect(pasted(pm, content)).to.deep.equal(content);
  });

  it('Should not convert links inside links', () => {
    const { pm } = editor();
    const content = slice(p(a({ href: 'http://a.com/' })('http://a.com/')));
    expect(pasted(pm, content)).to.deep.equal(content);
  });
});
