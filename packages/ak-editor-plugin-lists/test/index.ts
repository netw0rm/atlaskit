import ListsPlugin from '../src';
import { Plugin, ProseMirror } from 'prosemirror/dist/edit';
import { Slice, Node, Fragment } from 'prosemirror/dist/model';
import { schema } from 'prosemirror/dist/schema-basic';
import testing from 'ak-editor-test';
import * as chai from 'chai';
const { expect } = chai;

const { builder, chaiPlugin, SyncPlugin } = testing({
  Fragment, Node, Plugin, schema, Slice })
const { doc, p, text, ol, ul, li } = builder;
chai.use(chaiPlugin);

describe('ak-editor-plugin-lists', () => {
  const makeEditor = (doc: Node) => new ProseMirror({
    doc: doc,
    schema: schema,
    plugins: [
      ListsPlugin,
      SyncPlugin,
    ],
  });

  describe('API', () => {
    it('should be able to register handlers for state change events', () => {
      const pm = makeEditor(doc(p('t{a}ext')));
      const { a } = pm.doc.refs;
      const plugin = ListsPlugin.get(pm);
      const onChange = sinon.spy()

      pm.setTextSelection(a);
      plugin.onChange(onChange);
      plugin.toggleList('ordered_list');

      expect(onChange.callCount).to.equal(1);
    });

    it('should not emit extra change events when moving within an ordered list', () => {
      const pm = makeEditor(doc(ol(li(p('{a}text{b}')))));
      const { a, b } = pm.doc.refs;
      const plugin = ListsPlugin.get(pm);
      const onChange = sinon.spy();

      plugin.onChange(onChange);

      pm.setTextSelection(a, b);
      expect(onChange.callCount).to.equal(1);
    });

    it('should emit change events when the state has changed', () => {
      // TODO: Fix the case where the entire word is selected.
      const pm = makeEditor(doc(p('t{a}ex{b}t')));
      const { a, b } = pm.doc.refs;
      const plugin = ListsPlugin.get(pm);
      const onChange = sinon.spy();

      pm.setTextSelection(a, b)
      plugin.onChange(onChange);

      plugin.toggleList('ordered_list');
      plugin.toggleList('ordered_list');
      plugin.toggleList('bullet_list');
      plugin.toggleList('bullet_list');

      expect(onChange.callCount).to.equal(4);
    });

    it('should allow toggling between normal text and ordered list', () => {
      const pm = makeEditor(doc(p('t{a}ex{b}t')));
      const { a, b } = pm.doc.refs;
      const plugin = ListsPlugin.get(pm);

      pm.setTextSelection(a, b)

      plugin.toggleList('ordered_list');
      expect(pm.doc).to.deep.equal(doc(ol(li(p('text')))));
      plugin.toggleList('ordered_list');
      expect(pm.doc).to.deep.equal(doc(p('text')));
    });

    it('should allow toggling between normal text and bullet list', () => {
      const pm = makeEditor(doc(p('t{a}ex{b}t')));
      const { a, b } = pm.doc.refs;
      const plugin = ListsPlugin.get(pm);

      pm.setTextSelection(a, b)

      plugin.toggleList('bullet_list');
      expect(pm.doc).to.deep.equal(doc(ul(li(p('text')))));
      plugin.toggleList('bullet_list');
      expect(pm.doc).to.deep.equal(doc(p('text')));
    });
  });
});
