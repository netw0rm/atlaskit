import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import * as React from 'react';
import PanelPlugin from '../../src/plugins/panel';
import PanelEdit from '../../src/ui/PanelEdit';
import { makeEditor } from '../../src/test-helper';
import { doc, panel, paragraph, schema } from '../_schema-builder';


describe('@atlassian/editor-core ui/PanelEdit', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: PanelPlugin, schema });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  it('should return null if state variable toolbarVisible is false', () => {
    const { plugin } = editor(doc());
    const panelEditOptions = shallow(<PanelEdit pluginState={plugin}/>);
    panelEditOptions.setState({ toolbarVisible: false });
    expect(panelEditOptions.html()).to.equal(null);
  });

  it('should not return null if state variable toolbarVisible is true', () => {
    const { plugin } = editor(doc());
    const panelEditOptions = shallow(<PanelEdit pluginState={plugin}/>);
    panelEditOptions.setState({ toolbarVisible: true });
    expect(panelEditOptions.html()).to.not.equal(null);
  });

  it('should have 5 buttons in it', () => {
    const { plugin } = editor(doc(panel(paragraph('te{<>}xt'))));
    const panelEditOptions = mount(<PanelEdit pluginState={plugin}/>);
    panelEditOptions.setState({ toolbarVisible: true });
    expect(panelEditOptions.find('button')).to.have.length(5);
  });

  it('should set toolbarVisible to true when panel is clicked', () => {
    const { pm, plugin } = editor(doc(panel(paragraph('text'))));
    const panelEditOptions = mount(<PanelEdit pluginState={plugin}/>);
    pm.on.focus.dispatch();
    pm.on.click.dispatch();
    expect(panelEditOptions.state('toolbarVisible')).to.be.true;
  });

  it('should set toolbarVisible to false when panel is blur', () => {
    const { pm, plugin } = editor(doc(panel(paragraph('text'))));
    const panelEditOptions = mount(<PanelEdit pluginState={plugin}/>);
    pm.on.blur.dispatch();
    expect(panelEditOptions.state('toolbarVisible')).not.to.be.true;
  });

  it('should continue toolbarVisible to true when panelType is changed', () => {
    const { plugin, pm } = editor(doc(panel(paragraph('text'))));
    const panelEditOptions = mount(<PanelEdit pluginState={plugin}/>);
    pm.on.focus.dispatch();
    plugin.changePanelType({ panelType: 'note' });
    expect(panelEditOptions.state('toolbarVisible')).to.be.true;
  });

  it('should set toolbarVisible to false when panelType is removed', () => {
    const { plugin, pm } = editor(doc(panel(paragraph('text'))));
    const panelEditOptions = mount(<PanelEdit pluginState={plugin}/>);
    pm.on.focus.dispatch();
    plugin.removePanelType();
    expect(panelEditOptions.state('toolbarVisible')).to.be.false;
  });
});
