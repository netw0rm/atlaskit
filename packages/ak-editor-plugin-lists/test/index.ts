import { default as plugin } from '../src';
import { ProseMirror } from 'prosemirror/dist/edit';
import { Slice, Node, Fragment } from 'prosemirror/dist/model';
import { schema } from 'prosemirror/dist/schema-basic';
import testing from 'ak-editor-test';
import * as chai from 'chai';
const { expect } = chai;

const { builder, chaiEditor, insertText, insert, poke } = testing({
  schema, Node, Slice, Fragment })
const { doc, p, text, ol, li } = builder;
chai.use(chaiEditor);

describe('ak-editor-plugin-lists', () => {
  const makeEditor = () => new ProseMirror({
    schema: schema,
    plugins: [plugin]
  });

  describe('ListsPlugin - API', () => {
    it('should be able to register handlers for state change events', () => {
      const pm = makeEditor();
      const onChange = sinon.spy()

      pm.setTextSelection(1);
      plugin.get(pm).onChange(onChange);
      plugin.get(pm).toggleList('ordered_list');
      poke(pm);

      expect(onChange.callCount).to.equal(1);
    });

    it('should not emit extra change events when state has not changed', () => {
      const pm = makeEditor();
      const onChange = sinon.spy();

      insertText(pm, 'text');
      plugin.get(pm).onChange(onChange);
      plugin.get(pm).toggleList('ordered_list');

      pm.setTextSelection(3, 7); // <text>
      poke(pm);
      poke(pm);

      expect(onChange.callCount).to.equal(1);
    });

    it('should emit change events when the state has changed', () => {
      const pm = makeEditor();
      const onChange = sinon.spy();

      insert(pm, 'text')
      pm.setTextSelection(1)
      plugin.get(pm).onChange(onChange);

      plugin.get(pm).toggleList('ordered_list');
      poke(pm);
      expect(pm.doc).to.equal(doc(ol(li(p('text')))));

      plugin.get(pm).toggleList('ordered_list');
      poke(pm);
      expect(pm.doc).to.equal(doc(p('text')));

      expect(onChange.callCount).to.equal(2);
    });
  });
});
