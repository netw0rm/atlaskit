import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import panelPlugins, { PanelState } from '../../../src/plugins/panel';
import PanelEdit from '../../../src/ui/PanelEdit';
import ToolbarButton from '../../../src/ui/ToolbarButton';
import AkButton from '@atlaskit/button';
import { analyticsService } from '../../../src/analytics';

import { doc, panel, p, makeEditor, createEvent } from '../../../src/test-helper';
import defaultSchema from '../../../src/test-helper/schema';

describe('@atlaskit/editor-core ui/PanelEdit', () => {
  const event = createEvent('event');
  const editor = (doc: any) => makeEditor<PanelState>({
    doc,
    plugins: panelPlugins(defaultSchema),
  });

  it('should return null if state variable toolbarVisible is false', () => {
    const { editorView, pluginState } = editor(doc(panel(p('te{<>}xt'))));
    const panelEditOptions = shallow(<PanelEdit pluginState={pluginState} editorView={editorView} />);
    panelEditOptions.setState({ toolbarVisible: false });
    expect(panelEditOptions.html()).to.equal(null);
  });

  it('should not return null if state variable toolbarVisible is true', () => {
    const { editorView, pluginState } = editor(doc(panel(p('te{<>}xt'))));
    const panelEditOptions = shallow(<PanelEdit pluginState={pluginState} editorView={editorView} />);
    panelEditOptions.setState({ toolbarVisible: true });
    expect(panelEditOptions.html()).to.not.equal(null);
  });

  it('should have 5 buttons in it', () => {
    const { editorView, pluginState } = editor(doc(panel(p('te{<>}xt'))));
    const panelEditOptions = shallow(<PanelEdit pluginState={pluginState} editorView={editorView} />);
    panelEditOptions.setState({ toolbarVisible: true });
    expect(panelEditOptions.find(ToolbarButton).length).to.equal(4);
  });

  it('should set toolbarVisible to true when panel is clicked', () => {
    const { plugin, editorView, pluginState, sel } = editor(doc(panel(p('text'))));
    const panelEditOptions = mount(<PanelEdit pluginState={pluginState} editorView={editorView} />);
    plugin.props.handleDOMEvents!.focus(editorView, event);
    plugin.props.handleClick!(editorView, sel, event);
    pluginState.update(editorView.state, (editorView as any).docView, true);
    expect(panelEditOptions.state('toolbarVisible')).to.equal(true);
    panelEditOptions.unmount();
  });

  it('should set toolbarVisible to false when panel is blur', () => {
    const { plugin, editorView, pluginState } = editor(doc(panel(p('text'))));
    const panelEditOptions = mount(<PanelEdit pluginState={pluginState} editorView={editorView} />);
    plugin.props.handleDOMEvents!.blur(editorView, event);
    expect(panelEditOptions.state('toolbarVisible')).not.to.equal(true);
    panelEditOptions.unmount();
  });

  it('should continue toolbarVisible to true when panelType is changed', () => {
    const { plugin, editorView, pluginState } = editor(doc(panel(p('text'))));
    const panelEditOptions = mount(<PanelEdit pluginState={pluginState} editorView={editorView} />);
    plugin.props.handleDOMEvents!.focus(editorView, event);
    pluginState.changePanelType(editorView, { panelType: 'note' });
    expect(panelEditOptions.state('toolbarVisible')).to.equal(true);
    panelEditOptions.unmount();
  });

  it('should set toolbarVisible to false when panel is removed', () => {
    const { plugin, editorView, pluginState } = editor(doc(panel(p('text'))));
    const panelEditOptions = mount(<PanelEdit pluginState={pluginState} editorView={editorView} />);
    plugin.props.handleDOMEvents!.focus(editorView, event);
    pluginState.removePanel(editorView);
    expect(panelEditOptions.state('toolbarVisible')).to.equal(false);
    panelEditOptions.unmount();
  });

  describe('analytics', () => {
    let trackEvent;
    let toolbarOption;
    beforeEach(() => {
      const { plugin, editorView, pluginState, sel } = editor(doc(panel(p('text{<>}'))));
      toolbarOption = mount(<PanelEdit pluginState={pluginState} editorView={editorView} />);
      plugin.props.handleDOMEvents!.focus(editorView, event);
      plugin.props.handleClick!(editorView, sel, event);
      trackEvent = sinon.spy();
      analyticsService.trackEvent = trackEvent;
    });
    afterEach(() => {
      toolbarOption.unmount();
    });
    ['info', 'note', 'tip', 'warning'].forEach((panelType, index) => {
      it(`should trigger analyticsService.trackEvent when ${panelType} button is clicked`, () => {
        toolbarOption.find(AkButton).at(index).simulate('click');
        expect(trackEvent.calledWith(`atlassian.editor.format.${panelType}.button`)).to.equal(true);
      });
    });
  });
});
