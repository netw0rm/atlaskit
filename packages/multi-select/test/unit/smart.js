import sinon from 'sinon';

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import SmartMultiSelect, { StatelessMultiSelect } from '../../src';
import { name } from '../../package.json';

describe(`${name} - smart`, () => {
  const animStub = window.cancelAnimationFrame;
  beforeEach(() => {
    window.cancelAnimationFrame = () => {};
  });

  afterEach(() => {
    window.cancelAnimationFrame = animStub;
  });

  describe('render', () => {
    it('should render stateless multi select', () => {
      expect(mount(<SmartMultiSelect />).find(StatelessMultiSelect).length).to.equal(1);
    });

    it('should pass all the relevant props to the stateless component', () => {
      const items = [
        {
          heading: 'test',
          items: [
            { value: 1, content: '1' },
            { value: 2, content: '2' },
          ],
        },
      ];
      const wrapper = mount(<SmartMultiSelect
        appearance="subtle"
        defaultSelected={[items[0].items[0]]}
        id="id"
        isDefaultOpen
        isDisabled
        shouldFocus
        isInvalid
        isRequired
        items={items}
        label="label"
        name="name"
        noMatchesFound="no matches"
        position="top left"
        shouldFitContainer
      />);
      const statelessProps = wrapper.find(StatelessMultiSelect).props();
      expect(statelessProps.appearance, 'appearance').to.equal('subtle');
      expect(statelessProps.id, 'id').to.equal('id');
      expect(statelessProps.isDisabled, 'isDisabled').to.equal(true);
      expect(statelessProps.isInvalid, 'isInvalid').to.equal(true);
      expect(statelessProps.isOpen, 'isOpen').to.equal(true);
      expect(statelessProps.isRequired, 'isRequired').to.equal(true);
      expect(statelessProps.items, 'items').to.equal(items);
      expect(statelessProps.label, 'label').to.equal('label');
      expect(statelessProps.name, 'name').to.equal('name');
      expect(statelessProps.noMatchesFound, 'noMatchesFound').to.equal('no matches');
      expect(statelessProps.position, 'position').to.equal('top left');
      expect(statelessProps.selectedItems, 'selectedItems').to.deep.equal([items[0].items[0]]);
      expect(statelessProps.shouldFitContainer, 'shouldFitContainer').to.equal(true);
      expect(statelessProps.shouldFocus, 'shouldFocus').to.equal(true);
    });
  });

  describe('inner functions', () => {
    let wrapper;
    let instance;
    const onFilterChangeSpy = sinon.spy();
    const onOpenChangeSpy = sinon.spy();
    const onSelectedChange = sinon.spy();
    const items = [
      {
        heading: 'test',
        items: [
          { value: 1, content: '1' },
          { value: 2, content: '2' },
        ],
      },
    ];

    beforeEach(() => {
      wrapper = mount(<SmartMultiSelect
        defaultSelected={[items[0].items[0]]}
        items={items}
        onFilterChange={onFilterChangeSpy}
        onOpenChange={onOpenChangeSpy}
        onSelectedChange={onSelectedChange}
      />);
      instance = wrapper.instance();
    });

    afterEach(() => {
      onFilterChangeSpy.reset();
      onOpenChangeSpy.reset();
      onSelectedChange.reset();
    });

    describe('handleOpenChange', () => {
      const attrs = { isOpen: true };

      it('should call onOpenChange when triggered', () => {
        instance.handleOpenChange(attrs);
        expect(onOpenChangeSpy.callCount).to.equal(1);
        expect(onOpenChangeSpy.calledWith(attrs)).to.equal(true);
      });

      it('should set isOpen state', () => {
        instance.handleOpenChange(attrs);
        expect(wrapper.state().isOpen).to.equal(true);
        instance.handleOpenChange({ isOpen: false });
        expect(wrapper.state().isOpen).to.equal(false);
      });
    });

    describe('handleFilterChange', () => {
      const value = 'test';
      it('should call onFilterChange when triggered', () => {
        instance.handleFilterChange(value);
        expect(onFilterChangeSpy.callCount).to.equal(1);
        expect(onFilterChangeSpy.calledWith(value)).to.equal(true);
      });

      it('should set filterValue state', () => {
        instance.handleFilterChange(value);
        expect(wrapper.state().filterValue).to.equal(value);
      });
    });

    describe('selectedChange', () => {
      it('should call removeItem when an item was removed', () => {
        const item = items[0].items[0];
        const spy = sinon.spy(instance, 'removeItem');
        instance.selectedChange(item);
        expect(spy.called).to.equal(true);
      });

      it('should call selectItem when an item was added', () => {
        const spy = sinon.spy(instance, 'selectItem');
        instance.selectedChange({ content: 'something new' });
        expect(spy.called).to.equal(true);
      });
    });

    describe('removeItem', () => {
      it('should remove the item and set the new selectedItems state', () => {
        const item = items[0].items[0];
        instance.removeItem(item);
        expect(wrapper.state().selectedItems).to.deep.equal([]);
      });

      it('should remove the item and call onSelectedChange', () => {
        const item = items[0].items[0];
        instance.removeItem(item);
        expect(onSelectedChange.callCount).to.equal(1);
      });

      it('onSelectedChange should be called with the correct params', () => {
        const item = items[0].items[0];
        instance.removeItem(item);
        expect(onSelectedChange.calledWith({ items: [], action: 'remove', changed: item })).to.equal(true);
      });
    });

    describe('selectItem', () => {
      it('should add the item and set the new selectedItems state', () => {
        const item = { content: 'new' };
        instance.selectItem(item);
        expect(wrapper.state().selectedItems).to.deep.equal([items[0].items[0], item]);
      });

      it('should add the item and call onSelectedChange', () => {
        const item = { content: 'new' };
        instance.selectItem(item);
        expect(onSelectedChange.callCount).to.equal(1);
      });

      it('onSelectedChange should be called with the correct params', () => {
        const item = { content: 'new' };
        instance.selectItem(item);
        expect(onSelectedChange.calledWith({ items: [items[0].items[0], item], action: 'select', changed: item })).to.equal(true);
      });
    });
  });
});
