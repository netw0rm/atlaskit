import ListsPlugin from '../src';
import { Plugin } from 'prosemirror/dist/edit';
import { Slice, Node, Fragment } from 'prosemirror/dist/model';
import { schema } from 'prosemirror/dist/schema-basic';
import testing from 'ak-editor-test';
import * as chai from 'chai';
const { expect } = chai;

const { builder, chaiPlugin, makeEditor } = testing({
  Fragment, Node, Plugin, schema, Slice })
const { doc, p, text, ol, ul, li } = builder;
chai.use(chaiPlugin);

describe('ak-editor-plugin-lists', () => {
  const editor = (doc: any) => makeEditor({ doc: doc, plugin: ListsPlugin });

  describe('API', () => {
    it('should allow a change handler to be attached', () => {
      const { plugin } = editor(doc(p()));

      plugin.onChange(sinon.spy());
    });

    it('should emit a change when the selected node becomes an ordered list', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));
      const onChange = sinon.spy()
      plugin.onChange(onChange);

      plugin.toggleList('ordered_list');

      expect(onChange.callCount).to.equal(1);
    });

    it('should not emit extra change events when moving within an ordered list', () => {
      // TODO: Fix case when moving to the end of the text.
      const { pm, plugin } = editor(doc(ol(li(p('t{<>}ex{end}t')))));
      const { end } = pm.doc.refs;
      const onChange = sinon.spy();
      plugin.onChange(onChange);

      pm.setTextSelection(end);

      expect(onChange.callCount).to.equal(0);
    });

    it('should emit change events when the state has changed', () => {
      // TODO: Fix the case where the entire word is selected.
      const { plugin } = editor(doc(p('t{<}ex{>}t')));
      const onChange = sinon.spy();
      plugin.onChange(onChange);

      plugin.toggleList('ordered_list');
      plugin.toggleList('ordered_list');
      plugin.toggleList('bullet_list');
      plugin.toggleList('bullet_list');

      expect(onChange.callCount).to.equal(4);
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
