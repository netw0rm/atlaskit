import React from 'react';
import { shallow, mount } from 'enzyme';
import { Label, FieldBase } from '@atlaskit/field-base';
import Droplist, { Group, Item } from '@atlaskit/droplist';
import UpIcon from '@atlaskit/icon/glyph/hipchat/arrow-up';

import styles from 'style!../src/styles.less';
import { StatelessSelect } from '../src';

import { name } from '../package.json';

describe(name, () => {
  const animStub = window.cancelAnimationFrame;
  beforeEach(() => {
    window.cancelAnimationFrame = () => {};
  });

  afterEach(() => {
    window.cancelAnimationFrame = animStub;
  });

  describe('render', () => {
    it('sanity check', () => {
      expect(shallow(<StatelessSelect />).isEmpty()).to.equal(false);
    });

    it('should render with correct CSS class name', () => {
      expect(mount(<StatelessSelect />).find(`.${styles.selectWrapper}`).length).to.equal(1);
    });

    it('should render Label when the prop is set', () => {
      expect(mount(<StatelessSelect />).find(Label).length).to.equal(0);
      expect(mount(<StatelessSelect label="test" />).find(Label).length).to.equal(1);
    });

    it('should render Droplist', () => {
      expect(mount(<StatelessSelect />).find(Droplist).length).to.equal(1);
    });

    it('should render Fieldbase inside Droplist', () => {
      expect(mount(<StatelessSelect />).find(FieldBase).length).to.equal(1);
      expect(mount(<StatelessSelect />).find(Droplist).find(FieldBase).length).to.equal(1);
    });

    it('should render placeholder in trigger if there is no selected item', () => {
      expect(mount(<StatelessSelect placeholder="test" />).text()).to.equal('test');
    });

    it('should render selected items`s content instead of placeholder', () => {
      const select = mount(<StatelessSelect placeholder="test" selectedItem={{ content: 'selected' }} />);
      expect(select.text()).to.not.equal('test');
      expect(select.text()).to.equal('selected');
    });

    it('should render selectedItems elemBefore', () => {
      const select = mount(<StatelessSelect placeholder="test" selectedItem={{ elemBefore: <UpIcon label="up" /> }} />);
      expect(select.find(UpIcon).length).to.equal(1);
    });

    it('should render groups and items inside Droplist (when open)', () => {
      const selectItems = [
        {
          heading: 'test',
          items: [
            { value: 1, content: '1' },
            { value: 2, content: '2' },
          ],
        },
      ];
      const select = mount(<StatelessSelect items={selectItems} isOpen />);
      expect(select.find(Group).length).to.equal(1);
      expect(select.find(Item).length).to.equal(2);
      expect(select.find(Group).find(Item).length).to.equal(2);
    });
  });

  describe('props managements', () => {
    it('should pass props to Label', () => {
      const select = mount(<StatelessSelect label="test" isRequired id="test2" />);
      const labelProps = select.find(Label).props();
      expect(labelProps.isRequired).to.equal(true);
      expect(labelProps.label).to.equal('test');
      expect(labelProps.htmlFor).to.equal('test2');
    });

    it('should pass props to Droplist', () => {
      const func = () => {};
      const select = mount(<StatelessSelect position="top right" isOpen onOpenChange={func} />);
      const droplistProps = select.find(Droplist).props();
      expect(droplistProps.position, 'position').to.equal('top right');
      expect(droplistProps.isOpen, 'isOpen').to.equal(true);
      expect(droplistProps.isTriggerNotTabbable, 'isTriggerNotTabbable').to.equal(true);
      expect(droplistProps.shouldFitContainer, 'shouldFitContainer').to.equal(true);
      expect(droplistProps.isKeyboardInteractionDisabled, 'isKeyboardInteractionDisabled').to.equal(true);
      expect(droplistProps.isTriggerDisabled, 'isTriggerDisabled').to.equal(true);
    });

    it('should pass props to fieldBase', () => {
      const select = mount(<StatelessSelect isDisabled isInvalid isOpen />);
      const fieldbaseProps = select.find(FieldBase).props();
      expect(fieldbaseProps.isDisabled, 'isDisabled').to.equal(true);
      expect(fieldbaseProps.isInvalid, 'isInvalid').to.equal(true);
      expect(fieldbaseProps.onFocus, 'onFocus').to.equal(select.instance().onFocus);
      expect(fieldbaseProps.isPaddingDisabled, 'isPaddingDisabled').to.equal(true);
      expect(fieldbaseProps.isFitContainerWidthEnabled, 'isFitContainerWidthEnabled').to.equal(true);
    });

    it('should pass props to Item', () => {
      const selectItems = [
        {
          heading: 'test',
          items: [
            {
              value: 1,
              content: 'Test1',
              description: 'Descr',
              isDisabled: true,
              elemBefore: '1',
              elemAfter: '2',
            },
          ],
        },
      ];
      const select = mount(<StatelessSelect
        isOpen
        id="testId"
        name="testName"
        items={selectItems}
      />);
      const itemProps = select.find(Item).props();
      expect(itemProps.description, 'description').to.equal('Descr');
      expect(itemProps.isDisabled, 'isDisabled').to.equal(true);
      expect(itemProps.elemBefore, 'elemBefore').to.equal('1');
      expect(itemProps.elemAfter, 'elemAfter').to.equal('2');
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
    const selectedItem = selectItems[0].items[1];

    beforeEach(() => {
      wrapper = mount(<StatelessSelect
        isOpen
        id="testId"
        name="testName"
        items={selectItems}
        selectedItem={selectedItem}
      />);
    });

    it('should render a select tag', () => {
      expect(wrapper.find('select').length).to.equal(1);
    });

    it('select tag should be invisible', () => {
      expect(wrapper.find('select').props().style.display).to.equal('none');
    });

    describe('optgroups', () => {
      it('should render optgroups inside a select tag', () => {
        expect(wrapper.find('select').find('optgroup').length).to.equal(1);
      });

      it('optgroups should have the label attribute', () => {
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

    it('should pass selected value into the select tag', () => {
      const item = { value: 1, content: 'Test1' };
      const hiddenSelect = wrapper.find('select');
      expect(hiddenSelect.props().value).to.deep.equal(selectedItem.value);

      wrapper.setProps({ selectedItem: item });
      expect(hiddenSelect.props().value).to.deep.equal(item.value);
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
    const selectedItem = selectItems[0].items[1];

    beforeEach(() => {
      wrapper = mount(<StatelessSelect
        isOpen
        items={selectItems}
        onFilterChange={onFilterChangeSpy}
        onOpenChange={onOpenChangeSpy}
        onSelected={onSelectedSpy}
        selectedItem={selectedItem}
      />);
      instance = wrapper.instance();
    });

    afterEach(() => {
      onFilterChangeSpy.reset();
      onOpenChangeSpy.reset();
      onSelectedSpy.reset();
      onRemovedSpy.reset();
      wrapper.setProps({ filterValue: '' });
      wrapper.setProps({ selectedItem });
    });

    describe('handleTriggerClick', () => {
      it('default behavior', () => {
        wrapper.setProps({ isOpen: false });
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

      it('should close select when it was open before', () => {
        wrapper.setProps({ isOpen: true });
        const args = { event: {}, isOpen: false };
        instance.handleTriggerClick({});
        expect(onOpenChangeSpy.called).to.equal(true);
        expect(onOpenChangeSpy.calledWith(args)).to.equal(true);
      });
    });

    describe('handleKeyboardInteractions', () => {
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

      it('should NOT call handleNativeSearch when autocompelte is enabled', () => {
        wrapper.setProps({ hasAutocomplete: true });
        const spy = sinon.spy(instance, 'handleNativeSearch');
        const event = { key: 'j' };
        instance.handleKeyboardInteractions(event);
        expect(spy.called).to.equal(false);
      });

      it('should NOT call handleNativeSearch when keyUp, keyDown or Enter are pressed', () => {
        wrapper.setProps({ hasAutocomplete: true });
        const spy = sinon.spy(instance, 'handleNativeSearch');
        ['Enter', 'ArrowUp', 'ArrowDown'].forEach(() => {
          const event = { key: 'Enter' };
          instance.handleKeyboardInteractions(event);
        });
        expect(spy.called).to.equal(false);
      });

      it('should call handleNativeSearch when other keys are pressed and autocomplete is not enabled', () => {
        const spy = sinon.spy(instance, 'handleNativeSearch');
        const event = { key: 'j' };
        instance.handleKeyboardInteractions(event);
        expect(spy.calledOnce).to.equal(true);
      });
    });

    describe('handleInputOnChange', () => {
      it('should call onFilterChange every time the value is changed', () => {
        const value1 = '1';
        const value2 = '2';
        let event = { key: '', target: { value: value1 } };
        instance.handleInputOnChange(event);
        expect(onFilterChangeSpy.calledOnce).to.equal(true);
        expect(onFilterChangeSpy.calledWith(value1)).to.equal(true);
        onFilterChangeSpy.reset();

        wrapper.setProps({ filterValue: value1 });
        event = { key: '', target: { value: value2 } };
        instance.handleInputOnChange(event);
        expect(onFilterChangeSpy.calledOnce).to.equal(true);
        expect(onFilterChangeSpy.calledWith(value2)).to.equal(true);
      });

      it('should not call onFilterChange when value is the same', () => {
        const value = '1';
        const event = { key: '', target: { value } };
        wrapper.setProps({ filterValue: value });
        instance.handleInputOnChange(event);
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
        wrapper.setProps({ selectedItem: {} });
        expect(instance.filterItems(items)).to.deep.equal(items);
      });

      it('should return filtered items when nothing is selected', () => {
        const items = [
          { value: 1, content: 'Test1' },
          { value: 2, content: 'Test 2' },
          { value: 3, content: 'Third test' },
        ];
        wrapper.setProps({ filterValue: 'Test1' });
        wrapper.setProps({ selectedItem: {} });
        expect(instance.filterItems(items)).to.deep.equal([items[0]]);
        wrapper.setProps({ filterValue: 'test' });
        expect(instance.filterItems(items)).to.deep.equal(items);
      });

      it('should filter out selected item and return filtered items', () => {
        const items = [
          { value: 1, content: 'Test one' },
          { value: 2, content: 'Test two' },
          { value: 3, content: 'Test three' },
          { value: 4, content: 'This should stay behind' },
        ];
        wrapper.setProps({ filterValue: 'Test' });
        wrapper.setProps({ selectedItem: items[0] });
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

      it('should call onFilterChange with items`s content when called', () => {
        instance.handleItemSelect(item, attrs);
        expect(onFilterChangeSpy.callCount).to.equal(1);
        expect(onFilterChangeSpy.calledWith(item.content)).to.equal(true);
      });
    });

    describe('getNextFocusable', () => {
      it('should return 0 if undefined is passed as a current focus', () => {
        expect(instance.getNextFocusable(undefined, 2)).to.equal(0);
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

        wrapper.setProps({ items: [{ heading: '', items }], filterValue: 'test', selectedItem: items[0] });
        expect(instance.getAllVisibleItems(wrapper.prop('items'))).to.deep.equal([items[1], items[2]]);
      });
    });

    describe('getAllItems', () => {
      it('should return all items', () => {
        const items = [
          { value: 1, content: 'Test1' },
          { value: 2, content: 'Test 2' },
          { value: 3, content: 'Third test' },
          { value: 4, content: 'Something different' },
        ];

        wrapper.setProps({ items: [{ heading: '', items }], filterValue: 'test', selectedItem: items[0] });
        expect(instance.getAllItems(wrapper.prop('items'))).to.deep.equal(items);
      });
    });

    describe('getNextNativeSearchItem', () => {
      const items = [
        { content: 'some text' },
        { content: 'another text' },
        { content: 'test text 1' },
        { content: 'test text 2' },
        { content: 'test text 3' },
        { content: 'again another text' },
      ];

      it('should return first matching item after given index', () => {
        expect(instance.getNextNativeSearchItem(items, 't', 0)).to.equal(items[2]);
        expect(instance.getNextNativeSearchItem(items, 't', 2)).to.equal(items[3]);
      });

      it('should return first matching item in the array if nothing is found after given index', () => {
        expect(instance.getNextNativeSearchItem(items, 't', 4)).to.equal(items[2]);
      });

      it('should return undefined if nothing is found', () => {
        expect(instance.getNextNativeSearchItem(items, 'y', 4)).to.equal(undefined);
      });
    });
  });

  describe('appearance variations', () => {
    it('should have appearance prop by default', () => {
      const wrapper = mount(<StatelessSelect />);
      expect(wrapper.prop('appearance')).to.equal('default');
    });

    it('should correctly map appearance prop to FieldBase', () => {
      const defaultMultiSelect = mount(<StatelessSelect />);
      const standardFieldBase = defaultMultiSelect.find(FieldBase);
      const subtleMultiSelect = mount(<StatelessSelect appearance="subtle" />);
      const subtleFieldBase = subtleMultiSelect.find(FieldBase);
      expect(standardFieldBase.prop('appearance')).to.equal('standard');
      expect(subtleFieldBase.prop('appearance')).to.equal('subtle');
    });
  });
});
