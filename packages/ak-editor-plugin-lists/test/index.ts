import ListsPlugin from '../src';
import { chaiPlugin, makeEditor, doc, p, text, ol, ul, li, h1 } from 'ak-editor-test';
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

    it('should make sure that it is enabled when selecting ordered list', () => {
      const { pm, plugin } = editor(doc(ol(li(p('te{<>}xt')))));
      const state = plugin.getState();

      expect(state).to.eql({
        active: true,
        enabled: true,
        type: "ordered_list"
      });
    });

    it('should be disabled when selecting h1', () => {
      const { pm, plugin } = editor(doc(h1('te{<>}xt')));
      const state = plugin.getState();

      expect(state).to.eql({
        active: false,
        enabled: false,
        type: null
      });
    });

    describe('untoggling a list', () => {
      const expectedOutput = doc(ol(li(p('One'))),p('Two'),p('Three'),ol(li(p('Four'))));

      it('should allow untoggling part of a list based on selection', () => {
        const { pm, plugin } = editor(doc(ol(li(p('One')),li(p('{<}Two')),li(p('Three{>}')),li(p('Four')))));

        plugin.toggleList('ordered_list');
        expect(pm.doc).to.deep.equal(expectedOutput);
      });

      it('should allow untoggling part of a list based on selection that starts at the end of previous line', () => {
        const { pm, plugin } = editor(doc(ol(li(p('One{<}')),li(p('Two')),li(p('Three{>}')),li(p('Four'))))); // When selection starts on previous (empty) node

        plugin.toggleList('ordered_list');
        expect(pm.doc).to.deep.equal(expectedOutput);
      });
    });

    describe('converting a list', () => {
      it('should allow converting part of a list based on selection', () => {
        const expectedOutput = doc(ol(li(p('One'))),ul(li(p('Two')),li(p('Three'))),ol((li(p('Four')))));
        const { pm, plugin } = editor(doc(ol(li(p('One')),li(p('{<}Two')),li(p('Three{>}')),li(p('Four')))));

        plugin.toggleList('bullet_list');
        expect(pm.doc).to.deep.equal(expectedOutput);
      });

      it('should allow converting part of a list based on selection that starts at the end of previous line', () => {
        const expectedOutput = doc(ol(li(p('One'))),ul(li(p('Two')),li(p('Three'))),ol((li(p('Four')))));
        const { pm, plugin } = editor(doc(ol(li(p('One{<}')),li(p('Two')),li(p('Three{>}')),li(p('Four'))))); // When selection starts on previous (empty) node
 
        plugin.toggleList('bullet_list');
        expect(pm.doc).to.deep.equal(expectedOutput);
      });

      it('should convert selection to a list when the selection starts with a paragraph and ends inside a list', () => {
        const expectedOutput = doc(ol(li(p('One')),li(p('Two')),li(p('Three')),li(p('Four'))));
        const { pm, plugin } = editor(doc(p('{<}One'),ol(li(p('Two{>}')),li(p('Three')),li(p('Four')))));
        
        plugin.toggleList('ordered_list');
        expect(pm.doc).to.deep.equal(expectedOutput);
      });

      it('should convert selection to a list when the selection contains a list but starts and end with paragraphs', () => {
        const expectedOutput = doc(ol(li(p('One')),li(p('Two')),li(p('Three')),li(p('Four'))));
        const { pm, plugin } = editor(doc(p('{<}One'),ol(li(p('Two')),li(p('Three'))),p('Four{>}')));
        
        plugin.toggleList('ordered_list');
        expect(pm.doc).to.deep.equal(expectedOutput);
      });

      it('should convert selection to a list when the selection starts inside a list and ends with a paragraph', () => {
        const expectedOutput = doc(ol(li(p('One')),li(p('Two')),li(p('Three')),li(p('Four'))));
        const { pm, plugin } = editor(doc(ol(li(p('One')),li(p('{<}Two')),li(p('Three'))),(p('Four{>}'))));
        
        plugin.toggleList('ordered_list');
        expect(pm.doc).to.deep.equal(expectedOutput);
      });
    });

    describe('joining lists', () => {
      const expectedOutputForPreviousList = doc(ol(li(p('One')),li(p('Two')),li(p('Three')),li(p('Four')),li(p('Five'))),p('Six'));
      const expectedOutputForNextList = doc(p('One'),ol(li(p('Two')),li(p('Three')),li(p('Four')),li(p('Five')),li(p('Six'))));
      const expectedOutputForPreviousAndNextList = doc(ol(li(p('One')),li(p('Two')),li(p('Three')),li(p('Four')),li(p('Five')),li(p('Six'))));

      it('should join with previous list if it\'s of the same type', () => {
        const { pm, plugin } = editor(doc(ol(li(p('One')),li(p('Two')),li(p('Three'))),p('{<}Four'),p('Five{>}'),p('Six')));

        plugin.toggleList('ordered_list');
        expect(pm.doc).to.deep.equal(expectedOutputForPreviousList);
      });

      it('should join with previous list if it\'s of the same type and selection starts at the end of previous line', () => {
        const { pm, plugin } = editor(doc(ol(li(p('One')),li(p('Two')),li(p('Three{<}'))),p('Four'),p('Five{>}'),p('Six'))); // When selection starts on previous (empty) node
        
        plugin.toggleList('ordered_list');
        expect(pm.doc).to.deep.equal(expectedOutputForPreviousList);
      });

      it('should not join with previous list if it\'s not of the same type', () => {
        const { pm, plugin } = editor(doc(ol(li(p('One')),li(p('Two')),li(p('Three'))),p('{<}Four'),p('Five{>}'),p('Six')));

        plugin.toggleList('bullet_list');
        expect(pm.doc).not.to.deep.equal(expectedOutputForPreviousList);
        expect(pm.doc).to.deep.equal(doc(ol(li(p('One')),li(p('Two')),li(p('Three'))),ul(li(p('{<}Four')),li(p('Five'))),p('Six')));
      });

      it('should not join with previous list if it\'s not of the same type and selection starts at the end of previous line', () => {
        const { pm, plugin } = editor(doc(ol(li(p('One')),li(p('Two')),li(p('Three{<}'))),p('Four'),p('Five{>}'),p('Six'))); // When selection starts on previous (empty) node

        plugin.toggleList('bullet_list');
        expect(pm.doc).not.to.deep.equal(expectedOutputForPreviousList);
        expect(pm.doc).to.deep.equal(doc(ol(li(p('One')),li(p('Two')),li(p('Three'))),ul(li(p('{<}Four')),li(p('Five'))),p('Six')));
      });

      it('should join with next list if it\'s of the same type', () => {
        const { pm, plugin } = editor(doc(p('One'),p('{<}Two'),p('Three{>}'),ol(li(p('Four')),li(p('Five')),li(p('Six')))));

        plugin.toggleList('ordered_list');
        expect(pm.doc).to.deep.equal(expectedOutputForNextList);
      });

      it('should join with next list if it\'s of the same type and selection starts at the end of previous line', () => {
        const { pm, plugin } = editor(doc(p('One{<}'),p('Two'),p('Three{>}'),ol(li(p('Four')),li(p('Five')),li(p('Six')))));
        
        plugin.toggleList('ordered_list');
        expect(pm.doc).to.deep.equal(expectedOutputForNextList);
      });

      it('should not join with next list if it isn\'t of the same type', () => {
        const { pm, plugin } = editor(doc(p('One'),p('{<}Two'),p('Three{>}'),ol(li(p('Four')),li(p('Five')),li(p('Six')))));

        plugin.toggleList('bullet_list');
        expect(pm.doc).not.to.deep.equal(expectedOutputForNextList);
        expect(pm.doc).to.deep.equal(doc(p('One'), ul(li(p('Two')), li(p('Three'))), ol(li(p('Four')), li(p('Five')), li(p('Six')))));
      });

      it('should not join with next list if it isn\'t of the same type and selection starts at the end of previous line', () => {
        const { pm, plugin } = editor(doc(p('One{<}'),p('Two'),p('Three{>}'),ol(li(p('Four')),li(p('Five')),li(p('Six')))));

        plugin.toggleList('bullet_list');
        expect(pm.doc).not.to.deep.equal(expectedOutputForNextList);
        expect(pm.doc).to.deep.equal(doc(p('One'), ul(li(p('Two')), li(p('Three'))), ol(li(p('Four')), li(p('Five')), li(p('Six')))));
      });

      it('should join with previous and next list if they\'re of the same type', () => {
        const { pm, plugin } = editor(doc(ol(li(p('One')),li(p('Two'))),p('{<}Three'),p('Four{>}'),ol(li(p('Five')),li(p('Six')))));

        plugin.toggleList('ordered_list');
        expect(pm.doc).to.deep.equal(expectedOutputForPreviousAndNextList);
      });

      it('should join with previous and next list if they\'re of the same type and selection starts at the end of previous line', () => {
        const { pm, plugin } = editor(doc(ol(li(p('One')),li(p('Two{<}'))),p('Three'),p('Four{>}'),ol(li(p('Five')),li(p('Six')))));
        
        plugin.toggleList('ordered_list');
        expect(pm.doc).to.deep.equal(expectedOutputForPreviousAndNextList);
      });

      it('should not join with previous and next list if they\'re not of the same type', () => {
        const { pm, plugin } = editor(doc(ol(li(p('One')),li(p('Two'))),p('{<}Three'),p('Four{>}'),ol(li(p('Five')),li(p('Six')))));

        plugin.toggleList('bullet_list');
        expect(pm.doc).not.to.deep.equal(expectedOutputForPreviousAndNextList);
        expect(pm.doc).to.deep.equal(doc(ol(li(p('One')), li(p('Two'))), ul(li(p('Three')), li(p('Four'))), ol(li(p('Five')), li(p('Six')))))
      });

      it('should not join with previous and next list if they\'re not of the same type and selectoin starts at the end of previous line', () => {
        const { pm, plugin } = editor(doc(ol(li(p('One')),li(p('Two{<}'))),p('Three'),p('Four{>}'),ol(li(p('Five')),li(p('Six')))));

        plugin.toggleList('bullet_list');
        expect(pm.doc).not.to.deep.equal(expectedOutputForPreviousAndNextList);
        expect(pm.doc).to.deep.equal(doc(ol(li(p('One')), li(p('Two'))), ul(li(p('Three')), li(p('Four'))), ol(li(p('Five')), li(p('Six')))))
      });
    });

  });
});
