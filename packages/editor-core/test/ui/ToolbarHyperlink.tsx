import { expect } from 'chai';
import { mount } from 'enzyme';
import * as sinon from 'sinon';
import * as React from 'react';
import hyperlinkPlugins from '../../src/plugins/hyperlink';
import ToolbarHyperlink from '../../src/ui/ToolbarHyperlink';
import ToolbarButton from '../../src/ui/ToolbarButton';
import LinkIcon from '@atlaskit/icon/glyph/editor/link';
import { doc, p, makeEditor, fixtures } from '../../src/test-helper';
import defaultSchema from '../../src/test-helper/schema';

describe('@atlaskit/editor-core/ui/ToolbarHyperlink', () => {

  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: hyperlinkPlugins(defaultSchema),
    place: fixture()
  });

  it('should trigger showLinkPanel of plugin when toolbar hyperlink button is clicked', () => {
    const { pluginState, editorView } = editor(doc(p('text')));
    const toolbarHyperlink = mount(<ToolbarHyperlink pluginState={pluginState} editorView={editorView} />);
    const spyFunc = sinon.spy();
    pluginState.showLinkPanel = spyFunc;
    toolbarHyperlink.find(LinkIcon).simulate('click');
    expect(spyFunc.callCount).to.equal(1);
  });

  it('should state variable showToolbarPanel should be true when toolbar hyperlink button is clicked without a selection', () => {
    const { pluginState, editorView } = editor(doc(p('text')));
    const toolbarHyperlink = mount(<ToolbarHyperlink pluginState={pluginState} editorView={editorView} />);
    toolbarHyperlink.find(LinkIcon).simulate('click');
    expect(toolbarHyperlink.state('showToolbarPanel')).to.be.true;
  });

  it('should state variable showToolbarPanel should be false when toolbar hyperlink button is clicked with a selection', () => {
    const { pluginState, editorView } = editor(doc(p('text')));
    const toolbarHyperlink = mount(<ToolbarHyperlink pluginState={pluginState} editorView={editorView} />);
    toolbarHyperlink.find(ToolbarButton).simulate('click');
    expect(toolbarHyperlink.state('showToolbarPanel')).not.to.be.true;
  });
});
