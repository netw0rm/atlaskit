import mocha from 'mocha';
import { default as chai, expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import HyperlinkPlugin from '../src';
import { chaiPlugin, makeEditor, insert } from 'ak-editor-test';
import { doc, link, linkable, schema, unlinkable } from './_schema-builder';

chai.use(chaiPlugin);
chai.use(sinonChai);

describe('ak-editor-plugin-hyperlink', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: HyperlinkPlugin, schema });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  it('defines a name for use by the ProseMirror plugin registry ', () => {
    const Plugin = HyperlinkPlugin as any; // .State is not public API.
    expect(Plugin.State.name).is.be.a('string');
  });

  describe('input rules', () => {
    it('should convert "www.atlassian.com " to hyperlink', () => {
      const { pm, sel } = editor(doc(linkable('{<>}')));
      pm.input.insertText(sel, sel, 'www.atlassian.com ');

      const a = link({ href: 'http://www.atlassian.com' })('www.atlassian.com')
      expect(pm.doc).to.deep.equal(doc(linkable(a, ' ')));
    });

    it('should convert "www.atlassian.com/ " to hyperlink', () => {
      const { pm, sel } = editor(doc(linkable('{<>}')));
      pm.input.insertText(sel, sel, 'www.atlassian.com/ ');

      const a = link({ href: 'http://www.atlassian.com/' })('www.atlassian.com/')
      expect(pm.doc).to.deep.equal(doc(linkable(a, ' ')));
    });

    it('should convert "http://www.atlassian.com/ " to hyperlink', () => {
      const { pm, sel } = editor(doc(linkable('{<>}')));
      pm.input.insertText(sel, sel, 'http://www.atlassian.com/ ');

      const a = link({ href: 'http://www.atlassian.com/' })('http://www.atlassian.com/')
      expect(pm.doc).to.deep.equal(doc(linkable(a, ' ')));
    });

    it('should convert "http://www.atlassian.com " to hyperlink', () => {
      const { pm, sel } = editor(doc(linkable('{<>}')));
      pm.input.insertText(sel, sel, 'http://www.atlassian.com ');

      const a = link({ href: 'http://www.atlassian.com' })('http://www.atlassian.com')
      expect(pm.doc).to.deep.equal(doc(linkable(a, ' ')));
    });

    it('should convert "https://www.atlassian.com/ " to hyperlink', () => {
      const { pm, sel } = editor(doc(linkable('{<>}')));
      pm.input.insertText(sel, sel, 'https://www.atlassian.com/ ');

      const a = link({ href: 'https://www.atlassian.com/' })('https://www.atlassian.com/')
      expect(pm.doc).to.deep.equal(doc(linkable(a, ' ')));
    });

    it('should convert "https://www.atlassian.com " to hyperlink', () => {
      const { pm, sel } = editor(doc(linkable('{<>}')));
      pm.input.insertText(sel, sel, 'https://www.atlassian.com ');

      const a = link({ href: 'https://www.atlassian.com' })('https://www.atlassian.com')
      expect(pm.doc).to.deep.equal(doc(linkable(a, ' ')));
    });

    it('should not convert "javascript://alert(1); " to hyperlink', () => {
      const { pm, sel } = editor(doc(linkable('{<>}')));
      pm.input.insertText(sel, sel, 'javascript://alert(1); ');
      expect(pm.doc).to.deep.equal(doc(linkable('javascript://alert(1); ')));
    });
  });

  describe('API', () => {
    it('should allow a change handler to be registered', () => {
      const { plugin } = editor(doc(linkable('')));

      plugin.subscribe(sinon.spy());
    });

    it('should get current state immediately once subscribed', () => {
      const { pm, plugin } = editor(doc(linkable('{<}text{>}')));
      const spy = sinon.spy();
      plugin.subscribe(spy);

      expect(spy).to.have.been.callCount(1);
    });

    it('should be able to register handlers for state change events', () => {
      const { pm, plugin } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('te{pos}xt'))));
      const spy = sinon.spy();
      plugin.subscribe(spy);

      pm.setTextSelection(pm.doc.refs['pos']);

      expect(spy).to.have.been.callCount(2);
    });

    it('sets canAddLink to false when in a context where links are not supported by the schema', () => {
      const { pm, plugin } = editor(doc(unlinkable('{<}text{>}')));

      expect(plugin.canAddLink).to.be.false;
    });

    it('should treat it as a link when selecting the whole link', () => {
      const { pm, plugin } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('{pos1}text{pos2}'))));
      const spy = sinon.spy();
      const { pos1, pos2 } = pm.doc.refs;
      plugin.subscribe(spy);

      pm.setTextSelection(pos1, pos2);

      expect(spy).to.have.been.callCount(2);
    });

    it('should treat it as a link when selecting part of the link', () => {
      const { pm, plugin } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('t{pos1}ext{pos2}'))));
      const spy = sinon.spy();
      const { pos1, pos2 } = pm.doc.refs;
      plugin.subscribe(spy);

      pm.setTextSelection(pos1, pos2);

      expect(spy).to.have.been.callCount(2);
    });

    it('should not treat it as a link when cursor is at the beginning of the link', () => {
      const { pm, plugin } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('{start}text'))));
      const spy = sinon.spy();
      plugin.subscribe(spy);

      pm.setTextSelection(pm.doc.refs['start']);

      expect(spy).to.have.been.callCount(1);
    });

    it('should not treat it as a link when cursor is at the end of the link', () => {
      const { pm, plugin } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('text{end}'))));
      const spy = sinon.spy();
      plugin.subscribe(spy);

      pm.setTextSelection(pm.doc.refs['end']);

      expect(spy).to.have.been.callCount(1);
    });

    it('does not emit `change` multiple times when the selection moves within a link', () => {
      const { pm, plugin } = editor(doc(linkable('{<>}text', link({ href: 'http://www.atlassian.com' })('l{pos1}i{pos2}nk'))));
      const spy = sinon.spy();
      const { pos1, pos2 } = pm.doc.refs;
      plugin.subscribe(spy);

      pm.setTextSelection(pos1);
      pm.setTextSelection(pos2);

      expect(spy).to.have.been.callCount(2);
    });

    it('emits change when the selection leaves a link', () => {
      const { pm, plugin } = editor(doc(linkable('te{textPos}xt {<>}')));
      const { textPos } = pm.doc.refs;
      const spy = sinon.spy();
      const { linkPos } = insert(pm, link({ href: 'http://www.atlassian.com' })('li{linkPos}nk'));
      pm.setTextSelection(linkPos);

      plugin.subscribe(spy);
      pm.setTextSelection(textPos);

      expect(spy).to.have.been.callCount(2);
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
      const { pm, plugin } = editor(doc(linkable('{<>}text')));

      expect(plugin.canAddLink).to.be.true;
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
  });
});
