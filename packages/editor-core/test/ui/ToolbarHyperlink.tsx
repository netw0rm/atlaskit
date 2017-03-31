import { expect } from 'chai';
import { mount } from 'enzyme';
import * as sinon from 'sinon';
import * as React from 'react';
import { TextSelection } from '../../src/prosemirror';
import HyperlinkPlugin from '../../src/plugins/hyperlink';
import ToolbarHyperlink from '../../src/ui/ToolbarHyperlink';
import ToolbarButton from '../../src/ui/ToolbarButton';
import { makeEditor } from '../../src/test-helper';
import { doc, schema, p } from '../_schema-builder';
import LinkIcon from '@atlaskit/icon/glyph/editor/link';

describe('@atlaskit/editor-core/ui/ToolbarHyperlink', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: HyperlinkPlugin, schema });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  it('should trigger showLinkPanel of plugin when toolbar hyperlink button is clicked', () => {
    const { plugin } = editor(doc(p('text')));
    const toolbarHyperlink = mount(<ToolbarHyperlink pluginState={plugin}/>);
    const spyFunc = sinon.spy();
    plugin.showLinkPanel = spyFunc;
    toolbarHyperlink.find(LinkIcon).simulate('click');
    expect(spyFunc.callCount).to.equal(1);
    toolbarHyperlink.unmount();
  });

  it('should state variable showToolbarPanel should be true when toolbar hyperlink button is clicked without a selection', () => {
    const { plugin } = editor(doc(p('text')));
    const toolbarHyperlink = mount(<ToolbarHyperlink pluginState={plugin}/>);
    toolbarHyperlink.find(LinkIcon).simulate('click');
    expect(toolbarHyperlink.state('showToolbarPanel')).to.be.true;
    toolbarHyperlink.unmount();
  });

  it('should state variable showToolbarPanel should be false when toolbar hyperlink button is clicked with a selection', () => {
    const { pm, plugin } = editor(doc(p('testing')));
    pm.setSelection(new TextSelection(pm.doc.resolve(4), pm.doc.resolve(7)));
    const toolbarHyperlink = mount(<ToolbarHyperlink pluginState={plugin}/>);
    toolbarHyperlink.find(ToolbarButton).simulate('click');
    expect(toolbarHyperlink.state('showToolbarPanel')).not.to.be.true;
    toolbarHyperlink.unmount();
  });
});
