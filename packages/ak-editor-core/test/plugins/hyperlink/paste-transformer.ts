import mocha from 'mocha';
import HyperlinkPlugin from '../../../src/plugins/hyperlink';
import { Slice, ProseMirror, chaiPlugin, code_block, makeEditor, a, mono, doc, p, slice, text } from '../../../src';
import { default as chai, expect } from 'chai';

chai.use(chaiPlugin);

describe('hyperlink paste transformer', () => {
  const pre = code_block();
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

  it('Should convert links inside mono marks', () => {
    const { pm } = editor();
    const content = slice(p(mono('http://a.com/')));
    expect(pasted(pm, content)).to.deep.equal(slice(p(a({ href: 'http://a.com/' })(mono('http://a.com/')))));
  });

  it('Should not convert links inside links', () => {
    const { pm } = editor();
    const content = slice(p(a({ href: 'http://a.com/' })('http://a.com/')));
    expect(pasted(pm, content)).to.deep.equal(content);
  });
});
