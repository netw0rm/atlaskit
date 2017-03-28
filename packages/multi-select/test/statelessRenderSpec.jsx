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
    });

    it('should pass on tag.elemBefore prop to selected tags', () => {
      const wrapper = mount(<StatelessMultiSelect items={items} selectedItems={selectedItems} />);
      const tagGroup = wrapper.find(TagGroup);
      expect(tagGroup.find(Tag).length).to.equal(2);
      expect(tagGroup.find(Avatar).length).to.equal(1);
    });

    it('should pass on tag.appearance prop to selected tags', () => {
      const wrapper = mount(<StatelessMultiSelect items={items} selectedItems={selectedItems} />);
      const tagGroup = wrapper.find(TagGroup);
      expect(tagGroup.find(Tag).length).to.equal(2);
      expect(tagGroup.find(Tag).at(0).prop('appearance')).to.equal('rounded');
      expect(tagGroup.find(Tag).at(1).prop('appearance')).to.equal('default');
    });
  });
});
