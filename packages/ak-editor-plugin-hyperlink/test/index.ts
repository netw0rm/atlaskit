import HyperlinkPlugin from '../src';
import { chaiPlugin, makeEditor, doc, a, p, text, insert } from 'ak-editor-test';
import * as chai from 'chai';
import { expect } from 'chai';
import sinonChai from 'sinon-chai';

chai.use(chaiPlugin);
chai.use(sinonChai);

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

      plugin.subscribe(sinon.spy());
    });

    it('should get current state immediately once subscribed', () => {
      const { pm, plugin } = editor(doc(p(a({ href: '' })('text'))));
      const spy = sinon.spy();
      plugin.subscribe(spy);

      expect(spy).to.have.been.callCount(1);

      expect(spy).to.have.been.calledWith({
        active: false,
        element: null,
        enabled: true,
        href: "",
        rel: "",
        target: "",
        text: "",
        title: "",
      });
    });

    it('should be able to register handlers for state change events', () => {
      const { pm, plugin } = editor(doc(p(a({ href: '' })('te{pos}xt'))));
      const spy = sinon.spy();
      plugin.subscribe(spy);

      pm.setTextSelection(pm.doc.refs.pos);

      expect(spy).to.have.been.callCount(2);
    });

    it('does not emit `change` multiple times when the selection moves within a link', () => {
      const { pm, plugin } = editor(doc(p('{<>}text', a({ href: '' })('l{pos1}i{pos2}nk'))));
      const spy = sinon.spy();
      const { pos1, pos2 } = pm.doc.refs;
      plugin.subscribe(spy);

      pm.setTextSelection(pos1);
      pm.setTextSelection(pos2);

      expect(spy).to.have.been.callCount(2);
    });

    it('emits change when the selection leaves a link', () => {
      const { pm, plugin } = editor(doc(p('te{textPos}xt {<>}')));
      const { textPos } = pm.doc.refs;
      const spy = sinon.spy();
      const { linkPos } = insert(pm, a({ href: '' })('li{linkPos}nk'));
      pm.setTextSelection(linkPos);

      plugin.subscribe(spy);
      pm.setTextSelection(textPos);

      expect(spy).to.have.been.callCount(2);
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

    it('should not be able to link if selection is empty', () => {
      const { pm, plugin } = editor(doc(p('{<}text{>}')));
      pm.setTextSelection(1);
      const { enabled } = plugin.getState();

      expect(enabled).to.equal(false);
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
