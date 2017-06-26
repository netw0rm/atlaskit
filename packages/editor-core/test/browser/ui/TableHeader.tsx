import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import * as sinon from 'sinon';
import * as React from 'react';
import tablePlugins from '../../../src/plugins/table';
import TableHeader from '../../../src/ui/TableHeader';
import CornerHeader from '../../../src/ui/TableHeader/CornerHeader';
import ColumnHeader from '../../../src/ui/TableHeader/ColumnHeader';
import RowHeader from '../../../src/ui/TableHeader/RowHeader';
import { InsertColumnButton } from '../../../src/ui/TableHeader/ColumnHeader';
import { InsertRowButton } from '../../../src/ui/TableHeader/RowHeader';
import ToolbarButton from '../../../src/ui/ToolbarButton';
import {
  ColumnHeaderButtonWrap,
  HeaderButton as ColumnHeaderButton
} from '../../../src/ui/TableHeader/ColumnHeader/styles';
import {
  RowHeaderButtonWrap,
  HeaderButton as RowHeaderButton
} from '../../../src/ui/TableHeader/RowHeader/styles';

import {
  createEvent, doc, p, fixtures, makeEditor, table, tr, tdEmpty, tdCursor
} from '../../../src/test-helper';

describe('TableHeader', () => {
  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: tablePlugins(),
    place: fixture()
  });

  const event = createEvent('event');

  context('when pluginState.tableElement is undefined', () => {
    it('should not render table header', () => {
      const { editorView, pluginState } = editor(doc(p('text'), table(tr(tdEmpty, tdEmpty, tdEmpty))));
      const tableHeader = mount(
        <TableHeader pluginState={pluginState} editorView={editorView} />
      );
      expect(tableHeader.html()).to.equal(null);
    });
  });

  context('when pluginState.tableElement is defined', () => {
    it('should render CornerHeader, ColumnHeader and RowHeader', () => {
      const { editorView, pluginState } = editor(doc(p('text'), table(tr(tdEmpty, tdEmpty, tdEmpty))));
      const tableHeader = shallow(
        <TableHeader pluginState={pluginState} editorView={editorView} />
      );
      tableHeader.setState({ tableElement: document.createElement('table') });
      expect(tableHeader.find(CornerHeader)).to.have.length(1);
      expect(tableHeader.find(ColumnHeader)).to.have.length(1);
      expect(tableHeader.find(RowHeader)).to.have.length(1);
    });
  });

  context('when editor is blur', () => {
    it('should not render table header', () => {
      const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
      const tableHeader = mount(
        <TableHeader pluginState={pluginState} editorView={editorView} />
      );
      plugin.props.onFocus!(editorView, event);
      expect(tableHeader.html()).to.not.equal(null);
      plugin.props.onBlur!(editorView, event);
      expect(tableHeader.html()).to.equal(null);
    });
  });

  context('when toolbar is clicked', () => {
    it('should call pluginState.updateToolbarFocused', () => {
      const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
      const tableHeader = mount(
        <TableHeader pluginState={pluginState} editorView={editorView} />
      );
      plugin.props.onFocus!(editorView, event);
      pluginState.updateToolbarFocused = sinon.spy();
      tableHeader.find(CornerHeader).parent().simulate('mousedown');
      expect(pluginState.updateToolbarFocused.calledOnce).to.equal(true);
    });
  });

  context('when toolbar is blur', () => {
    it('should call pluginState.updateToolbarFocused', () => {
      const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
      const tableHeader = mount(
        <TableHeader pluginState={pluginState} editorView={editorView} />
      );
      plugin.props.onFocus!(editorView, event);
      pluginState.updateToolbarFocused = sinon.spy();
      tableHeader.find(CornerHeader).parent().simulate('blur');
      expect(pluginState.updateToolbarFocused.calledOnce).to.equal(true);
    });
  });

  describe('CornerHeader', () => {
    context('when pluginState.isTableSelected is true', () => {
      it('should render selected header', () => {
        const { editorView, plugin, pluginState } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
        const tableHeader = mount(
          <TableHeader pluginState={pluginState} editorView={editorView} />
        );
        plugin.props.onFocus!(editorView, event);
        pluginState.selectTable();
        expect(tableHeader.find(CornerHeader).prop('isSelected')()).to.equal(true);
      });
    });
  });

  describe('ColumnHeader', () => {
    [1, 2, 3].forEach(column => {
      context(`when table has ${column} columns`, () => {
        it(`should render ${column} column header buttons`, () => {
          const nodes = [tdCursor];
          for (let i = 1; i < column; i++) {
            nodes.push(tdEmpty);
          }
          const { editorView, plugin, pluginState } = editor(doc(p('text'), table(tr(...nodes))));
          const tableHeader = mount(
            <TableHeader pluginState={pluginState} editorView={editorView} />
          );
          plugin.props.onFocus!(editorView, event);
          expect(tableHeader.find(ColumnHeaderButtonWrap)).to.have.length(column);
        });
      });
    });

    [0, 1, 2].forEach(column => {
      context(`when HeaderButton in column ${column + 1} is clicked`, () => {
        it(`should call pluginState.selectColumn(${column})`, () => {
          const { editorView, plugin, pluginState } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
          pluginState.selectColumn = sinon.spy();
          const tableHeader = mount(
            <TableHeader pluginState={pluginState} editorView={editorView} />
          );
          plugin.props.onFocus!(editorView, event);
          tableHeader.find(ColumnHeaderButton).at(column).find('button').first().simulate('click');
          expect(pluginState.selectColumn.calledOnce).to.equal(true);
          const { args } = pluginState.selectColumn.getCalls()[0];
          expect(args[0]).to.equal(column);
        });
      });
    });
  });

  describe('RowHeader', () => {
    [1, 2, 3].forEach(row => {
      context(`when table has ${row} rows`, () => {
        it(`should render ${row} row header buttons`, () => {
          const rows = [tr(tdCursor)];
          for (let i = 1; i < row; i++) {
            rows.push(tr(tdEmpty));
          }
          const { editorView, plugin, pluginState } = editor(doc(p('text'), table(...rows)));
          const tableHeader = mount(
            <TableHeader pluginState={pluginState} editorView={editorView} />
          );
          plugin.props.onFocus!(editorView, event);
          expect(tableHeader.find(RowHeaderButtonWrap)).to.have.length(row);
        });
      });
    });

    [0, 1, 2].forEach(row => {
      context(`when HeaderButton in row ${row + 1} is clicked`, () => {
        it(`should call pluginState.selectRow(${row})`, () => {
          const { editorView, plugin, pluginState } = editor(doc(p('text'), table(tr(tdCursor), tr(tdEmpty), tr(tdEmpty))));
          pluginState.selectRow = sinon.spy();
          const tableHeader = mount(
            <TableHeader pluginState={pluginState} editorView={editorView} />
          );
          plugin.props.onFocus!(editorView, event);
          tableHeader.find(RowHeaderButton).at(row).find('button').first().simulate('click');
          expect(pluginState.selectRow.calledOnce).to.equal(true);
          const { args } = pluginState.selectRow.getCalls()[0];
          expect(args[0]).to.equal(row);
        });
      });
    });
  });

  describe('InsertColumnButton', () => {
    [0, 1, 2].forEach(index => {
      context(`when InsertColumnButton with index ${index} is clicked`, () => {
        it(`should call pluginState.insertColumn(${index})`, () => {
          const { pluginState } = editor(doc(p('text')));
          pluginState.insertColumn = sinon.spy();
          const wrapper = mount(
            <InsertColumnButton index={index} insertColumn={pluginState.insertColumn} />
          );
          wrapper.setState({ hovered: true });
          wrapper.find(ToolbarButton).simulate('click');
          expect(pluginState.insertColumn.calledOnce).to.equal(true);
          const { args } = pluginState.insertColumn.getCalls()[0];
          expect(args[0]).to.equal(index);
        });
      });
    });
  });

  describe('InsertRowButton', () => {
    [0, 1, 2].forEach(index => {
      context(`when InsertRowButton with index ${index} is clicked`, () => {
        it(`should call pluginState.insertRow(${index})`, () => {
          const { pluginState } = editor(doc(p('text')));
          pluginState.insertRow = sinon.spy();
          const wrapper = mount(
            <InsertRowButton index={index} insertRow={pluginState.insertRow} />
          );
          wrapper.setState({ hovered: true });
          wrapper.find(ToolbarButton).simulate('click');
          expect(pluginState.insertRow.calledOnce).to.equal(true);
          const { args } = pluginState.insertRow.getCalls()[0];
          expect(args[0]).to.equal(index);
        });
      });
    });
  });

});
