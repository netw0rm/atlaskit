import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import * as sinon from 'sinon';
import * as React from 'react';
import tablePlugins, { TableState } from '../../../src/plugins/table';
import ToolbarButton from '../../../src/ui/ToolbarButton';
import TableFloatingToolbar from '../../../src/ui/TableFloatingToolbar';
import { Toolbar } from '../../../src/ui/TableFloatingToolbar/styles';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';

import {
  createEvent, doc, p, fixtures, makeEditor, table, tr, tdEmpty, tdCursor
} from '../../../src/test-helper';

describe('TableFloatingToolbar', () => {
  const fixture = fixtures();
  const editor = (doc: any) => makeEditor<TableState>({
    doc,
    plugins: tablePlugins(),
    place: fixture()
  });

  const event = createEvent('event');

  context('when cellElement is undefined', () => {
    it('should not render toolbar', () => {
      const { editorView, pluginState } = editor(doc(p('text'), table(tr(tdEmpty, tdEmpty, tdEmpty))));
      const floatingToolbar = shallow(
        <TableFloatingToolbar pluginState={pluginState} editorView={editorView} />
      );
      expect(floatingToolbar.find(Toolbar)).to.have.length(0);
    });
  });

  context('when cellElement is defined', () => {
    it('should render toolbar', () => {
      const { editorView, pluginState } = editor(doc(p('text'), table(tr(tdEmpty, tdEmpty, tdEmpty))));
      const floatingToolbar = shallow(
        <TableFloatingToolbar pluginState={pluginState} editorView={editorView} />
      );
      floatingToolbar.setState({ cellElement: document.createElement('td') });
      expect(floatingToolbar.find(Toolbar)).to.have.length(1);
    });
  });

  context('when selecting a column inside table', () => {
    it('should render toolbar', () => {
      const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
      plugin.props.onFocus!(editorView, event);
      pluginState.selectColumn(0);
      const floatingToolbar = mount(
        <TableFloatingToolbar pluginState={pluginState} editorView={editorView} />
      );
      expect(floatingToolbar.html()).to.not.equal(null);
      floatingToolbar.unmount();
    });
  });

  context('when selecting a row inside table', () => {
    it('should render toolbar', () => {
      const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
      plugin.props.onFocus!(editorView, event);
      pluginState.selectRow(0);
      const floatingToolbar = mount(
        <TableFloatingToolbar pluginState={pluginState} editorView={editorView} />
      );
      expect(floatingToolbar.html()).to.not.equal(null);
      floatingToolbar.unmount();
    });
  });

  context('when editor is not focused', () => {
    it('should not render toolbar', () => {
      const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
      plugin.props.onFocus!(editorView, event);
      pluginState.selectRow(0);
      const floatingToolbar = mount(
        <TableFloatingToolbar pluginState={pluginState} editorView={editorView} />
      );
      expect(floatingToolbar.html()).to.not.equal(null);
      plugin.props.onBlur!(editorView, event);
      expect(floatingToolbar.html()).to.equal(null);
    });
  });

  describe('TrashIcon', () => {
    it('should be rendered in the toolbar', () => {
      const { pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
      const floatingToolbar = mount(
        <TableFloatingToolbar pluginState={pluginState} editorView={editorView} />
      );
      floatingToolbar.setState({ cellElement: document.createElement('td') });
      const button = floatingToolbar.find(ToolbarButton);
      expect(button).to.have.length(1);
      expect(button.find(RemoveIcon)).to.have.length(1);
      floatingToolbar.unmount();
    });

    it('should call pluginState.remove() on click', () => {
      const { pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
      const floatingToolbar = shallow(
        <TableFloatingToolbar pluginState={pluginState} editorView={editorView} />
      );
      pluginState.remove = sinon.spy();
      floatingToolbar.setState({ cellElement: document.createElement('td') });
      const button = floatingToolbar.find(ToolbarButton);
      button.simulate('click');
      expect((pluginState.remove as any).callCount).to.equal(1);
    });
  });
});
