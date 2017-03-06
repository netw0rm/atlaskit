import { expect } from 'chai';
import * as sinon from 'sinon';
import PanelPlugin from '../../../src/plugins/panel';
import { makeEditor } from '../../../src/test-helper';
import { doc, panel, schema, paragraph } from '../../_schema-builder';

describe('panel', () => {

  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: PanelPlugin, schema });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  it('defines a name for use by the ProseMirror plugin registry ', () => {
    const plugin = PanelPlugin as any;
    expect(plugin.State.name).is.be.a('string');
    expect(plugin.State.name).to.equal('PanelState');
  });

  describe('API', () => {
    it('should allow a change handler to be registered', () => {
      const { plugin } = editor(doc());
      plugin.subscribe(sinon.spy());
    });

    it('should get current state immediately once subscribed', () => {
      const { plugin } = editor(doc());
      const spy = sinon.spy();
      plugin.subscribe(spy);
      expect(spy.callCount).to.equal(1);
    });

    it('should be able to register handlers for state change events', () => {
      const { plugin } = editor(doc(panel(paragraph('text'))));
      const spy = sinon.spy();
      plugin.subscribe(spy);
      expect(spy.calledWith(plugin)).to.equal(true);
    });

    it('should call subscribers when panel is clicked', () => {
      const { plugin, pm } = editor(doc(panel(paragraph('text'))));
      const spy = sinon.spy();
      plugin.subscribe(spy);
      pm.on.click.dispatch();
      expect(spy.callCount).to.equal(2);
    });

    it('should not call subscribers when another block in editor is clicked', () => {
      const { plugin, pm } = editor(doc(paragraph('text')));
      const spy = sinon.spy();
      plugin.subscribe(spy);
      pm.on.click.dispatch();
      expect(spy.callCount).to.equal(1);
    });

    it('should call subscribers when panel was focused when editor blur panel is blur', () => {
      const { plugin, pm } = editor(doc(panel(paragraph('text'))));
      const spy = sinon.spy();
      plugin.subscribe(spy);
      pm.on.blur.dispatch();
      expect(spy.callCount).to.equal(2);
    });

    it('should call subscribers when another block was focused when editor blur panel is blur', () => {
      const { plugin, pm } = editor(doc(paragraph('te{<>}xt'), panel(paragraph('text'))));
      const spy = sinon.spy();
      plugin.subscribe(spy);
      pm.on.blur.dispatch();
      expect(spy.callCount).to.equal(1);
    });

    it('should not call subscribers when another block in editor is focus', () => {
      const { plugin, pm } = editor(doc(paragraph('te{<>}xt'), panel(paragraph('text'))));
      const spy = sinon.spy();
      plugin.subscribe(spy);
      pm.on.blur.dispatch();
      pm.on.focus.dispatch();
      expect(spy.callCount).to.equal(1);
    });

    it('should be able to identify panel node', () => {
      const { plugin } = editor(doc(panel(paragraph('text'))));
      expect(plugin.element).to.not.be.undefined;
    });

    it('should be able to change panel type using function changeType', () => {
      const { plugin } = editor(doc(panel(paragraph('text'))));
      expect(plugin.activePanelType).to.equal('info');
      expect(plugin.element).to.not.be.undefined;
      expect(plugin.activePanelType).to.not.be.undefined;
      plugin.changePanelType({ panelType: 'note' });
      expect(plugin.activePanelType).to.equal('note');
    });

    it('should be able to remove panel type using function removePanelType', () => {
      const { plugin } = editor(doc(panel(paragraph('text'))));
      expect(plugin.activePanelType).to.equal('info');
      plugin.removePanelType();
      expect(plugin.element).to.be.undefined;
    });

    it('should be able to call handlers for change in panel type', () => {
      const { plugin } = editor(doc(panel(paragraph('text'))));
      const spy = sinon.spy();
      plugin.subscribe(spy);
      expect(spy.callCount).to.equal(1);
      plugin.changePanelType({ panelType: 'note' });
      expect(plugin.activePanelType).to.equal('note');
      expect(plugin.element).not.to.be.undefined;
      expect(spy.callCount).to.equal(3);
    });

    it('should be able to call handlers when panel type is removed', () => {
      const { plugin } = editor(doc(panel(paragraph('text'))));
      const spy = sinon.spy();
      plugin.subscribe(spy);
      expect(spy.callCount).to.equal(1);
      plugin.removePanelType();
      expect(plugin.element).to.be.undefined;
      expect(spy.callCount).to.equal(2);
    });

  });

  describe('toolbarVisible', () => {
    context('when editor is blur', () => {
      it('it is false', () => {
        const { plugin, pm } = editor(doc(panel(paragraph('te{<>}xt'))));
        pm.on.focus.dispatch();
        pm.on.blur.dispatch();
        expect(plugin.toolbarVisible).to.not.be.true;
      });
    });
  });

  describe('editorFocued', () => {
  context('when editor is focused', () => {
    it('it is true', () => {
      const { plugin, pm } = editor(doc(panel(paragraph('te{<>}xt'))));
      pm.on.blur.dispatch();
      pm.on.focus.dispatch();
      expect(plugin.editorFocused).to.be.true;
    });
  });

  context('when editor is blur', () => {
    it('it is false', () => {
      const { plugin, pm } = editor(doc(panel(paragraph('te{<>}xt'))));
      pm.on.blur.dispatch();
      expect(plugin.editorFocused).not.to.be.true;
    });
  });
});

});
