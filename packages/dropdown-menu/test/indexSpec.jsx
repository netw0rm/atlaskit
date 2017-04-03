import sinon from 'sinon';

import React from 'react';
import { shallow, mount } from 'enzyme';
import Droplist from '@atlaskit/droplist';
import Button from '@atlaskit/button';
import MoreIcon from '@atlaskit/icon/glyph/more';
import ExpandIcon from '@atlaskit/icon/glyph/expand';

import { name } from '../package.json';

import Menu from '../src';

const itemsList = [
  {
    heading: 'test1',
    items: [
      {
        content: 'Some text',
      },
    ],
  },
  {
    heading: 'test2',
    items: [],
  },
];

describe(name, () => {
  const animStub = window.cancelAnimationFrame;
  beforeEach(() => {
    window.cancelAnimationFrame = () => {};
  });

  afterEach(() => {
    window.cancelAnimationFrame = animStub;
  });

  it('should be possible to create a component', () => {
    expect(shallow(<Menu>test</Menu>)).not.to.equal(undefined);
  });

  describe('render', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Menu items={itemsList}>text</Menu>);
    });

    it('should render Droplist component', () => {
      expect(wrapper.find(Droplist).length).to.equal(1);
    });

    it('should pass required properties to Droplist', () => {
      const droplist = wrapper.find(Droplist);
      expect(droplist.prop('position')).to.equal(wrapper.props().position);
      expect(droplist.prop('appearance')).to.equal(wrapper.props().appearance);
      expect(droplist.prop('isTriggerNotTabbable')).to.equal(wrapper.props().isTriggerNotTabbable);
      expect(droplist.prop('shouldFlip')).to.equal(wrapper.props().shouldFlip);
      expect(droplist.prop('isOpen')).to.equal(wrapper.state().isOpen);
      expect(droplist.prop('trigger')).to.equal('text');
    });

    it('should pass required properties to the button trigger', () => {
      [
        <Menu items={itemsList} triggerType="button">text</Menu>,
        <Menu items={itemsList} triggerType="button" defaultOpen>text</Menu>,
      ].forEach((val) => {
        const menu = mount(val);
        const button = menu.find(Button);
        expect(button.prop('isSelected')).to.equal(menu.props().defaultOpen);
        expect(button.prop('ariaHaspopup')).to.equal(true);
        expect(button.prop('ariaExpanded')).to.equal(menu.props().defaultOpen);
        expect(button.prop('ariaControls')).to.not.equal(undefined);
      });
    });

    it('should default to button with expand icon for triggerType=button with no overrides', () => {
      const text = 'text';
      const menu = mount(<Menu items={itemsList} triggerType="button">{ text }</Menu>);
      const trigger = menu.find(Button);
      expect(trigger.prop('iconBefore')).to.equal(undefined);
      expect(trigger.prop('iconAfter')).not.to.equal(undefined);
      expect(trigger.prop('children')).to.equal(text);
      expect(menu.find(ExpandIcon).length).to.equal(1);
    });

    it('should pass through triggerButtonProps to the trigger for triggerType=button', () => {
      const triggerProps = {
        appearance: 'subtle',
        id: 'button-123',
        theme: 'dark',
      };
      const menu = mount(<Menu items={itemsList} triggerType="button" triggerButtonProps={triggerProps} />);
      const trigger = menu.find(Button);
      expect(trigger.prop('appearance')).to.equal(triggerProps.appearance);
      expect(trigger.prop('id')).to.equal(triggerProps.id);
      expect(trigger.prop('theme')).to.equal(triggerProps.theme);
    });

    it('should render provided iconAfter in trigger instead of default expand icon if provided', () => {
      const triggerProps = {
        iconAfter: <MoreIcon label="more" />,
      };
      const menu = mount(<Menu items={itemsList} triggerType="button" triggerButtonProps={triggerProps} />);
      const trigger = menu.find(Button);
      expect(trigger.prop('iconBefore')).to.equal(undefined);
      expect(trigger.prop('iconAfter')).to.equal(triggerProps.iconAfter);
      expect(menu.find(MoreIcon).length).to.equal(1);
    });

    it('should render provided iconBefore in trigger instead of default expand icon if provided', () => {
      const triggerProps = {
        iconBefore: <MoreIcon label="more" />,
      };
      const menu = mount(<Menu items={itemsList} triggerType="button" triggerButtonProps={triggerProps} />);
      const trigger = menu.find(Button);
      expect(trigger.prop('iconBefore')).to.equal(triggerProps.iconBefore);
      expect(trigger.prop('iconAfter')).to.equal(undefined);
      expect(menu.find(MoreIcon).length).to.equal(1);
    });
  });

  describe('show/hide logic', () => {
    it('should be open when the defaultOpen property set to true', () => {
      expect(shallow(<Menu defaultOpen>text</Menu>).state().isOpen).to.equal(true);
    });

    it('interacting with trigger should open the dropdown', () => {
      const wrapper = mount(<Menu items={itemsList}><div id="trigger">test</div></Menu>);
      const trigger = wrapper.find('#trigger');
      expect(wrapper.state().isOpen).to.equal(false);
      trigger.simulate('click');
      expect(wrapper.state().isOpen).to.equal(true);
    });

    it('interacting with link item should close the dropdown', () => {
      const items = [{
        heading: 'group',
        items: [
          { content: 'item 1', href: '#' },
        ],
      }];
      const wrapper = mount(<Menu items={items} defaultOpen>test</Menu>);
      const item = wrapper.find('[role="menuitem"]');
      expect(wrapper.state().isOpen).to.equal(true);
      item.simulate('click');
      expect(wrapper.state().isOpen).to.equal(false);
    });

    it('interacting with checkbox item should not close the menu', () => {
      const items = [{
        heading: 'group',
        items: [
          { content: 'item 1', type: 'checkbox' },
        ],
      }];
      const wrapper = mount(<Menu items={items} defaultOpen>test</Menu>);
      const item = wrapper.find('[role="menuitemcheckbox"]');
      expect(wrapper.state().isOpen).to.equal(true);
      item.simulate('click');
      expect(wrapper.state().isOpen).to.equal(true);
    });

    it('interacting with radio item should not close the menu', () => {
      const items = [{
        heading: 'group',
        items: [
          { content: 'item 1', type: 'radio' },
        ],
      }];
      const wrapper = mount(<Menu items={items} defaultOpen>test</Menu>);
      const item = wrapper.find('[role="menuitemradio"]');
      expect(wrapper.state().isOpen).to.equal(true);
      item.simulate('click');
      expect(wrapper.state().isOpen).to.equal(true);
    });
  });

  describe('onItemActivated', () => {
    it('should be call when an item was activated', () => {
      const items = [{
        heading: 'group',
        items: [
          { content: 'item 1', type: 'checkbox' },
        ],
      }];
      const spy = sinon.spy();
      const wrapper = mount(<Menu items={items} defaultOpen onItemActivated={spy}>
        test</Menu>);
      const item = wrapper.find('[role="menuitemcheckbox"]');
      item.simulate('click');
      expect(spy.called).to.equal(true);
    });

    it('should pass the item when activated', () => {
      const items = [{
        heading: 'group',
        items: [
          { content: 'item 1', type: 'checkbox' },
        ],
      }];
      let attrs;
      const wrapper = mount(<Menu items={items} defaultOpen onItemActivated={a => (attrs = a)}>
        test</Menu>);
      const item = wrapper.find('[role="menuitemcheckbox"]');
      item.simulate('click');
      expect(attrs).not.to.equal(undefined);
      expect(attrs.item).not.to.equal(undefined);
      expect(attrs.item).to.equal(items[0].items[0]);
      expect(attrs.item).to.deep.equal({ content: 'item 1', type: 'checkbox', isChecked: true });
    });
  });

  describe('handleItemActivation', () => {
    describe('radio', () => {
      const item1 = { content: 'item 1', type: 'radio' };
      const item2 = { content: 'item 2', type: 'radio' };
      const group = {
        heading: 'group',
        items: [item1, item2],
      };
      const items = [group];
      let wrapper;
      let handler;

      beforeEach(() => {
        wrapper = mount(<Menu items={items} defaultOpen>test</Menu>);
        handler = wrapper.instance().handleItemActivation;
      });

      it('should set `checked` to true when the radio item is activated', () => {
        handler({ item: item1 });
        const stateItems = wrapper.state('items');
        expect(stateItems[0].items[0].isChecked).to.equal(true);
      });

      it('should stay `checked` if the item is activated more then once', () => {
        handler({ item: item1 });
        handler({ item: item1 });
        const stateItems = wrapper.state('items');
        expect(stateItems[0].items[0].isChecked).to.equal(true);
      });

      it('should switch `checked` item to the new one, only one item can be checked', () => {
        handler({ item: item1 });
        const stateItems = wrapper.state('items');
        expect(stateItems[0].items[0].isChecked).to.equal(true);
        expect(stateItems[0].items[1].isChecked).to.equal(false);
        handler({ item: item2 });
        expect(stateItems[0].items[0].isChecked).to.equal(false);
        expect(stateItems[0].items[1].isChecked).to.equal(true);
      });
    });

    describe('checkbox', () => {
      let item1;
      let item2;
      let group = {
        heading: 'group',
        items: [item1, item2],
      };
      let items = [group];
      let wrapper;
      let handler;

      beforeEach(() => {
        item1 = { content: 'item 1', type: 'checkbox' };
        item2 = { content: 'item 2', type: 'checkbox' };
        group = {
          heading: 'group',
          items: [item1, item2],
        };
        items = [group];
        wrapper = shallow(<Menu items={items} defaultOpen>test</Menu>);
        handler = wrapper.instance().handleItemActivation;
      });

      it('should set `checked` to true when the checkbox item is activated', () => {
        handler({ item: item1 });
        const stateItems = wrapper.state('items');
        expect(stateItems[0].items[0].isChecked).to.equal(true);
      });

      it('should toggle `checked` if the item is activated more then once', () => {
        const stateItems = wrapper.state('items');
        handler({ item: item1 });
        handler({ item: item1 });
        expect(stateItems[0].items[0].isChecked).to.equal(false);
      });

      it('should not affect neighbours', () => {
        const stateItems = wrapper.state('items');
        handler({ item: item1 });
        expect(stateItems[0].items[0].isChecked).to.equal(true);
        expect(stateItems[0].items[1].isChecked).to.equal(undefined);
        handler({ item: item2 });
        expect(stateItems[0].items[0].isChecked).to.equal(true);
        expect(stateItems[0].items[1].isChecked).to.equal(true);
      });
    });
  });
});
