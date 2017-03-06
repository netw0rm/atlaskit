import React from 'react';
import { shallow, mount } from 'enzyme';
import { Label, FieldBase } from '@atlaskit/field-base';
import Droplist from '@atlaskit/droplist';
import Group from '@atlaskit/droplist-group';
import Item from '@atlaskit/droplist-item';
import Tag from '@atlaskit/tag';

import styles from 'style!../src/styles.less';
import { StatelessMultiSelect } from '../src';
import Trigger from '../src/internal/Trigger';

import { name } from '../package.json';

describe(`${name} - stateless`, () => {
  const animStub = window.cancelAnimationFrame;
  beforeEach(() => {
    window.cancelAnimationFrame = () => {};
  });

  afterEach(() => {
    window.cancelAnimationFrame = animStub;
  });

  describe('render', () => {
    it('sanity check', () => {
      expect(shallow(<StatelessMultiSelect />).isEmpty()).to.equal(false);
    });

    it('should render with correct CSS class name', () => {
      expect(mount(<StatelessMultiSelect />).find(`.${styles.selectWrapper}`).length).to.equal(1);
    });

    it('should render Label when the prop is set', () => {
      expect(mount(<StatelessMultiSelect />).find(Label).length).to.equal(0);
      expect(mount(<StatelessMultiSelect label="test" />).find(Label).length).to.equal(1);
    });

    it('should render Droplist', () => {
      expect(mount(<StatelessMultiSelect />).find(Droplist).length).to.equal(1);
    });

    it('should render Fieldbase inside Droplist', () => {
      expect(mount(<StatelessMultiSelect />).find(FieldBase).length).to.equal(1);
      expect(mount(<StatelessMultiSelect />).find(Droplist).find(FieldBase).length).to.equal(1);
    });

    it('should render Trigger inside Fieldbase', () => {
      expect(mount(<StatelessMultiSelect />).find(Trigger).length).to.equal(1);
      expect(mount(<StatelessMultiSelect />).find(FieldBase).find(Trigger).length).to.equal(1);
    });

    it('should render groups and items inside Droplist (when open)', () => {
      const items = [
        {
          heading: 'test',
          items: [
            { value: 1, content: '1' },
            { value: 2, content: '2' },
          ],
        },
      ];
      const select = mount(<StatelessMultiSelect items={items} isOpen />);
      expect(select.find(Group).length).to.equal(1);
      expect(select.find(Item).length).to.equal(2);
      expect(select.find(Group).find(Item).length).to.equal(2);
    });
  });

  describe('behavior', () => {
    let select;
    beforeEach(() => {
      select = mount(<StatelessMultiSelect />);
    });

    describe('focus', () => {
      it('should focus the input field if shouldFocus is set to true', () => {
        const input = select.find('input');
        expect(document.activeElement).not.to.equal(input.node);
        select.setProps({ shouldFocus: true });
        expect(document.activeElement).to.equal(input.node);
      });
    });
  });

  describe('hidden select', () => {
    let wrapper;
    const selectItems = [
      {
        heading: 'test',
        items: [
          { value: 1, content: 'Test1' },
          { value: 2, content: 'Test 2' },
          { value: 3, content: 'Third test', isDisabled: true },
        ],
      },
    ];
    const selectedItems = [selectItems[0].items[1]];

    beforeEach(() => {
      wrapper = mount(<StatelessMultiSelect
        isOpen
        id="testId"
        name="testName"
        items={selectItems}
        selectedItems={selectedItems}
      />);
    });

    it('should render a select tag', () => {
      expect(wrapper.find('select').length).to.equal(1);
    });

    it('select tag should be invisible', () => {
      expect(wrapper.find('select').props().style.display).to.equal('none');
    });

    describe('optgroups', () => {
      it('should render optgroups inside select tag', () => {
        expect(wrapper.find('select').find('optgroup').length).to.equal(1);
      });

      it('optgroups should have label attribute', () => {
        const label = selectItems[0].heading;
        expect(wrapper.find('select').find(`optgroup[label="${label}"]`).length).to.equal(1);
      });

      describe('options', () => {
        it('should render options inside optgroups', () => {
          expect(wrapper.find('select').find('optgroup').find('option').length).to.equal(3);
        });

        it('should have "disabled" attribute if the option is disabled', () => {
          expect(wrapper.find('select').find('optgroup').find('option[disabled]').length).to.equal(1);
        });

        it('should have "value" attribute', () => {
          const firstValue = selectItems[0].items[0].value;
          const optgroup = wrapper.find('select').find('optgroup');
          expect(optgroup.find('option[value]').length).to.equal(3);
          expect(optgroup.find(`option[value=${firstValue}]`).length).to.equal(1);
        });

        it('should render content inside', () => {
          const firstContent = selectItems[0].items[0].content;
          const optgroup = wrapper.find('select').find('optgroup');
          expect(optgroup.find('option[value]').at(0).text()).to.equal(firstContent);
        });
      });
    });

    it('should pass selected values into the select tag', () => {
      const items = [
        { value: 1, content: 'Test1' },
        { value: 2, content: 'Test 2' },
        { value: 3, content: 'Third test' },
      ];
      const itemsValues = [items[0].value, items[1].value, items[2].value];
      const hiddenSelect = wrapper.find('select');
      expect(hiddenSelect.props().value).to.deep.equal([selectedItems[0].value]);

      wrapper.setProps({ selectedItems: items });
      expect(hiddenSelect.props().value).to.deep.equal(itemsValues);
    });

    it('select tag should have "multiple" attribute', () => {
      expect(wrapper.find('select[multiple]').length).to.equal(1);
    });

    it('select tag should have "readOnly" attribute', () => {
      expect(wrapper.find('select[readOnly]').length).to.equal(1);
    });

    it('should pass id into the select tag', () => {
      expect(wrapper.find('select').props().id).to.equal(wrapper.prop('id'));
    });

    it('should pass name into the select tag', () => {
      expect(wrapper.find('select').props().name).to.equal(wrapper.prop('name'));
    });
  });

  describe('callbacks', () => {
    const selectItems = [
      {
        heading: 'test',
        items: [
          { value: 1, content: '1' },
          { value: 2, content: '2' },
        ],
      },
    ];

    it('should call onRemoved when an item is removed', () => {
      const spy = sinon.spy();
      const select = mount(<StatelessMultiSelect
        items={selectItems}
        isOpen onRemoved={spy}
        selectedItems={[selectItems[0].items[0]]}
      />);
      select.find(Tag).first().props().onAfterRemoveAction();
      expect(spy.callCount).to.equal(1);
    });
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

  describe('disabled component', () => {
    let wrapper;
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
        appearance="subtle"
        isDisabled
        items={selectItems}
        selectedItems={selectedItems}
      />);
    });

    it('native select should be "disabled"', () => {
      expect(wrapper.find('select[disabled]').length).to.equal(1);
    });

    it('should pass appearance property to field base', () => {
      expect(wrapper.find(FieldBase).prop('appearance')).to.equal('subtle');
    });

    it('should pass isDisabled property to field base', () => {
      expect(wrapper.find(FieldBase).prop('isDisabled')).to.equal(true);
    });

    it('should pass isDisabled property to Trigger sub-component', () => {
      expect(wrapper.find(Trigger).prop('isDisabled')).to.equal(true);
    });

    it('should not render input if disabled', () => {
      expect(wrapper.find('input[disabled]').length).to.equal(0);
    });
  });

  describe('appearance variations', () => {
    it('should have appearance prop by default', () => {
      const wrapper = mount(<StatelessMultiSelect />);
      expect(wrapper.prop('appearance')).to.equal('default');
    });

    it('should correctly map appearance prop to FieldBase', () => {
      const defaultMultiSelect = mount(<StatelessMultiSelect />);
      const standardFieldBase = defaultMultiSelect.find(FieldBase);
      const subtleMultiSelect = mount(<StatelessMultiSelect appearance="subtle" />);
      const subtleFieldBase = subtleMultiSelect.find(FieldBase);
      expect(standardFieldBase.prop('appearance')).to.equal('standard');
      expect(subtleFieldBase.prop('appearance')).to.equal('subtle');
    });
  });
});
