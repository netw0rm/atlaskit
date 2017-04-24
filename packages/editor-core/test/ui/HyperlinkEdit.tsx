import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import hyperlinkPlugins from '../../src/plugins/hyperlink';
import HyperlinkEdit from '../../src/ui/HyperlinkEdit';
import PanelTextInput from '../../src/ui/PanelTextInput';
import { createEvent, fixtures, doc, p as paragraph, a as link, linkable, makeEditor } from '../../src/test-helper';
import defaultSchema from '../../src/test-helper/schema';

describe('@atlaskit/editor-core/ui/HyperlinkEdit', () => {
  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: hyperlinkPlugins(defaultSchema),
    place: fixture()
  });
  const blurEvent = createEvent('blur');
  const focusEvent = createEvent('focus');

  it('should produce null HTML when another block on editor is focused', () => {
    const { editorView, plugin, pluginState } = editor(doc(paragraph('te{<>}xt'), linkable('before', link({ href: 'http://www.atlassian.com' })('text'), 'after')));
    const hyperlinkEdit = mount(<HyperlinkEdit pluginState={pluginState} editorView={editorView} />);
    plugin.props.onBlur!(editorView, blurEvent);
    expect(hyperlinkEdit.html()).to.equal(null);
  });

  it('should not produce null HTML when a link on editor is focused', () => {
    const { editorView, plugin, pluginState } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('te{<>}xt'), 'after')));
    plugin.props.onFocus!(editorView, focusEvent);
    const hyperlinkEdit = mount(<HyperlinkEdit pluginState={pluginState} editorView={editorView} />);
    expect(hyperlinkEdit.html()).to.not.equal(null);
  });

  it('should produce null HTML when editor is blur', () => {
    const { editorView, plugin, pluginState } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('te{<>}xt'), 'after')));
    const hyperlinkEdit = mount(<HyperlinkEdit pluginState={pluginState} editorView={editorView} />);
    plugin.props.onBlur!(editorView, blurEvent);
    expect(hyperlinkEdit.html()).to.equal(null);
  });

  it('should set autoFocus of PanelTextInput to true when link href is not defined', () => {
    const { editorView, pluginState } = editor(doc(linkable('before', link({ href: '' })('te{<>}xt'), 'after')));
    const hyperlinkEdit = mount(<HyperlinkEdit pluginState={pluginState} editorView={editorView} />);
    const input = hyperlinkEdit.find(PanelTextInput);
    expect(input.prop('autoFocus')).to.be.true;
  });

  it('should set state variable autoFocusInput to false when link href is defined', () => {
    const { editorView, pluginState } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('te{<>}xt'), 'after')));
    const hyperlinkEdit = mount(<HyperlinkEdit pluginState={pluginState} editorView={editorView} />);
    editorView.dom.click();
    expect(hyperlinkEdit.state('autoFocusInput')).not.to.be.true;
  });
});
