import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import mentionsPlugins from '../../../src/plugins/mentions';
import ToolbarMention from '../../../src/ui/ToolbarMention';
import { doc, p, makeEditor, fixtures } from '../../../src/test-helper';
import defaultSchema from '../../../src/test-helper/schema';
import MentionIcon from '@atlaskit/icon/glyph/editor/mention';
import ProviderFactory from '../../../src/providerFactory';
import pluginKey from '../../../src/plugins/mentions/plugin-key';

describe('ToolbarMention', () => {

  const fixture = fixtures();
  const editor = (doc: any) => {
    const ed = makeEditor({
      doc,
      plugins: mentionsPlugins(defaultSchema, new ProviderFactory()),
      place: fixture()
    });

    afterEach(() => {
      ed.editorView.destroy();
    });

    return ed;
  };

  it('should create a mentionQuery by clicking on the ToolbarMention icon', () => {
    const { editorView } = editor(doc(p('{<>}')));
    const toolbarMention = mount(<ToolbarMention pluginKey={pluginKey} editorView={editorView} />);
    toolbarMention.find(MentionIcon).simulate('click');
    const { state } = editorView;
    expect(state.doc.rangeHasMark(0, 2, state.schema.marks.mentionQuery)).to.equal(true);
  });

});
