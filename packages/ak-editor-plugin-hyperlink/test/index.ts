import HyperlinkPlugin from '../src';
import { Plugin } from 'prosemirror/dist/edit';
import { Slice, Node, Fragment } from 'prosemirror/dist/model';
import { schema } from 'prosemirror/dist/schema-basic';
import testing from 'ak-editor-test';
import * as chai from 'chai';
import { expect } from 'chai';

const { builder, chaiPlugin, makeEditor } = testing({
  Fragment, Node, Plugin, Slice, schema });
const { doc, a, p, text, insert } = builder;
chai.use(chaiPlugin);

describe('ak-editor-plugin-hyperlink', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: HyperlinkPlugin });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  describe('input rules', () => {
    it('should convert "www.atlassian.com " to hyperlink', () => {
      const { pm, sel } = editor(doc(p('{<>}')));
      pm.input.insertText(sel, sel, 'www.atlassian.com ');

      const link = a({ href: 'http://www.atlassian.com' })('www.atlassian.com')
      expect(pm.doc).to.deep.equal(doc(p(link, ' ')));
    });

    it('should convert "www.atlassian.com/ " to hyperlink', () => {
      const { pm, sel } = editor(doc(p('{<>}')));
      pm.input.insertText(sel, sel, 'www.atlassian.com/ ');

      const link = a({ href: 'http://www.atlassian.com/' })('www.atlassian.com/')
      expect(pm.doc).to.deep.equal(doc(p(link, ' ')));
    });

    it('should convert "http://www.atlassian.com/ " to hyperlink', () => {
      const { pm, sel } = editor(doc(p('{<>}')));
      pm.input.insertText(sel, sel, 'http://www.atlassian.com/ ');

      const link = a({ href: 'http://www.atlassian.com/' })('http://www.atlassian.com/')
      expect(pm.doc).to.deep.equal(doc(p(link, ' ')));
    });

    it('should convert "http://www.atlassian.com " to hyperlink', () => {
      const { pm, sel } = editor(doc(p('{<>}')));
      pm.input.insertText(sel, sel, 'http://www.atlassian.com ');

      const link = a({ href: 'http://www.atlassian.com' })('http://www.atlassian.com')
      expect(pm.doc).to.deep.equal(doc(p(link, ' ')));
    });

    it('should convert "https://www.atlassian.com/ " to hyperlink', () => {
      const { pm, sel } = editor(doc(p('{<>}')));
      pm.input.insertText(sel, sel, 'https://www.atlassian.com/ ');

      const link = a({ href: 'https://www.atlassian.com/' })('https://www.atlassian.com/')
      expect(pm.doc).to.deep.equal(doc(p(link, ' ')));
    });

    it('should convert "https://www.atlassian.com " to hyperlink', () => {
      const { pm, sel } = editor(doc(p('{<>}')));
      pm.input.insertText(sel, sel, 'https://www.atlassian.com ');

      const link = a({ href: 'https://www.atlassian.com' })('https://www.atlassian.com')
      expect(pm.doc).to.deep.equal(doc(p(link, ' ')));
    });

    it('should not convert "javascript://alert(1); " to hyperlink', () => {
      const { pm, sel } = editor(doc(p('{<>}')));
      pm.input.insertText(sel, sel, 'javascript://alert(1); ');
      expect(pm.doc).to.deep.equal(doc(p('javascript://alert(1); ')));
    });
  });

  describe('API', () => {
    it('should allow a change handler to be registered', () => {
      const { plugin } = editor(doc(p('')));

      plugin.onChange(sinon.spy());
    });

    it('should be able to register handlers for state change events', () => {
      const { pm, plugin } = editor(doc(p('{<>}')));
      const spy = sinon.spy();
      const { pos } = insert(pm, a({ href: '' })('te{pos}xt'));
      plugin.onChange(spy);

      pm.setTextSelection(pos);

      expect(spy.callCount).to.equal(1);
    });

    it('does not emit `change` multiple times when the selection moves within a link', () => {
      const { pm, plugin } = editor(doc(p('{<>}')));
      const onChange = sinon.spy();
      const { pos1, pos2 } = insert(pm, 'text', a({ href: '' })('l{pos1}i{pos2}nk'));
      plugin.onChange(onChange);

      pm.setTextSelection(pos1);
      pm.setTextSelection(pos2);

      expect(onChange.callCount).to.equal(1);
    });

    it('emits change when the selection leaves a link', () => {
      const { pm, plugin } = editor(doc(p('te{textPos}xt {<>}')));
      const { textPos } = pm.doc.refs;
      const onChange = sinon.spy();
      const { linkPos } = insert(pm, a({ href: '' })('li{linkPos}nk'));
      pm.setTextSelection(linkPos);

      plugin.onChange(onChange);
      pm.setTextSelection(textPos);

      expect(onChange.callCount).to.equal(1);
    });

    it('does not permit adding a link to a collapsed selection', () => {
      const { pm, plugin } = editor(doc(p('{<>}')));

      expect(plugin.addLink({ href: '' })).to.be.false;
      expect(pm.doc).to.deep.equal(doc(p()));
    });

    it('does not permit adding a link to an existing link', () => {
      const { pm, plugin } = editor(doc(p(a({ href: '' })('{<}link{>}'))));

      expect(plugin.addLink({ href: '' })).to.be.false;
      expect(pm.doc).to.deep.equal(doc(p(a({ href: '' })('link'))));
    });

    it('does not permit adding a link when in the disabled state', () => {
      const { pm, plugin } = editor(doc(p('{<}text{>}')));
      plugin.setState({ enabled: false });

      expect(plugin.addLink({ href: '' })).to.be.false;
      expect(pm.doc).to.deep.equal(doc(p('text')));
    });

    it('allows options when adding a link', () => {
      const { pm, plugin } = editor(doc(p('{<}text{>}')));

      expect(plugin.addLink({ href: 'http://example.com' })).to.be.true;
      expect(pm.doc).to.deep.equal(doc(p(a({ href: 'http://example.com' })('text'))));
    });

    it('should be able to create a link with new text', () => {
      const { pm, plugin } = editor(doc(p('{<}text{>}')));
      const href = 'http://example.com';
      const text = 'foo';

      expect(plugin.addLink({ href, text })).to.be.true;
      expect(pm.doc).to.deep.equal(doc(p(a({ href: href })(text))));
    });

    it('should not be able to unlink a node that has no link', () => {
      const { pm, plugin } = editor(doc(p('{<}text{>}')));

      expect(plugin.removeLink()).to.be.false;
      expect(pm.doc).to.deep.equal(doc(p('text')));
    });

    it('should be able to unlink an existing link', () => {
      const { pm, plugin } = editor(doc(p(a({ href: '' })('{<}text{>}'))));

      expect(plugin.removeLink()).to.be.true;
      expect(pm.doc).to.deep.equal(doc(p('text')));
    });

    it('should be able to update existing links with HyperLinkOptions', () => {
      const { pm, plugin } = editor(doc(p(a({ href: '' })('{<}text{>}'))));

      expect(plugin.updateLink({
        href: 'http://example.com',
        text: 'foo'
      })).to.be.true;
      expect(pm.doc).to.deep.equal(doc(p(a({ href: 'http://example.com' })('foo'))));
    });

    it('should not be able to update when not in a link', () => {
      const { pm, plugin } = editor(doc(p('{<}text{>}')));

      expect(plugin.updateLink({
        href: 'http://example.com/foo',
        text: 'example/foo'
      })).to.be.false;
      expect(pm.doc).to.deep.equal(doc(p('text')));
    });

    it('requires options when updating a link', () => {
      const { pm, plugin } = editor(doc(p(a({ href: '' })('{<}text{>}'))));

      expect(plugin.updateLink()).to.be.false;
      expect(pm.doc).to.deep.equal(doc(p(a({ href: '' })('text'))));
    });
  });
});
