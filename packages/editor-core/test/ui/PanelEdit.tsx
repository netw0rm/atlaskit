import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import * as React from 'react';
import PanelPlugin from '../../src/plugins/panel';
import PanelEdit from '../../src/ui/PanelEdit';
import { makeEditor } from '../../test-helper';
import { doc, panel, paragraph, schema } from '../_schema-builder';


describe('ak-editor-core/ui/PanelEdit', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: PanelPlugin, schema });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  it('should return null if state variable showToolbar is false', () => {
    const { plugin } = editor(doc());
    const panelEditOptions = shallow(<PanelEdit pluginState={plugin}/>);
    panelEditOptions.setState({ showToolbar: false });
    expect(panelEditOptions.html()).to.equal(null);
  });

  it('should not return null if state variable showToolbar is true', () => {
    const { plugin } = editor(doc());
    const panelEditOptions = shallow(<PanelEdit pluginState={plugin}/>);
    panelEditOptions.setState({ showToolbar: true });
    expect(panelEditOptions.html()).to.not.equal(null);
  });

  it('should have 5 buttons in it', () => {
    const { plugin, pm } = editor(doc(panel(paragraph('text'))));
    const panelEditOptions = mount(<PanelEdit pluginState={plugin}/>);
    pm.on.focus.dispatch();
    expect(panelEditOptions.find('button')).to.have.length(5);
  });

  it('should set showToolbar to true when panel is clicked', () => {
    const { pm, plugin } = editor(doc(panel(paragraph('text'))));
    const panelEditOptions = mount(<PanelEdit pluginState={plugin}/>);
    pm.on.focus.dispatch();
    pm.on.click.dispatch();
    expect(panelEditOptions.state('showToolbar')).to.be.true;
  });

  it('should set showToolbar to false when panel is blur', () => {
    const { pm, plugin } = editor(doc(panel(paragraph('text'))));
    const panelEditOptions = mount(<PanelEdit pluginState={plugin}/>);
    pm.on.blur.dispatch();
    expect(panelEditOptions.state('showToolbar')).not.to.be.true;
  });

  it('should set showToolbar to true when panel is focused', () => {
    const { pm, plugin } = editor(doc(panel(paragraph('text'))));
    const panelEditOptions = mount(<PanelEdit pluginState={plugin}/>);
    pm.on.focus.dispatch();
    expect(panelEditOptions.state('showToolbar')).to.be.true;
  });

  it('should continue showToolbar to true when panelType is changed', () => {
    const { plugin, pm } = editor(doc(panel(paragraph('text'))));
    const panelEditOptions = mount(<PanelEdit pluginState={plugin}/>);
    pm.on.focus.dispatch();
    plugin.changePanelType({ panelType: 'note' });
    expect(panelEditOptions.state('showToolbar')).to.be.true;
  });

  it('should set showToolbar to false when panelType is removed', () => {
    const { plugin, pm } = editor(doc(panel(paragraph('text'))));
    const panelEditOptions = mount(<PanelEdit pluginState={plugin}/>);
    pm.on.focus.dispatch();
    plugin.removePanelType();
    expect(panelEditOptions.state('showToolbar')).to.be.false;
  });
});
