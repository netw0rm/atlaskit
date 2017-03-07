import React from 'react';
import { mount } from 'enzyme';
import { StatelessMultiSelect } from '../src';

import { name } from '../package.json';

describe(`${name} - stateless`, () => {
  const animStub = window.cancelAnimationFrame;
  beforeEach(() => {
    window.cancelAnimationFrame = () => {};
  });

  afterEach(() => {
    window.cancelAnimationFrame = animStub;
  });

  describe('private functions', () => {
    const onFilterChangeSpy = sinon.spy();
    const onOpenChangeSpy = sinon.spy();
    const onSelectedSpy = sinon.spy();
    const onRemovedSpy = sinon.spy();
    let wrapper;
    let instance;
    const selectItems = [
      {
        heading: 'test',
        items: [
          { value: 1, content: 'Test1' },
          { value: 2, content: 'Test 2' },
          { value: 3, content: 'Third test' },
        ],
      },
    ];
    const selectedItems = [selectItems[0].items[1]];

    beforeEach(() => {
      wrapper = mount(<StatelessMultiSelect
        isOpen
        items={selectItems}
        onFilterChange={onFilterChangeSpy}
        onOpenChange={onOpenChangeSpy}
        onRemoved={onRemovedSpy}
        onSelected={onSelectedSpy}
        selectedItems={selectedItems}
      />);
      instance = wrapper.instance();
    });

    afterEach(() => {
      onFilterChangeSpy.reset();
      onOpenChangeSpy.reset();
      onSelectedSpy.reset();
      onRemovedSpy.reset();
      wrapper.setProps({ filterValue: '' });
      wrapper.setProps({ selectedItems });
    });

    describe('handleTriggerClick', () => {
      it('default behavior', () => {
        const args = { event: {}, isOpen: true };
        instance.handleTriggerClick({});
        expect(onOpenChangeSpy.calledOnce).to.equal(true);
        expect(onOpenChangeSpy.calledWith(args)).to.equal(true);
      });

      it('disabled select', () => {
        wrapper.setProps({ isDisabled: true });
        instance.handleTriggerClick({});
        expect(onOpenChangeSpy.called).to.equal(false);
        wrapper.setProps({ isDisabled: false });
      });
    });

    it('handleItemRemove', () => {
      const args = {};
      instance.handleItemRemove(args);
      expect(onRemovedSpy.calledOnce).to.equal(true);
      expect(onRemovedSpy.calledWith(args)).to.equal(true);
    });

    it('removeLatestItem', () => {
      const spy = sinon.spy(instance, 'handleItemRemove');
      instance.removeLatestItem();
      expect(spy.calledOnce).to.equal(true);
      expect(onRemovedSpy.calledWith(selectedItems[0])).to.equal(true);
    });

    describe('handleKeyboardInteractions', () => {
      it('should call onOpenChange when there was no value and Backspace was pressed', () => {
        const event = { key: 'Backspace', target: { value: '' } };
        instance.handleKeyboardInteractions(event);
        expect(onOpenChangeSpy.calledOnce).to.equal(true);
        expect(onOpenChangeSpy.calledWith({ event, isOpen: true })).to.equal(true);
      });

      it('should call removeLatestItem when there was no value and Backspace was pressed', () => {
        const spy = sinon.spy(instance, 'removeLatestItem');
        const event = { key: 'Backspace', target: { value: '' } };
        instance.handleKeyboardInteractions(event);
        expect(spy.calledOnce).to.equal(true);
      });

      it('should call focusNextItem when ArrowDown is pressed and Select is open', () => {
        const spy = sinon.spy(instance, 'focusNextItem');
        const preventDefaultSpy = sinon.spy();
        const event = { key: 'ArrowDown', preventDefault: preventDefaultSpy };
        instance.handleKeyboardInteractions(event);
        expect(spy.calledOnce).to.equal(true);
        expect(preventDefaultSpy.calledOnce).to.equal(true);
      });

      it('should call focusNextItem when ArrowDown is pressed and Select is closed', () => {
        wrapper.setProps({ isOpen: false });
        const spy = sinon.spy(instance, 'focusNextItem');
        const preventDefaultSpy = sinon.spy();
        const event = { key: 'ArrowDown', preventDefault: preventDefaultSpy };
        instance.handleKeyboardInteractions(event);
        expect(spy.calledOnce).to.equal(true);
        expect(preventDefaultSpy.calledOnce).to.equal(true);
      });

      it('should call onOpenChange when ArrowDown is pressed and Select is closed', () => {
        wrapper.setProps({ isOpen: false });
        const spy = sinon.spy(instance, 'onOpenChange');
        const preventDefaultSpy = sinon.spy();
        const event = { key: 'ArrowDown', preventDefault: preventDefaultSpy };
        instance.handleKeyboardInteractions(event);
        expect(spy.calledOnce).to.equal(true);
        expect(preventDefaultSpy.calledOnce).to.equal(true);
      });

      it('should call focusPreviousItem when ArrowUp is pressed and Select is open', () => {
        const spy = sinon.spy(instance, 'focusPreviousItem');
        const preventDefaultSpy = sinon.spy();
        const event = { key: 'ArrowUp', preventDefault: preventDefaultSpy };
        instance.handleKeyboardInteractions(event);
        expect(spy.calledOnce).to.equal(true);
        expect(preventDefaultSpy.calledOnce).to.equal(true);
      });

      it('should NOT call focusPreviousItem when ArrowUp is pressed and Select is closed', () => {
        wrapper.setProps({ isOpen: false });
        const spy = sinon.spy(instance, 'focusPreviousItem');
        const preventDefaultSpy = sinon.spy();
        const event = { key: 'ArrowUp', preventDefault: preventDefaultSpy };
        instance.handleKeyboardInteractions(event);
        expect(spy.called).to.equal(false);
        expect(preventDefaultSpy.calledOnce).to.equal(true);
      });

      it('should call handleItemSelect when Enter is pressed and an item is focused and Select is open', () => {
        wrapper.setState({ focusedItemIndex: 0 });
        const spy = sinon.spy(instance, 'handleItemSelect');
        const event = { key: 'Enter' };
        instance.handleKeyboardInteractions(event);
        expect(spy.calledOnce).to.equal(true);
      });

      it('should NOT call handleItemSelect when Enter is pressed and no item is focused and Select is open', () => {
        const spy = sinon.spy(instance, 'handleItemSelect');
        const event = { key: 'Enter' };
        instance.handleKeyboardInteractions(event);
        expect(spy.called).to.equal(false);
      });

      it('should NOT call handleItemSelect when Enter is pressed and Select is closed', () => {
        wrapper.setProps({ isOpen: false });
        wrapper.setState({ focusedItemIndex: 0 });
        const spy = sinon.spy(instance, 'handleItemSelect');
        const event = { key: 'Enter' };
        instance.handleKeyboardInteractions(event);
        expect(spy.called).to.equal(false);
      });
    });

    describe('handleOnChange', () => {
      it('should call onFilterChange every time the value is changed', () => {
        const value1 = '1';
        const value2 = '2';
        let event = { key: '', target: { value: value1 } };
        instance.handleOnChange(event);
        expect(onFilterChangeSpy.calledOnce).to.equal(true);
        expect(onFilterChangeSpy.calledWith(value1)).to.equal(true);
        onFilterChangeSpy.reset();

        wrapper.setProps({ filterValue: value1 });
        event = { key: '', target: { value: value2 } };
        instance.handleOnChange(event);
        expect(onFilterChangeSpy.calledOnce).to.equal(true);
        expect(onFilterChangeSpy.calledWith(value2)).to.equal(true);
      });

      it('should not call onFilterChange when value is the same', () => {
        const value = '1';
        const event = { key: '', target: { value } };
        wrapper.setProps({ filterValue: value });
        instance.handleOnChange(event);
        expect(onFilterChangeSpy.called).to.equal(false);
      });
    });

    describe('filterItems', () => {
      it('should return items intact if nothing is selected and filter is empty', () => {
        const items = [
          { value: 1, content: 'Test1' },
          { value: 2, content: 'Test 2' },
          { value: 3, content: 'Third test' },
        ];
        wrapper.setProps({ filterValue: '' });
        wrapper.setProps({ selectedItems: [] });
        expect(instance.filterItems(items)).to.deep.equal(items);
      });

      it('should filter out selected items when the filter is empty', () => {
        const items = [
          { value: 1, content: 'Test1' },
          { value: 2, content: 'Test 2' },
          { value: 3, content: 'Third test' },
        ];
        wrapper.setProps({ filterValue: '' });
        wrapper.setProps({ selectedItems: [items[0]] });
        expect(instance.filterItems(items)).to.deep.equal([items[1], items[2]]);
      });

      it('should return filtered items when nothing is selected', () => {
        const items = [
          { value: 1, content: 'Test1' },
          { value: 2, content: 'Test 2' },
          { value: 3, content: 'Third test' },
        ];
        wrapper.setProps({ filterValue: 'Test1' });
        wrapper.setProps({ selectedItems: [] });
        expect(instance.filterItems(items)).to.deep.equal([items[0]]);
        wrapper.setProps({ filterValue: 'test' });
        expect(instance.filterItems(items)).to.deep.equal(items);
      });

      it('should filter out selected items and return filtered items', () => {
        const items = [
          { value: 1, content: 'Test one' },
          { value: 2, content: 'Test two' },
          { value: 3, content: 'Test three' },
          { value: 4, content: 'This should stay behind' },
        ];
        wrapper.setProps({ filterValue: 'Test' });
        wrapper.setProps({ selectedItems: [items[0]] });
        expect(instance.filterItems(items)).to.deep.equal([items[1], items[2]]);
      });
    });

    describe('onFocus', () => {
      it('default behavior', () => {
        wrapper.setState({ isFocused: false });
        instance.onFocus();
        expect(wrapper.state().isFocused).to.equal(true);
      });

      it('disabled select', () => {
        wrapper.setState({ isFocused: false });
        wrapper.setProps({ isDisabled: true });
        instance.onFocus();
        expect(wrapper.state().isFocused).to.equal(false);
      });
    });

    describe('onBlur', () => {
      it('default behavior', () => {
        wrapper.setState({ isFocused: true });
        instance.onBlur();
        expect(wrapper.state().isFocused).to.equal(false);
      });

      it('disabled select', () => {
        wrapper.setState({ isFocused: true });
        wrapper.setProps({ isDisabled: true });
        instance.onBlur();
        expect(wrapper.state().isFocused).to.equal(true);
      });
    });

    describe('getPlaceholder', () => {
      const items = [
        { value: 1, content: 'Test1' },
        { value: 2, content: 'Test 2' },
        { value: 3, content: 'Third test' },
      ];
      const placeholder = 'Test!';

      it('should return "placeholder" text for the empty select', () => {
        wrapper.setProps({ isOpen: false });
        wrapper.setProps({ selectedItems: [] });
        wrapper.setProps({ placeholder });
        expect(instance.getPlaceholder()).to.equal(placeholder);
      });

      it('should return null if some items are selected', () => {
        wrapper.setProps({ isOpen: false });
        wrapper.setProps({ selectedItems: [items[0]] });
        wrapper.setProps({ placeholder });
        expect(instance.getPlaceholder()).to.equal(null);
      });

      it('should return null if the select is opened', () => {
        wrapper.setProps({ isOpen: true });
        wrapper.setProps({ selectedItems: [] });
        wrapper.setProps({ placeholder });
        expect(instance.getPlaceholder()).to.equal(null);
      });
    });

    describe('handleItemSelect', () => {
      const item = selectItems[0].items[0];
      const attrs = { event: {} };

      it('should call onSelected when called', () => {
        instance.handleItemSelect(item, attrs);
        expect(onSelectedSpy.callCount).to.equal(1);
      });

      it('should call onOpenChange when called', () => {
        instance.handleItemSelect(item, attrs);
        expect(onOpenChangeSpy.callCount).to.equal(1);
        expect(onOpenChangeSpy.calledWith({ isOpen: false, event: attrs.event })).to.equal(true);
      });

      it('should call onFilterChange with empty string when called', () => {
        instance.handleItemSelect(item, attrs);
        expect(onFilterChangeSpy.callCount).to.equal(1);
        expect(onFilterChangeSpy.calledWith('')).to.equal(true);
      });
    });

    describe('getNextFocusable', () => {
      it('should return 0 if null is passed as a current focus', () => {
        expect(instance.getNextFocusable(null, 2)).to.equal(0);
      });

      it('should return next item', () => {
        expect(instance.getNextFocusable(0, 2)).to.equal(1);
      });

      it('should return 0 if focus is on the last item', () => {
        expect(instance.getNextFocusable(2, 2)).to.equal(0);
      });
    });

    describe('getPrevFocusable', () => {
      it('should return previous item', () => {
        expect(instance.getPrevFocusable(1, 2)).to.equal(0);
      });

      it('should return length if focus is on the first item', () => {
        expect(instance.getPrevFocusable(0, 2)).to.equal(2);
      });
    });

    describe('getAllVisibleItems', () => {
      it('should return all visible items', () => {
        const items = [
          { value: 1, content: 'Test1' },
          { value: 2, content: 'Test 2' },
          { value: 3, content: 'Third test' },
          { value: 4, content: 'Something different' },
        ];

        wrapper.setProps({ items: [{ heading: '', items }], filterValue: 'test', selectedItems: [items[0]] });
        expect(instance.getAllVisibleItems(wrapper.prop('items'))).to.deep.equal([items[1], items[2]]);
      });
    });
  });
});
