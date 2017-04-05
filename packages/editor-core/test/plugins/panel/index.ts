import { expect } from 'chai';
import * as sinon from 'sinon';
import PanelPlugin from '../../../src/plugins/panel';
import { doc, panel, p, makeEditor, fixtures, createEvent } from '../../../src/test-helper';

describe('@atlaskit/editor-core ui/PanelPlugin', () => {

  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugin: PanelPlugin,
    place: fixture()
  });

  const event = createEvent('event');

  it('defines a name for use by the ProseMirror plugin registry ', () => {
    const plugin = PanelPlugin as any;
    expect(plugin.key).is.be.a('string');
  });

  describe('API', () => {
    it('should allow a change handler to be registered', () => {
      const { pluginState } = editor(doc(panel(p('te{<>}xt'))));
      pluginState.subscribe(sinon.spy());
    });

    it('should get current state immediately once subscribed', () => {
      const { pluginState } = editor(doc(panel(p('te{<>}xt'))));
      const spy = sinon.spy();
      pluginState.subscribe(spy);
      expect(spy.callCount).to.equal(1);
    });

    it('should call subscribers with argument panel state', () => {
      const { pluginState } = editor(doc(panel(p('te{<>}xt'))));
      const spy = sinon.spy();
      pluginState.subscribe(spy);
      expect(spy.calledWith(pluginState)).to.equal(true);
    });

    it('should call subscribers when panel is clicked', () => {
      const { editorView, plugin, pluginState, sel } = editor(doc(panel(p('te{<>}xt'))));
      const spy = sinon.spy();
      pluginState.subscribe(spy);
      plugin.props.handleClick!(editorView, sel, event);
      expect(spy.callCount).to.equal(2);
    });

    it('should not call subscribers when another block in editor is clicked', () => {
      const { editorView, plugin, pluginState, sel } = editor(doc(p('te{<>}xt'), panel(p('text'))));
      const spy = sinon.spy();
      pluginState.subscribe(spy);
      plugin.props.handleClick!(editorView, sel, event);
      expect(spy.callCount).to.equal(1);
    });

    it('should call subscribers when panel was focused and editor blur', () => {
      const { editorView, plugin, pluginState } = editor(doc(panel(p('te{<>}xt'))));
      const spy = sinon.spy();
      pluginState.subscribe(spy);
      plugin.props.onFocus!(editorView, event);
      plugin.props.onBlur!(editorView, event);
      expect(spy.callCount).to.equal(2);
    });

    it('should not call subscribers when another block was focused and editor blur', () => {
      const { editorView, plugin, pluginState } = editor(doc(p('te{<>}xt'), panel(p('text'))));
      const spy = sinon.spy();
      pluginState.subscribe(spy);
      plugin.props.onFocus!(editorView, event);
      plugin.props.onBlur!(editorView, event);
      expect(spy.callCount).to.equal(1);
    });

    it('should not call subscribers when panel received focus', () => {
      const { editorView, plugin, pluginState } = editor(doc(panel(p('text'))));
      const spy = sinon.spy();
      pluginState.subscribe(spy);
      plugin.props.onFocus!(editorView, event);
      expect(spy.callCount).to.equal(1);
    });

    it('should be able to identify panel node', () => {
      const { pluginState } = editor(doc(panel(p('te{<>}xt'))));
      expect(pluginState.element).to.not.be.undefined;
    });

    it('should be able to change panel type using function changeType', () => {
      const { pluginState, editorView } = editor(doc(panel(p('te{<>}xt'))));
      expect(pluginState.activePanelType).to.equal('info');
      expect(pluginState.element).to.not.be.undefined;
      expect(pluginState.activePanelType).to.not.be.undefined;
      pluginState.changePanelType(editorView, { panelType: 'note' });
      expect(pluginState.activePanelType).to.equal('note');
    });

    it('should be able to remove panel type using function removePanelType', () => {
      const { pluginState, editorView } = editor(doc(panel(p('te{<>}xt'))));
      expect(pluginState.activePanelType).to.equal('info');
      pluginState.removePanelType(editorView);
      expect(pluginState.element).to.be.undefined;
    });

    it('should call handlers for change in panel type', () => {
      const { pluginState, editorView } = editor(doc(panel(p('te{<>}xt'))));
      const spy = sinon.spy();
      pluginState.subscribe(spy);
      expect(spy.callCount).to.equal(1);
      expect(pluginState.activePanelType).to.equal('info');
      pluginState.changePanelType(editorView, { panelType: 'note' });
      expect(pluginState.activePanelType).to.equal('note');
      expect(spy.callCount).to.equal(2);
    });

    it('shoul call handlers when panel type is removed', () => {
      const { pluginState, editorView } = editor(doc(panel(p('te{<>}xt'))));
      const spy = sinon.spy();
      pluginState.subscribe(spy);
      expect(spy.callCount).to.equal(1);
      expect(pluginState.activePanelType).to.equal('info');
      pluginState.removePanelType(editorView);
      expect(spy.callCount).to.equal(2);
    });

  });

  describe('toolbarVisible', () => {
    context('when editor is blur', () => {
      it('it is false', () => {
        const { editorView, plugin, pluginState } = editor(doc(p('te{<>}xt'), panel(p('text'))));
        plugin.props.onFocus!(editorView, event);
        plugin.props.onBlur!(editorView, event);
        expect(pluginState.toolbarVisible).to.not.be.true;
      });
    });
  });

  describe('editorFocued', () => {
    context('when editor is focused', () => {
      it('it is true', () => {
        const { editorView, plugin, pluginState } = editor(doc(p('te{<>}xt'), panel(p('text'))));
        plugin.props.onFocus!(editorView, event);
        expect(pluginState.editorFocused).to.be.true;
      });
    });

    context('when editor is blur', () => {
      it('it is false', () => {
        const { editorView, plugin, pluginState } = editor(doc(p('te{<>}xt'), panel(p('text'))));
        plugin.props.onFocus!(editorView, event);
        plugin.props.onBlur!(editorView, event);
        expect(pluginState.editorFocused).to.not.be.true;
      });
    });
  });

});
