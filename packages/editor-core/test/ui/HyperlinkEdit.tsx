import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import HyperlinkPlugin from '../../src/plugins/hyperlink';
import HyperlinkEdit from '../../src/ui/HyperlinkEdit';
import { makeEditor } from '../../test-helper';
import { doc, paragraph, link, linkable, schema } from '../_schema-builder';

describe('ak-editor-core/ui/HyperlinkEdit', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: HyperlinkPlugin, schema });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  it('should produce null HTML when anothe block on editor is focused', () => {
    const { pm, plugin } = editor(doc(paragraph('te{<>}xt'), linkable('before', link({ href: 'http://www.atlassian.com' })('text'), 'after')));
    const hyperlinkEdit = mount(<HyperlinkEdit pluginState={plugin}/>);
    pm.on.focus.dispatch();
    expect(hyperlinkEdit.html()).to.equal(null);
  });

  it('should produce null HTML when editor is blur', () => {
    const { pm, plugin } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('te{<>}xt'), 'after')));
    const hyperlinkEdit = mount(<HyperlinkEdit pluginState={plugin}/>);
    pm.on.blur.dispatch();
    expect(hyperlinkEdit.html()).to.equal(null);
  });
});
