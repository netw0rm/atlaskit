import { default as plugin } from '../src';
import { Plugin, ProseMirror } from 'prosemirror/dist/edit';
import { Slice, Node, Fragment } from 'prosemirror/dist/model';
import { schema } from 'prosemirror/dist/schema-basic';
import testing from 'ak-editor-test';
import * as chai from 'chai';
import { expect } from 'chai';

const { builder, chaiEditor, insertText, insert, SyncPlugin } = testing({
  Fragment, Node, Plugin, Slice, schema });
const { doc, a, p, text } = builder;
chai.use(chaiEditor);

describe('ak-editor-plugin-hyperlink', () => {
  const makeEditor = () => new ProseMirror({
    schema: schema,
    plugins: [plugin, SyncPlugin]
  });

  describe('input rules', () => {
    it('should convert "www.atlassian.com " to hyperlink', () => {
      const pm = makeEditor();
      insertText(pm, 'www.atlassian.com ');
      const link = a({ href: 'http://www.atlassian.com' })('www.atlassian.com')
      expect(pm.doc).to.equal(doc(p(link, ' ')));
    });

    it('should convert "www.atlassian.com/ " to hyperlink', () => {
      const pm = makeEditor();
      insertText(pm, 'www.atlassian.com/ ');
      const link = a({ href: 'http://www.atlassian.com/' })('www.atlassian.com/')
      expect(pm.doc).to.equal(doc(p(link, ' ')));
    });

    it('should convert "http://www.atlassian.com/ " to hyperlink', () => {
      const pm = makeEditor();
      insertText(pm, 'http://www.atlassian.com/ ');
      const link = a({ href: 'http://www.atlassian.com/' })('http://www.atlassian.com/')
      expect(pm.doc).to.equal(doc(p(link, ' ')));
    });

    it('should convert "http://www.atlassian.com " to hyperlink', () => {
      const pm = makeEditor();
      insertText(pm, 'http://www.atlassian.com ');
      const link = a({ href: 'http://www.atlassian.com' })('http://www.atlassian.com')
      expect(pm.doc).to.equal(doc(p(link, ' ')));
    });

    it('should convert "https://www.atlassian.com/ " to hyperlink', () => {
      const pm = makeEditor();
      insertText(pm, 'https://www.atlassian.com/ ');
      const link = a({ href: 'https://www.atlassian.com/' })('https://www.atlassian.com/')
      expect(pm.doc).to.equal(doc(p(link, ' ')));
    });

    it('should convert "https://www.atlassian.com " to hyperlink', () => {
      const pm = makeEditor();
      insertText(pm, 'https://www.atlassian.com ');
      const link = a({ href: 'https://www.atlassian.com' })('https://www.atlassian.com')
      expect(pm.doc).to.equal(doc(p(link, ' ')));
    });

    it('should not convert "javascript://alert(1); " to hyperlink', () => {
      const pm = makeEditor();
      insertText(pm, 'javascript://alert(1); ');
      expect(pm.doc).to.equal(doc(p('javascript://alert(1); ')));
    });
  });

  describe('API', () => {
    it('should be able to register handlers for state change events', () => {
      const pm = makeEditor();
      const spy = sinon.spy();
      plugin.get(pm).onChange(spy);

      insert(pm, a({ href: '' })('text'));
      pm.setTextSelection(2);
      pm.on.flush.dispatch();

      expect(spy.callCount).to.equal(1);
    });

    it('should not emit extra change events when state has not changed', () => {
      const pm = makeEditor();
      const onChange = sinon.spy();
      plugin.get(pm).onChange(onChange);

      insert(pm, 'text', a({ href: '' })('link'));
      pm.setTextSelection(7);
      pm.setTextSelection(6);

      expect(onChange.callCount).to.equal(1);
    });

    it('should emit change events when the state has changed', () => {
      const pm = makeEditor();
      const onChange = sinon.spy();
      plugin.get(pm).onChange(onChange);

      insert(pm, 'text', a({ href: '' })('link'));
      pm.setTextSelection(7);
      pm.setTextSelection(3);

      expect(onChange.callCount).to.equal(2);
    });

    it('should not be able to create a link on empty selection', () => {
      const pm = makeEditor();

      insert(pm, 'text');
      pm.setTextSelection(2);

      expect(plugin.get(pm).addLink({ href: '' })).to.be.false;
      expect(pm.doc).to.equal(doc(p('text')));
    });

    it('should not be able to create a link on a link', () => {
      const pm = makeEditor();

      insert(pm, a({ href: '' })('link'));
      pm.setTextSelection(1, 5);

      expect(plugin.get(pm).addLink({ href: '' })).to.be.false;
      expect(pm.doc).to.equal(doc(p(a({ href: '' })('link'))));
    });

    it('should not be able to create a link when state is disabled', () => {
      const pm = makeEditor();

      insert(pm, 'text');
      pm.setTextSelection(1, 5);
      plugin.get(pm).setState({ enabled: false });

      expect(plugin.get(pm).addLink({ href: '' })).to.be.false;
      expect(pm.doc).to.equal(doc(p('text')));
    });

    it('should be able to create a link with HyperLinkOptions', () => {
      const pm = makeEditor();

      insert(pm, 'text');
      pm.setTextSelection(1, 5);

      expect(plugin.get(pm).addLink({ href: 'http://example.com' })).to.be.true;
      expect(pm.doc).to.equal(doc(p(a({ href: 'http://example.com' })('text'))));
    });

    it('should be able to create a link with new text', () => {
      const pm = makeEditor();
      const href = 'http://example.com';
      const text = 'foo';

      insert(pm, 'text');
      pm.setTextSelection(1, 5);

      expect(plugin.get(pm).addLink({ href, text })).to.be.true;
      expect(pm.doc).to.equal(doc(p(a({ href: href })(text))));
    });

    it('should not be able to unlink a node that has no link', () => {
      const pm = makeEditor();

      insert(pm, 'text');
      pm.setTextSelection(1, 5);

      expect(plugin.get(pm).removeLink()).to.be.false;
      expect(pm.doc).to.equal(doc(p('text')));
    });

    it('should be able to unlink an existing link', () => {
      const pm = makeEditor();

      insert(pm, a({ href: '' })('text'));
      pm.setTextSelection(1, 5);

      expect(plugin.get(pm).removeLink()).to.be.true;
      expect(pm.doc).to.equal(doc(p('text')));
    });

    it('should be able to update existing links with HyperLinkOptions', () => {
      const pm = makeEditor();

      insert(pm, a({ href: 'http://example.com' })('text'));
      pm.setTextSelection(1, 5);

      expect(plugin.get(pm).updateLink({
        href: 'http://example.com/foo',
        text: 'example/foo'
      })).to.be.true;
      expect(pm.doc).to.equal(doc(p(a({ href: 'http://example.com/foo' })('example/foo'))));
    });

    it('should not be able to update when not in a link', () => {
      const pm = makeEditor();

      insert(pm, 'text');
      pm.setTextSelection(1, 5);

      expect(plugin.get(pm).updateLink({
        href: 'http://example.com/foo',
        text: 'example/foo'
      })).to.be.false;
      expect(pm.doc).to.equal(doc(p('text')));
    });

    it('should not be able to update existing links when not passing HyperLinkOptions', () => {
      const pm = makeEditor();

      insert(pm, a({ href: '' })('text'));
      pm.setTextSelection(1, 5);

      expect(plugin.get(pm).updateLink()).to.be.false;
      expect(pm.doc).to.equal(doc(p(a({ href: '' })('text'))));
    });
  });
});
