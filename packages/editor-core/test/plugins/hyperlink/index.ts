import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { TextSelection } from '../../../src/prosemirror';
import HyperlinkPlugin from '../../../src/plugins/hyperlink';
import { chaiPlugin, insert, makeEditor, dispatchKeypressEvent } from '../../../src/test-helper';
import { doc, paragraph, link, linkable, schema, unlinkable } from '../../_schema-builder';

chai.use(chaiPlugin);

describe('hyperlink', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: HyperlinkPlugin, schema });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  it('defines a name for use by the ProseMirror plugin registry ', () => {
    const plugin = HyperlinkPlugin as any; // .State is not public API.
    expect(plugin.State.name).is.be.a('string');
  });

  describe('input rules', () => {
    it('should convert "www.atlassian.com" to hyperlink', () => {
      const { pm, sel } = editor(doc(linkable('{<>}')));
      pm.input.insertText(sel, sel, 'www.atlassian.com');

      const a = link({ href: 'http://www.atlassian.com' })('www.atlassian.com');
      expect(pm.doc).to.deep.equal(doc(linkable(a)));
    });

    it('should convert "www.atlassian.com/" to hyperlink', () => {
      const { pm, sel } = editor(doc(linkable('{<>}')));
      pm.input.insertText(sel, sel, 'www.atlassian.com/');

      const a = link({ href: 'http://www.atlassian.com/' })('www.atlassian.com/');
      expect(pm.doc).to.deep.equal(doc(linkable(a)));
    });

    it('should convert "http://www.atlassian.com/" to hyperlink', () => {
      const { pm, sel } = editor(doc(linkable('{<>}')));
      pm.input.insertText(sel, sel, 'http://www.atlassian.com/');

      const a = link({ href: 'http://www.atlassian.com/' })('http://www.atlassian.com/');
      expect(pm.doc).to.deep.equal(doc(linkable(a)));
    });

    it('should convert "http://www.atlassian.com" to hyperlink', () => {
      const { pm, sel } = editor(doc(linkable('{<>}')));
      pm.input.insertText(sel, sel, 'http://www.atlassian.com');

      const a = link({ href: 'http://www.atlassian.com' })('http://www.atlassian.com');
      expect(pm.doc).to.deep.equal(doc(linkable(a)));
    });

    it('should convert "https://www.atlassian.com/" to hyperlink', () => {
      const { pm, sel } = editor(doc(linkable('{<>}')));
      pm.input.insertText(sel, sel, 'https://www.atlassian.com/');

      const a = link({ href: 'https://www.atlassian.com/' })('https://www.atlassian.com/');
      expect(pm.doc).to.deep.equal(doc(linkable(a)));
    });

    it('should convert "https://www.atlassian.com" to hyperlink', () => {
      const { pm, sel } = editor(doc(linkable('{<>}')));
      pm.input.insertText(sel, sel, 'https://www.atlassian.com');

      const a = link({ href: 'https://www.atlassian.com' })('https://www.atlassian.com');
      expect(pm.doc).to.deep.equal(doc(linkable(a)));
    });

    it('should not convert "javascript://alert(1) " to hyperlink', () => {
      const { pm, sel } = editor(doc(linkable('{<>}')));
      pm.input.insertText(sel, sel, 'javascript://alert(1);');
      expect(pm.doc).to.deep.equal(doc(linkable('javascript://alert(1);')));
    });
  });

  describe('active', () => {
    context('when select the whole hyperlink text from start to end', () => {
      it('is active', () => {
        const { pm, plugin } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('{pos1}text{pos2}'), 'after')));
        const { pos1, pos2 } = pm.doc.refs;

        pm.setTextSelection(pos1, pos2);

        expect(plugin.active).to.be.true;
      });
    });

    context('when select the whole hyperlink text from end to start', () => {
      it('is active', () => {
        const { pm, plugin } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('{pos1}text{pos2}'), 'after')));
        const { pos1, pos2 } = pm.doc.refs;

        pm.setTextSelection(pos2, pos1);

        expect(plugin.active).to.be.true;
      });
    });

    context('when select part of the hyperlink text from the end', () => {
      it('is active', () => {
        const { pm, plugin } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('t{pos1}ext{pos2}'), 'after')));
        const { pos1, pos2 } = pm.doc.refs;

        pm.setTextSelection(pos2, pos1);

        expect(plugin.active).to.be.true;
      });
    });

    context('when select part of the hyperlink text from the start', () => {
      it('is active', () => {
        const { pm, plugin } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('{pos1}t{pos2}ext'), 'after')));
        const { pos1, pos2 } = pm.doc.refs;

        pm.setTextSelection(pos1, pos2);

        expect(plugin.active).to.be.true;
      });
    });

    context('when select part of the hyperlink text in the middle', () => {
      it('is active', () => {
        const { pm, plugin } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('t{pos1}ex{pos2}t'), 'after')));
        const { pos1, pos2 } = pm.doc.refs;

        pm.setTextSelection(pos1, pos2);

        expect(plugin.active).to.be.true;
      });
    });

    context('when cursor is winthin hyperlink text', () => {
      it('is active', () => {
        const { plugin } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('tex{<>}t'), 'after')));

        expect(plugin.active).to.be.true;
      });
    });

    context('when cursor at the beginning of hyperlink text', () => {
      it('returns undefined', () => {
        const { plugin } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('{<>}text'), 'after')));

        expect(plugin.active).to.be.false;
      });
    });

    context('when cursor at the end of hyperlink text', () => {
      it('returns undefined', () => {
        const { plugin } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('text{<>}'), 'after')));

        expect(plugin.active).to.be.false;
      });
    });
  });

  describe('element', () => {
    context('when select the whole hyperlink text from start to end', () => {
      it('returns link element', () => {
        const { pm, plugin } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('{pos1}text{pos2}'), 'after')));
        const { pos1, pos2 } = pm.doc.refs;

        pm.setTextSelection(pos1, pos2);

        expect(plugin.element.tagName).to.eq('A');
      });
    });

    context('when select the whole hyperlink text from end to start', () => {
      it('returns link element', () => {
        const { pm, plugin } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('{pos1}text{pos2}'), 'after')));
        const { pos1, pos2 } = pm.doc.refs;

        pm.setTextSelection(pos2, pos1);

        expect(plugin.element.tagName).to.eq('A');
      });
    });

    context('when select part of the hyperlink text from the end', () => {
      it('returns link element', () => {
        const { pm, plugin } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('t{pos1}ext{pos2}'), 'after')));
        const { pos1, pos2 } = pm.doc.refs;

        pm.setTextSelection(pos2, pos1);

        expect(plugin.element.tagName).to.eq('A');
      });
    });

    context('when select part of the hyperlink text from the start', () => {
      it('returns link element', () => {
        const { pm, plugin } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('{pos1}t{pos2}ext'), 'after')));
        const { pos1, pos2 } = pm.doc.refs;

        pm.setTextSelection(pos1, pos2);

        expect(plugin.element.tagName).to.eq('A');
      });
    });

    context('when select part of the hyperlink text in the middle', () => {
      it('returns link element', () => {
        const { pm, plugin } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('t{pos1}ex{pos2}t'), 'after')));
        const { pos1, pos2 } = pm.doc.refs;

        pm.setTextSelection(pos1, pos2);

        expect(plugin.element.tagName).to.eq('A');
      });
    });

    context('when cursor is winthin hyperlink text', () => {
      it('returns undefined', () => {
        const { plugin } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('tex{<>}t'), 'after')));

        expect(plugin.element.tagName).to.eq('A');
      });
    });

    context('when cursor at the beginning of hyperlink text', () => {
      it('returns undefined', () => {
        const { plugin } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('{<>}text'), 'after')));

        expect(plugin.element).to.be.undefined;
      });
    });

    context('when cursor at the end of hyperlink text', () => {
      it('returns undefined', () => {
        const { plugin } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('text{<>}'), 'after')));

        expect(plugin.element).to.be.undefined;
      });
    });
  });

  describe('API', () => {
    it('should allow a change handler to be registered', () => {
      const { plugin } = editor(doc(linkable('')));

      plugin.subscribe(sinon.spy());
    });

    it('should get current state immediately once subscribed', () => {
      const { plugin } = editor(doc(linkable('{<}text{>}')));
      const spy = sinon.spy();
      plugin.subscribe(spy);

      expect(spy.callCount).to.equal(1);
    });

    it('should be able to register handlers for state change events', () => {
      const { pm, plugin } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('te{pos}xt'))));
      const spy = sinon.spy();
      plugin.subscribe(spy);

      pm.setTextSelection(pm.doc.refs['pos']);

      expect(spy.callCount).to.equal(2);
    });

    it('sets linkable to false when in a context where links are not supported by the schema', () => {
      const { plugin } = editor(doc(unlinkable('{<}text{>}')));

      expect(plugin.linkable).to.equal(false);
    });

    it('sets active to true when link is already in place', () => {
      const { plugin } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('{<}text{>}'))));

      expect(plugin.active).to.equal(true);
    });

    it('does not emit `change` multiple times when the selection moves within a link', () => {
      const { pm, plugin } = editor(doc(linkable('{<>}text', link({ href: 'http://www.atlassian.com' })('l{pos1}i{pos2}nk'))));
      const spy = sinon.spy();
      const { pos1, pos2 } = pm.doc.refs;
      plugin.subscribe(spy);

      pm.setTextSelection(pos1);
      pm.setTextSelection(pos2);

      expect(spy.callCount).to.equal(2);
    });

    it('emits change when the selection leaves a link', () => {
      const { pm, plugin } = editor(doc(linkable('te{textPos}xt {<>}')));
      const { textPos } = pm.doc.refs;
      const spy = sinon.spy();
      const { linkPos } = insert(pm, link({ href: 'http://www.atlassian.com' })('li{linkPos}nk'));
      pm.setTextSelection(linkPos);

      plugin.subscribe(spy);
      pm.setTextSelection(textPos);

      expect(spy.callCount).to.equal(2);
    });

    it('permits adding a link to an empty selection using the href', () => {
      const { pm, plugin } = editor(doc(linkable('{<>}')));
      const href = 'http://www.atlassian.com';

      plugin.addLink({ href });

      expect(pm.doc).to.deep.equal(doc(linkable(link({ href })(href))));
    });

    it('does not permit adding a link to an existing link', () => {
      const { pm, plugin } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('{<}link{>}'))));

      plugin.addLink({ href: 'http://www.example.com' });

      expect(pm.doc).to.deep.equal(doc(linkable(link({ href: 'http://www.atlassian.com' })('link'))));
    });

    it('does not permit adding a link when not supported by the schema', () => {
      const { pm, plugin } = editor(doc(unlinkable('{<}text{>}')));

      plugin.addLink({ href: 'http://www.atlassian.com' });

      expect(pm.doc).to.deep.equal(doc(unlinkable('text')));
    });

    it('requires href when adding a link', () => {
      const { pm, plugin } = editor(doc(linkable('{<}text{>}')));

      plugin.addLink({ href: 'http://example.com' });

      expect(pm.doc).to.deep.equal(doc(linkable(link({ href: 'http://example.com' })('text'))));
    });

    it('should not be a part of the link when typing before it', () => {
      const { pm, plugin } = editor(doc(linkable('a{before}{<}text{>}')));
      const { before } = pm.doc.refs;
      const href = 'http://example.com';

      plugin.addLink({ href });
      pm.tr.insertText(before, 'bar').apply();

      expect(pm.doc).to.deep.equal(doc(linkable(`abar`, link({ href })('text'))));
    });

    it('should be a part of the link when typing in it', () => {
      const { pm, plugin } = editor(doc(linkable('{<}te{middle}xt{>}')));
      const { middle } = pm.doc.refs;
      const href = 'http://example.com';

      plugin.addLink({ href });
      pm.tr.insertText(middle, 'bar').apply();

      expect(pm.doc).to.deep.equal(doc(linkable(link({ href })('tebarxt'))));
    });

    it('should not be a part of the link when typing after it', () => {
      const { pm, plugin } = editor(doc(linkable('{<}text{>}{end}')));
      const { end } = pm.doc.refs;
      const href = 'http://example.com';

      plugin.addLink({ href });
      pm.tr.insertText(end, 'bar').apply();

      expect(pm.doc).to.deep.equal(doc(linkable(link({ href })('text'), 'bar')));
    });

    it('should allow links to be added when the selection is empty', () => {
      const { plugin } = editor(doc(linkable('{<>}text')));

      expect(plugin.linkable).to.equal(true);
    });

    it('should not be able to unlink a node that has no link', () => {
      const { pm, plugin } = editor(doc(linkable('{<}text{>}')));

      plugin.removeLink();

      expect(pm.doc).to.deep.equal(doc(linkable('text')));
    });

    it('should be able to unlink an existing link', () => {
      const { pm, plugin } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('{<}text{>}'))));

      plugin.removeLink();

      expect(pm.doc).to.deep.equal(doc(linkable('text')));
    });

    context('when a link is in the second paragraph', () => {
      it('should be able to unlink that link', () => {
        const { pm, plugin } = editor(doc(paragraph('hello'), linkable(link({ href: 'http://www.atlassian.com' })('{<}text{>}'))));

        plugin.removeLink();

        expect(pm.doc).to.deep.equal(doc(paragraph('hello'), linkable('text')));
      });
    });

    it('should be able to update existing links with href', () => {
      const { pm, plugin } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('{<}text{>}'))));

      plugin.updateLink({ href: 'http://example.com' });

      expect(pm.doc).to.deep.equal(doc(linkable(link({ href: 'http://example.com' })('text'))));
    });

    it('should allow updating a link if new href is empty', () => {
      const { pm, plugin } = editor(doc(linkable(link({ href: 'http://example.com' })('{<}text{>}'))));

      plugin.updateLink({ href: '' });

      expect(pm.doc).to.deep.equal(doc(linkable(link({ href: '' })('text'))));
    });

    it('should not be able to update when not in a link', () => {
      const { pm, plugin } = editor(doc(linkable('{<}text{>}')));

      plugin.updateLink({ href: 'http://example.com/foo' });

      expect(pm.doc).to.deep.equal(doc(linkable('text')));
    });

    it('should escape from link mark when typing at the beginning of the link', () => {
      const { pm } = editor(doc(linkable(link({ href: 'http://example.com' })('text'))));

      pm.input.insertText(1, 1, '1');

      expect(pm.doc).to.deep.equal(doc(linkable('1', link({ href: 'http://example.com' })('text'))));
    });

    it('should not escape from link mark when typing at the middle of the link', () => {
      const { pm } = editor(doc(linkable(link({ href: 'http://example.com' })('text'))));

      pm.input.insertText(2, 2, '1');

      expect(pm.doc).to.deep.equal(doc(linkable(link({ href: 'http://example.com' })('t1ext'))));
    });

    it('should not escape from link mark when deliting second character', () => {
      const { pm } = editor(doc(linkable(link({ href: 'http://example.com' })('t{<>}ext'))));

      pm.input.dispatchKey('Delete');

      expect(pm.doc).to.deep.equal(doc(linkable(link({ href: 'http://example.com' })('txt'))));
    });

    it('should call subscribers when link was focused and then editor is blur', () => {
      const { pm, plugin } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('te{<>}xt'))));
      const spy = sinon.spy();
      plugin.subscribe(spy);
      pm.on.blur.dispatch();
      expect(spy.callCount).to.equal(2);
    });

    it('should not call subscribers if link was not focused when editor is blur', () => {
      const { pm, plugin } = editor(doc(paragraph('te{<>}st'), linkable(link({ href: 'http://www.atlassian.com' })('text'))));
      const spy = sinon.spy();
      plugin.subscribe(spy);
      pm.on.blur.dispatch();
      expect(spy.callCount).to.equal(1);
    });

    it('should not call subscribers if editor is focused but link is not focused', () => {
      const { pm, plugin } = editor(doc(paragraph('te{<>}st'), linkable(link({ href: 'http://www.atlassian.com' })('text'))));
      const spy = sinon.spy();
      plugin.subscribe(spy);
      pm.on.blur.dispatch();
      pm.on.focus.dispatch();
      expect(spy.callCount).to.equal(1);
    });

    it('should return referring DOM element', () => {
      const { plugin } = editor(doc(
        linkable(link({ href: 'http://www.atlassian.com' })('atlassian')),
        linkable(link({ href: 'http://www.stypositive.ru' })('d{<>}sorin'))));

      expect(plugin.element.text).to.eq('dsorin');
    });
  });

  describe('toolbarVisible', () => {
    context('when editor is blur', () => {
      it('it is false', () => {
        const { pm, plugin } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('te{<>}xt'))));
        pm.on.focus.dispatch();
        pm.on.blur.dispatch();
        expect(plugin.toolbarVisible).to.not.be.true;
      });
    });
  });

  describe('editorFocued', () => {
    context('when editor is focused', () => {
      it('it is true', () => {
        const { pm, plugin } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('te{<>}xt'))));
        pm.on.blur.dispatch();
        pm.on.focus.dispatch();
        expect(plugin.editorFocused).to.be.true;
      });
    });

    context('when editor is blur', () => {
      it('it is false', () => {
        const { pm, plugin } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('te{<>}xt'))));
        pm.on.blur.dispatch();
        expect(plugin.editorFocused).not.to.be.true;
      });
    });
  });

  describe('showLinkPanel', () => {
    context('when called without any selection in the editor', () => {
      it('should set state value showToolbarPanel to true', () => {
        const { plugin } = editor(doc(paragraph('testing')));
        plugin.showLinkPanel();
        expect(plugin.showToolbarPanel).to.be.true;
      });
    });

    context('when called without any selection in the editor', () => {
      it('should call subscribers', () => {
        const { plugin } = editor(doc(paragraph('testing')));
        const spy = sinon.spy();
        plugin.subscribe(spy);
        plugin.showLinkPanel();
        expect(spy.callCount).to.equal(2);
      });
    });

    context('when called with cursor in a link', () => {
      it('should not call subscribers', () => {
        const { plugin } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('te{<>}xt'))));
        const spy = sinon.spy();
        plugin.subscribe(spy);
        plugin.showLinkPanel();
        expect(spy.callCount).to.equal(1);
      });
    });

    context('when called with a selection in the editor', () => {
      it('should create a link node', () => {
        const { pm, plugin } = editor(doc(paragraph('testing')));
        pm.setSelection(new TextSelection(pm.doc.resolve(4), pm.doc.resolve(7)));
        plugin.showLinkPanel();
        expect(plugin.activeLinkNode).not.to.be.undefined;
        expect(plugin.text).not.to.be.undefined;
      });
    });
  });

  describe('Key Press Cmd-K', () => {
    context('when called without any selection in the editor', () => {
      it('should call subscribers', () => {
        const { pm, plugin } = editor(doc(paragraph('testing')));
        const spy = sinon.spy();
        plugin.subscribe(spy);
        dispatchKeypressEvent(pm, 'Mod-K');
        expect(spy.callCount).to.equal(2);
      });
    });

    context('when called with a selection in the editor', () => {
      it('should create a link node', () => {
        const { pm, plugin } = editor(doc(paragraph('testing')));
        pm.setSelection(new TextSelection(pm.doc.resolve(4), pm.doc.resolve(7)));
        dispatchKeypressEvent(pm, 'Mod-K');
        expect(plugin.activeLinkNode).not.to.be.undefined;
        expect(plugin.text).not.to.be.undefined;
      });
    });
  });
});
