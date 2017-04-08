import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import { Pagination } from '@atlaskit/pagination';
import AkDynamicTable, { DynamicTable } from '../src';

import { name } from '../package.json';

const head = {
  cells: [
    {
      key: 'first_name',
      content: 'First name',
      isSortable: true,
    },
    {
      key: 'last_name',
      content: 'Last name',
    },
  ],
};

const rows = [
  {
    cells: [
      {
        key: 'baob',
        content: 'Barak',
      },
      {
        content: 'Obama',
      },
    ],
  },
  {
    cells: [
      {
        key: 'dotr',
        content: 'Donald',
      },
      {
        content: 'Trump',
      },
    ],
  },
  {
    cells: [
      {
        key: 'hicl',
        content: 'Hillary',
      },
      {
        content: 'Clinton',
      },
    ],
  },
];

describe(name, () => {
  describe('stateless', () => {
    it('should display empty view when items length is 0', () => {
      const EmptyView = <div>empty view</div>;
      const wrapper = mount(<DynamicTable emptyView={EmptyView} />);
      expect(wrapper.html()).to.equal(mount(EmptyView).html());
      wrapper.unmount();
    });

    it('should display paginated data', () => {
      const wrapper = mount(
        <DynamicTable
          rowsPerPage={2}
          page={2}
          head={head}
          rows={rows}
        />
      );
      const bodyRows = wrapper.find('tbody tr');
      expect(bodyRows.length).to.equal(1);
      expect(bodyRows.at(0).find('td').at(0).text()).to.equal('Hillary');
      expect(bodyRows.at(0).find('td').at(1).text()).to.equal('Clinton');
      wrapper.unmount();
    });

    it('should display sorted data', () => {
      const headCells = head.cells.map(cell => ({
        ...cell,
        isSortable: true,
      }));
      const wrapper = mount(
        <DynamicTable
          defaultSortKey="last_name"
          defaultSortOrder="DESC"
          head={{ cells: headCells }}
          rows={rows}
        />
        );
      const bodyRows = wrapper.find('tbody tr');
      expect(bodyRows.at(0).find('td').at(0).text()).to.equal('Barak');
      expect(bodyRows.at(0).find('td').at(1).text()).to.equal('Obama');
      expect(bodyRows.at(1).find('td').at(0).text()).to.equal('Donald');
      expect(bodyRows.at(1).find('td').at(1).text()).to.equal('Trump');
      expect(bodyRows.at(2).find('td').at(0).text()).to.equal('Hillary');
      expect(bodyRows.at(2).find('td').at(1).text()).to.equal('Clinton');
      wrapper.unmount();
    });

    it('should pass down extra props', () => {
      const theadOnClick = () => {};
      const thOnClick = () => {};
      const trOnClick = () => {};
      const tdOnClick = () => {};

      const newHead = {
        onClick: theadOnClick,
        cells: head.cells.map(cell => (
          {
            ...cell,
            onClick: thOnClick,
          }
            )),
      };
      const newRows = rows.map(row => ({
        ...row,
        onClick: trOnClick,
        cells: row.cells.map(cell => ({
          ...cell,
          onClick: tdOnClick,
        })),
      }));

      const wrapper = mount(
        <DynamicTable
          head={newHead}
          rows={newRows}
        />
        );
      expect(wrapper.find('thead').prop('onClick')).to.equal(theadOnClick);
      wrapper.find('th').forEach((headCell) => {
        expect(headCell.prop('onClick')).to.equal(thOnClick);
      });
      wrapper.find('tbody tr').forEach((bodyRow) => {
        expect(bodyRow.prop('onClick')).to.equal(trOnClick);
      });
      wrapper.find('td').forEach((bodyCell) => {
        expect(bodyCell.prop('onClick')).to.equal(tdOnClick);
      });
      wrapper.unmount();
    });

    describe('should invoke callbacks', () => {
      let onSetPage;
      let onSort;
      let wrapper;

      beforeEach(() => {
        onSetPage = spy();
        onSort = spy();
        wrapper = mount(
          <DynamicTable
            rowsPerPage={2}
            page={2}
            head={head}
            rows={rows}
            onSetPage={onSetPage}
            onSort={onSort}
          />
        );
      });

      afterEach(() => {
        wrapper.unmount();
      });

      it('onSort & onSetPage', () => {
        const headCells = wrapper.find('th');
        headCells.at(0).simulate('click');
        expect(onSort.calledOnce).to.equal(true);
        headCells.at(1).simulate('click');
        expect(onSort.calledOnce).to.equal(true);
        expect(onSort.calledWith({
          key: 'first_name',
          sortOrder: 'ASC',
          item: {
            key: 'first_name',
            content: 'First name',
            isSortable: true,
          },
        })).to.equal(true);
        expect(onSetPage.calledWith(1)).to.equal(true);
        expect(onSetPage.calledOnce).to.equal(true);
      });

      it('onSetPage', () => {
        wrapper.find(Pagination).find('button').at(1).simulate('click');
        expect(onSetPage.calledOnce).to.equal(true);
        expect(onSetPage.calledWith(1)).to.equal(true);
      });
    });
  });

  describe('stateful', () => {
    it('should display paginated data after navigating to a different page', () => {
      const wrapper = mount(
        <AkDynamicTable
          rowsPerPage={2}
          defaultPage={2}
          head={head}
          rows={rows}
        />
      );

      wrapper.find(Pagination).find('button').at(0).simulate('click');

      const bodyRows = wrapper.find('tbody tr');
      expect(bodyRows.length).to.equal(2);
      expect(bodyRows.at(0).find('td').at(0).text()).to.equal('Barak');
      expect(bodyRows.at(0).find('td').at(1).text()).to.equal('Obama');
      expect(bodyRows.at(1).find('td').at(0).text()).to.equal('Donald');
      expect(bodyRows.at(1).find('td').at(1).text()).to.equal('Trump');
      wrapper.unmount();
    });

    it('should sort data', () => {
      const wrapper = mount(
        <AkDynamicTable
          head={head}
          rows={rows}
        />
        );
      wrapper.find('th').at(0).simulate('click');
      wrapper.update();
      const bodyRows = wrapper.find('tbody tr');
      expect(bodyRows.at(0).find('td').at(0).text()).to.equal('Barak');
      expect(bodyRows.at(0).find('td').at(1).text()).to.equal('Obama');
      expect(bodyRows.at(1).find('td').at(0).text()).to.equal('Donald');
      expect(bodyRows.at(1).find('td').at(1).text()).to.equal('Trump');
      expect(bodyRows.at(2).find('td').at(0).text()).to.equal('Hillary');
      expect(bodyRows.at(2).find('td').at(1).text()).to.equal('Clinton');
      wrapper.unmount();
    });
  });
});
