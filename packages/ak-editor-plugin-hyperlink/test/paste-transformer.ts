import { default as plugin } from '../src';
import { Slice, Node, Fragment } from 'prosemirror/dist/model';
import { ProseMirror } from 'prosemirror/dist/edit';
import { schema } from 'prosemirror/dist/schema-basic';
import testing from 'ak-editor-test';
import * as chai from 'chai';
import { expect } from 'chai';

const { builder, chaiEditor } = testing({ schema, Node, Slice, Fragment })
const { a, code, p, pre, slice, text } = builder;
chai.use(chaiEditor);

describe('ak-editor-plugin-hyperlink paste transformer', () => {
  const makeEditor = () => new ProseMirror({
    schema: schema,
    plugins: [plugin]
  });
  function pasted(pm: ProseMirror, slice: Slice): Slice {
    return pm.on.transformPasted.dispatch(slice);
  };

  it('Should convert only the hyperlink and leave pading text intact', () => {
    const pm = makeEditor();
    const actual = pasted(pm, slice(p('a http://a.com f')));
    const expected = slice(p('a ', a({ href: 'http://a.com' })('http://a.com'), ' f'));
    expect(actual).to.equal(expected);
  });

  it('Should convert all occurrences to hyperlink and leave surrounding text intact', () => {
    const pm = makeEditor();
    const actual = pasted(pm, slice(p('a http://a.com/ f http://b.com/')));
    const expected = slice(p(
      'a ',
      a({ href: 'http://a.com/' })('http://a.com/'),
      ' f ',
      a({ href: 'http://b.com/' })('http://b.com/')));
    expect(actual).to.equal(expected);
  });

  it('Should convert hyperlinks on multiline pasted content', () => {
    const pm = makeEditor();
    const actual = pasted(pm, slice(p('http://a.com/'), p('http://b.com/')));
    const expected = slice(
      p(a({ href: 'http://a.com/' })('http://a.com/')),
      p(a({ href: 'http://b.com/' })('http://b.com/')));
    expect(actual).to.equal(expected);
  });

  it('Should convert all occurrences of hyperlinks on each multiline pasted content', () => {
    const pm = makeEditor();
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
    expect(actual).to.equal(expected);
  });

  it('Should not convert links inside code blocks', () => {
    const pm = makeEditor();
    const content = slice(pre(code('http://a.com/')));
    expect(pasted(pm, content)).to.equal(content);
  });

  it('Should not convert links inside links', () => {
    const pm = makeEditor();
    const content = slice(p(a({ href: 'http://a.com/' })('http://a.com/')));
    expect(pasted(pm, content)).to.equal(content);
  });
});
