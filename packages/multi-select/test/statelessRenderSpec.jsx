import React from 'react';
import { shallow, mount } from 'enzyme';
import { Label, FieldBase } from '@atlaskit/field-base';
import Avatar from '@atlaskit/avatar';
import Droplist, { Group, Item } from '@atlaskit/droplist';

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
      const select = shallow(<StatelessMultiSelect />);
      expect(select.isEmpty()).to.equal(false);
      select.unmount();
    });

    it('should render with correct CSS class name', () => {
      const select = shallow(<StatelessMultiSelect />);
      expect(select.find(`.${styles.selectWrapper}`).length).to.equal(1);
      select.unmount();
    });

    it('should not render a label by default', () => {
      const select = mount(<StatelessMultiSelect />);
      expect(select.find(Label).length).to.equal(0);
      select.unmount();
    });

    it('should render Label when the prop is set', () => {
      const select = mount(<StatelessMultiSelect label="test" />);
      expect(select.find(Label).length).to.equal(1);
      select.unmount();
    });

    it('should render Droplist', () => {
      const select = mount(<StatelessMultiSelect />);
      expect(select.find(Droplist).length).to.equal(1);
      select.unmount();
    });

    it('should render Fieldbase inside Droplist', () => {
      const select = mount(<StatelessMultiSelect />);
      expect(select.find(FieldBase).length).to.equal(1);
      expect(select.find(Droplist).find(FieldBase).length).to.equal(1);
      select.unmount();
    });

    it('should render Trigger inside Fieldbase', () => {
      const select = mount(<StatelessMultiSelect />);
      expect(select.find(Trigger).length).to.equal(1);
      expect(select.find(FieldBase).find(Trigger).length).to.equal(1);
      select.unmount();
    });

    describe('groups and items', () => {
      const items = [
        {
          heading: 'test',
          items: [
            { value: 1, content: '1' },
            { value: 2, content: '2' },
          ],
        },
      ];
      it('should render groups and items inside Droplist (when open)', () => {
        const select = mount(<StatelessMultiSelect items={items} isOpen />);
        expect(select.find(Group).length).to.equal(1);
        expect(select.find(Item).length).to.equal(2);
        expect(select.find(Group).find(Item).length).to.equal(2);
        select.unmount();
      });

      it('should not render a group if all items in that group are selected', () => {
        const selectedItems = [items[0].items[0], items[0].items[1]];
        const select = mount(<StatelessMultiSelect
          items={items}
          selectedItems={selectedItems}
          isOpen
        />);
        expect(select.find(Group).length).to.equal(0);
        select.unmount();
      });
    });

    it('should render elemBefore inside Droplist (when open)', () => {
      const items = [
        {
          heading: 'test',
          items: [
            { value: 1, content: '1', elemBefore: <Avatar size="small" /> },
            { value: 2, content: '2', elemBefore: <Avatar size="small" /> },
          ],
        },
      ];
      const select = mount(<StatelessMultiSelect items={items} isOpen />);
      expect(select.find(Avatar).length).to.equal(2);
      select.unmount();
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
      const select = mount(<StatelessMultiSelect
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
      select.unmount();
    });
  });
});
