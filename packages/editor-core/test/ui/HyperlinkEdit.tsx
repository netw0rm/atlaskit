import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import HyperlinkPlugin from '../../src/plugins/hyperlink';
import HyperlinkEdit from '../../src/ui/HyperlinkEdit';
import { makeEditor } from '../../src/test-helper';
import { doc, paragraph, link, linkable, schema } from '../_schema-builder';

describe('@atlaskit/editor-core/ui/HyperlinkEdit', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: HyperlinkPlugin, schema });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  it('should produce null HTML when another block on editor is focused', () => {
    const { pm, plugin } = editor(doc(paragraph('te{<>}xt'), linkable('before', link({ href: 'http://www.atlassian.com' })('text'), 'after')));
    const hyperlinkEdit = mount(<HyperlinkEdit pluginState={plugin}/>);
    pm.on.focus.dispatch();
    expect(hyperlinkEdit.html()).to.equal(null);
    hyperlinkEdit.unmount();
  });

  it('should not produce null HTML when a link on editor is focused', () => {
    const { pm, plugin } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('te{<>}xt'), 'after')));
    pm.on.focus.dispatch();
    const hyperlinkEdit = mount(<HyperlinkEdit pluginState={plugin}/>);
    expect(hyperlinkEdit.html()).to.not.equal(null);
    hyperlinkEdit.unmount();
  });

  it('should produce null HTML when editor is blur', () => {
    const { pm, plugin } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('te{<>}xt'), 'after')));
    const hyperlinkEdit = mount(<HyperlinkEdit pluginState={plugin}/>);
    pm.on.blur.dispatch();
    expect(hyperlinkEdit.html()).to.equal(null);
    hyperlinkEdit.unmount();
  });

  it('should set state variable autoFocusInput to true when link href is not defined', () => {
    const { plugin } = editor(doc(linkable('before', link({ href: '' })('te{<>}xt'), 'after')));
    const hyperlinkEdit = mount(<HyperlinkEdit pluginState={plugin}/>);
    expect(hyperlinkEdit.state('autoFocusInput')).to.be.true;
    hyperlinkEdit.unmount();
  });

  it('should set state variable autoFocusInput to false when link href is defined', () => {
    const { pm, plugin } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('te{<>}xt'), 'after')));
    const hyperlinkEdit = mount(<HyperlinkEdit pluginState={plugin}/>);
    pm.on.click.dispatch();
    expect(hyperlinkEdit.state('autoFocusInput')).not.to.be.true;
    hyperlinkEdit.unmount();
  });
});
