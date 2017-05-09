import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import mentionsPlugins from '../../src/plugins/mentions';
import ToolbarMention from '../../src/ui/ToolbarMention';
import { doc, p, makeEditor, fixtures } from '../../src/test-helper';
import defaultSchema from '../../src/test-helper/schema';
import MentionIcon from '@atlaskit/icon/glyph/editor/mention';

describe('ToolbarMention', () => {

  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: mentionsPlugins(defaultSchema),
    place: fixture()
  });

  it('should create a mentionQuery by clicking on the ToolbarMention icon', () => {
    const { pluginState, editorView } = editor(doc(p('{<>}')));
    const toolbarMention = mount(<ToolbarMention pluginState={pluginState} editorView={editorView} />);
    toolbarMention.find(MentionIcon).simulate('click');
    const { state } = editorView;
    expect(state.doc.rangeHasMark(0, 2, state.schema.marks.mentionQuery)).to.equal(true);
  });

});
