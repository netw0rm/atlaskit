import ListsPlugin from '../src';
import { chaiPlugin, makeEditor, doc, p, text, ol, ul, li } from 'ak-editor-test';
import * as chai from 'chai';
const { expect } = chai;
import sinonChai from 'sinon-chai';

chai.use(chaiPlugin);
chai.use(sinonChai);

describe('ak-editor-plugin-lists', () => {
  const editor = (doc: any) => makeEditor({ doc: doc, plugin: ListsPlugin });

  describe('API', () => {
    it('should allow a change handler to be attached', () => {
      const { plugin } = editor(doc(p()));
      const spy = sinon.spy()
      plugin.subscribe(spy);

      expect(spy).to.have.been.calledWith({
        active: false,
        enabled: true,
        type: null
      });
    });

    it('should emit a change when the selected node becomes an ordered list', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));
      const spy = sinon.spy()
      plugin.subscribe(spy);

      plugin.toggleList('ordered_list');

      expect(spy).to.have.been.callCount(2);

      expect(spy).to.have.been.calledWith({
        active: true,
        enabled: true,
        type: "ordered_list"
      });
    });

    it('should not emit extra change events when moving within an ordered list', () => {
      const { pm, plugin } = editor(doc(ol(li(p('t{<>}ex{end}t')))));
      const { end } = pm.doc.refs;
      const spy = sinon.spy();
      plugin.subscribe(spy);

      pm.setTextSelection(end);

      expect(spy).to.have.been.callCount(1);
    });

    it('should not emit extra change events when moving within an ordered list to the last character', () => {
      const { pm, plugin } = editor(doc(ol(li(p('t{<>}ext{end}')))));
      const { end } = pm.doc.refs;
      const spy = sinon.spy();
      plugin.subscribe(spy);

      pm.setTextSelection(end);

      expect(spy).to.have.been.callCount(1);
    });

    it('should emit change events when the state has changed', () => {
      const { plugin } = editor(doc(p('t{<}ex{>}t')));
      const spy = sinon.spy();
      plugin.subscribe(spy);

      plugin.toggleList('ordered_list');
      plugin.toggleList('ordered_list');
      plugin.toggleList('bullet_list');
      plugin.toggleList('bullet_list');

      expect(spy).to.have.been.callCount(5);
    });

    it('should emit change events when the state has changed with entire word selected', () => {
      const { plugin } = editor(doc(p('{<}text{>}')));
      const spy = sinon.spy();
      plugin.subscribe(spy);

      plugin.toggleList('ordered_list');
      plugin.toggleList('ordered_list');
      plugin.toggleList('bullet_list');
      plugin.toggleList('bullet_list');

      expect(spy).to.have.been.callCount(5);
    });

    it('should allow toggling between normal text and ordered list', () => {
      const { pm, plugin } = editor(doc(p('t{a}ex{b}t')));

      plugin.toggleList('ordered_list');
      expect(pm.doc).to.deep.equal(doc(ol(li(p('text')))));
      plugin.toggleList('ordered_list');
      expect(pm.doc).to.deep.equal(doc(p('text')));
    });

    it('should allow toggling between normal text and bullet list', () => {
      const { pm, plugin } = editor(doc(p('t{<}ex{>}t')));

      plugin.toggleList('bullet_list');
      expect(pm.doc).to.deep.equal(doc(ul(li(p('text')))));
      plugin.toggleList('bullet_list');
      expect(pm.doc).to.deep.equal(doc(p('text')));
    });

    it('should allow toggling between ordered and bullet list', () => {
      const { pm, plugin } = editor(doc(ol(li(p('t{<}ex{>}t')))));

      plugin.toggleList('bullet_list');
      expect(pm.doc).to.deep.equal(doc(ul(li(p('text')))));
      plugin.toggleList('bullet_list');
      expect(pm.doc).to.deep.equal(doc(p('text')));
    });
  });
});
