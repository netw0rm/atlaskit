import React from 'react';
import { shallow, mount } from 'enzyme';
import { Label, FieldBase } from '@atlaskit/field-base';
import Avatar from '@atlaskit/avatar';
import Droplist, { Group, Item } from '@atlaskit/droplist';
import Tag from '@atlaskit/tag';
import TagGroup from '@atlaskit/tag-group';

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
      const wrapper = mount(<StatelessMultiSelect />);
      expect(wrapper.find(`.${styles.selectWrapper}`).length).to.equal(1);
      wrapper.unmount();
    });

    it('should render Label when the prop is set', () => {
      const wrapper = mount(<StatelessMultiSelect />);
      const wrapperLabel = mount(<StatelessMultiSelect label="test" />);
      expect(wrapper.find(Label).length).to.equal(0);
      expect(wrapperLabel.find(Label).length).to.equal(1);
      wrapper.unmount();
      wrapperLabel.unmount();
    });

    it('should render Droplist', () => {
      const wrapper = mount(<StatelessMultiSelect />);
      expect(wrapper.find(Droplist).length).to.equal(1);
      wrapper.unmount();
    });

    it('should render Fieldbase inside Droplist', () => {
      const wrapper = mount(<StatelessMultiSelect />);
      expect(wrapper.find(FieldBase).length).to.equal(1);
      expect(wrapper.find(Droplist).find(FieldBase).length).to.equal(1);
      wrapper.unmount();
    });

    it('should render Trigger inside Fieldbase', () => {
      const wrapper = mount(<StatelessMultiSelect />);
      expect(wrapper.find(Trigger).length).to.equal(1);
      expect(wrapper.find(FieldBase).find(Trigger).length).to.equal(1);
      wrapper.unmount();
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

  describe('selectedTags', () => {
    const items = [
      {
        heading: 'test',
        items: [
          { value: 1, content: '1', tag: { elemBefore: <Avatar size="small" />, appearance: 'rounded' } },
          { value: 2, content: '2' },
          { value: 3, content: '3', tag: { elemBefore: <Avatar size="small" /> } },
        ],
      },
    ];
    const selectedItems = [items[0].items[0], items[0].items[1]];

    it('should render selectedTags', () => {
      const wrapper = mount(<StatelessMultiSelect items={items} selectedItems={selectedItems} />);
      const tagGroup = wrapper.find(TagGroup);
      expect(tagGroup.find(Tag).length).to.equal(2);
      wrapper.unmount();
    });

    it('should pass on tag.elemBefore prop to selected tags', () => {
      const wrapper = mount(<StatelessMultiSelect items={items} selectedItems={selectedItems} />);
      const tagGroup = wrapper.find(TagGroup);
      expect(tagGroup.find(Tag).length).to.equal(2);
      expect(tagGroup.find(Avatar).length).to.equal(1);
      wrapper.unmount();
    });

    it('should pass on tag.appearance prop to selected tags', () => {
      const wrapper = mount(<StatelessMultiSelect items={items} selectedItems={selectedItems} />);
      const tagGroup = wrapper.find(TagGroup);
      expect(tagGroup.find(Tag).length).to.equal(2);
      expect(tagGroup.find(Tag).at(0).prop('appearance')).to.equal('rounded');
      expect(tagGroup.find(Tag).at(1).prop('appearance')).to.equal('default');
      wrapper.unmount();
    });
  });
});
