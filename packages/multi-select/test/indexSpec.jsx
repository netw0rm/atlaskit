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

describe(name, () => {
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
      const select = mount(<StatelessMultiSelect items={selectItems} isOpen onSelected={spy} />);
      select.find(Item).first().props().onActivate();
      expect(spy.callCount).to.equal(1);
    });

    it('should call onRemoved when an item is removed', () => {
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
      const select = mount(<StatelessMultiSelect
        items={selectItems}
        isOpen onRemoved={spy}
        selectedItems={[selectItems[0].items[0]]}
      />);
      select.find(Tag).first().props().onAfterRemoveAction();
      expect(spy.callCount).to.equal(1);
    });
  });
});
