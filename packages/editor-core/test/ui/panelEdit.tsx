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

  it('should return null if state variable showToolbar is false or target is undefined', () => {
    const { pm } = editor(doc());
    const panelEditOptions = shallow(<PanelEdit pluginState={PanelPlugin.get(pm)}/>);
    panelEditOptions.setState({ showToolbar: false, target: undefined });
    expect(panelEditOptions.html()).to.equal(null);
    panelEditOptions.setState({ showToolbar: false, target: document.createElement('div') });
    expect(panelEditOptions.html()).to.equal(null);
    panelEditOptions.setState({ showToolbar: true, target: undefined });
    expect(panelEditOptions.html()).to.equal(null);
    panelEditOptions.setState({ showToolbar: true, target: document.createElement('div') });
    expect(panelEditOptions.html()).to.not.equal(null);
  });

  it('should have 5 buttons in it', () => {
    const { plugin } = editor(doc(panel(paragraph('text'))));
    const panelEditOptions = mount(<PanelEdit pluginState={plugin}/>);
    expect(panelEditOptions.find('button')).to.have.length(5);
  });
});
