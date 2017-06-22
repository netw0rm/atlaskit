import { expect } from 'chai';
import * as sinon from 'sinon';
import tablePlugin from '../../../../src/plugins/table';

import {
  setTextSelection, chaiPlugin, doc, p, fixtures, makeEditor, table, tr, td, cEmpty, cCursor
} from '../../../../src/test-helper';

chai.use(chaiPlugin);
const fixture = fixtures();

describe('table plugin', () => {
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: tablePlugin(),
    place: fixture()
  });

  describe('subscribe', () => {
    it('calls subscriber with plugin', () => {
      const { pluginState } = editor(doc(p('paragraph')));
      const spy = sinon.spy();
      pluginState.subscribe(spy);

      expect(spy.calledWith(pluginState)).to.equal(true);
    });

    context('when leaving table', () => {
      it('notifies subscriber', () => {
        const { refs, pluginState, editorView } = editor(doc(p('{pPos}'), table(tr(cCursor, cEmpty, cEmpty ))));
        const spy = sinon.spy();
        const { pPos } = refs;

        pluginState.subscribe(spy);
        setTextSelection(editorView, pPos);

        expect(spy.callCount).to.equal(2);
      });
    });

    context('when entering table', () => {
      it('notifies subscriber', () => {
        const { refs, pluginState, editorView } = editor(doc(p('{<>}'), table(tr(td({})(p('{tPos}')), cEmpty, cEmpty ))));
        const spy = sinon.spy();
        const { tPos } = refs;

        pluginState.subscribe(spy);
        setTextSelection(editorView, tPos);

        expect(spy.callCount).to.equal(2);
      });
    });

    context('when moving cursor to a different table', () => {
      it('notifies subscriber', () => {
        const { refs, pluginState, editorView } = editor(doc(table(tr(cCursor, cEmpty, cEmpty )), table(tr(td({})(p('{tPos}')), cEmpty, cEmpty ))));
        const spy = sinon.spy();
        const { tPos } = refs;

        pluginState.subscribe(spy);
        setTextSelection(editorView, tPos);

        expect(spy.callCount).to.equal(2);
      });
    });

    context('when moving within the same table', () => {
      it('notifies subscriber', () => {
        const { refs, pluginState, editorView } = editor(doc(table(tr(cCursor, cEmpty, td({})(p('{tPos}')) ))));
        const spy = sinon.spy();
        const { tPos } = refs;

        pluginState.subscribe(spy);
        setTextSelection(editorView, tPos);

        expect(spy.callCount).to.not.equal(2);
      });
    });

    context('when unsubscribe', () => {
      it('does not notify the subscriber', () => {
        const { pluginState } = editor(doc(table(tr(cCursor, cEmpty, cEmpty ))));
        const spy = sinon.spy();
        pluginState.subscribe(spy);

        pluginState.unsubscribe(spy);

        expect(spy.callCount).to.equal(1);
      });
    });

  });

});
