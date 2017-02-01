import React from 'react';
import { shallow, mount } from 'enzyme';
import { Label, FieldBase } from '@atlaskit/field-base';
import Droplist from '@atlaskit/droplist';
import Group from '@atlaskit/droplist-group';
import Item from '@atlaskit/droplist-item';
import ExpandIcon from '@atlaskit/icon/glyph/expand';

import styles from 'style!../src/styles.less';
import { StatelessSelect } from '../src';
import Trigger from '../src/internal/Trigger';

import { name } from '../package.json';

describe(name, () => {
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

    it('should render Trigger inside Fieldbase', () => {
      expect(mount(<StatelessSelect />).find(Trigger).length).to.equal(1);
      expect(mount(<StatelessSelect />).find(FieldBase).find(Trigger).length).to.equal(1);
    });

    it('should render placeholder in trigger if there is no selected item', () => {
      expect(mount(<StatelessSelect placeholder="test" />).text()).to.equal('test');
    });

    it('should render selected items`s content instead of placeholder', () => {
      const select = mount(<StatelessSelect placeholder="test" selectedItem={{ content: 'selected' }} />);
      expect(select.text()).to.not.equal('test');
      expect(select.text()).to.equal('selected');
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

    it('should set isActive property to the selected item', () => {
      const selectItems = [
        {
          heading: 'test',
          items: [
            { value: 1, content: '1' },
            { value: 2, content: '2' },
          ],
        },
      ];
      const select = mount(<StatelessSelect items={selectItems} selectedItem={{ value: 1, content: '1' }} isOpen />);
      expect(select.find(Item).first().props().isActive).to.equal(true);
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
      expect(droplistProps.position).to.equal('top right');
      expect(droplistProps.isOpen).to.equal(true);
      expect(droplistProps.onOpenChange).to.equal(func);
      expect(droplistProps.isTriggerNotTabbable).to.equal(true);
      expect(droplistProps.shouldFitContainer).to.equal(true);
    });

    it('should pass props to fieldBase', () => {
      const select = mount(<StatelessSelect isDisabled isInvalid isOpen />);
      const fieldbaseProps = select.find(FieldBase).props();
      expect(fieldbaseProps.isDisabled).to.equal(true);
      expect(fieldbaseProps.isInvalid).to.equal(true);
      expect(fieldbaseProps.onFocus).to.equal(select.instance().onFocus);
      expect(fieldbaseProps.isPaddingDisabled).to.equal(true);
      expect(fieldbaseProps.isFitContainerWidthEnabled).to.equal(true);
    });
  });

  describe('callbacks', () => {
    it('should call onSelected when an item is activated', () => {
      const selectItems = [
        {
          heading: 'test',
          items: [
            { value: 1, content: '1' },
            { value: 2, content: '2' },
          ],
        },
      ];
      const spy = sinon.spy();
      const select = mount(<StatelessSelect items={selectItems} isOpen onSelected={spy} />);
      select.find(Item).first().props().onActivate();
      expect(spy.callCount).to.equal(1);
    });
  });

  describe('trigger', () => {
    it('should have correct classNames', () => {
      expect(mount(<Trigger />).find(`.${styles.trigger}`).length).to.equal(1);
      expect(mount(<Trigger />).find(`.${styles.isOpen}`).length).to.equal(0);
      expect(mount(<Trigger isOpen />).find(`.${styles.trigger}`).length).to.equal(1);
      expect(mount(<Trigger isOpen />).find(`.${styles.isOpen}`).length).to.equal(1);
    });

    it('should render content', () => {
      expect(mount(<Trigger>test</Trigger>).find(`.${styles.content}`).text()).to.equal('test');
    });

    it('should render icon', () => {
      expect(mount(<Trigger />).find(`.${styles.expand}`).contains(<ExpandIcon label="" />)).to.equal(true);
    });
  });
});
