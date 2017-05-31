import React from 'react';
import { shallow, mount } from 'enzyme';
import { Label, FieldBase } from '@atlaskit/field-base';
import Avatar from '@atlaskit/avatar';
import Droplist, { Group, Item } from '@atlaskit/droplist';
import Tag from '@atlaskit/tag';
import TagGroup from '@atlaskit/tag-group';
import NothingWasFound from '../../src/internal/NothingWasFound';

import styles from '../../src/styles.less';
import { StatelessMultiSelect } from '../../src';
import Trigger from '../../src/internal/Trigger';
import Footer from '../../src/internal/Footer';

import { name } from '../../package.json';

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

    it('should render Footer if shouldAllowCreateItem is true and the search value is not empty', () => {
      expect(mount(<StatelessMultiSelect filterValue="test" isOpen shouldAllowCreateItem />).find(Footer).length).to.equal(1);
    });

    it('should NOT render Footer if shouldAllowCreateItem is false', () => {
      expect(mount(<StatelessMultiSelect filterValue="test" isOpen />).find(Footer).length).to.equal(0);
    });

    it('should render search text and label in the footer when shouldAllowCreateItem is true', () => {
      const wrapper = mount(<StatelessMultiSelect createNewItemLabel="new" filterValue="test" isOpen shouldAllowCreateItem />);
      expect(wrapper.find(Footer).text()).to.equal('test (new)');
    });

    describe('groups and items', () => {
      const items = [
        {
          heading: 'test',
          items: [
            { value: 1, content: '1', description: 'item1' },
            { value: 2, content: '2', description: 'item2' },
          ],
        },
      ];

      const itemsIn3Groups = [
        {
          heading: 'group 1',
          items: [
            { value: 1, content: '1' },
            { value: 2, content: '2' },
          ],
        },
        {
          heading: 'group 2',
          items: [
            { value: 3, content: '3' },
            { value: 4, content: '4' },
          ],
        },
        {
          heading: 'group 3',
          items: [
            { value: 5, content: '5' },
            { value: 6, content: '6' },
          ],
        },
      ];

      it('should render groups and items inside Droplist (when open)', () => {
        const select = mount(<StatelessMultiSelect items={items} isOpen />);
        expect(select.find(Group).length).to.equal(1);
        expect(select.find(Item).length).to.equal(2);
        expect(select.find(Group).find(Item).length).to.equal(2);
      });

      it('should not render a group if all items in that group are selected', () => {
        const selectedItems = [items[0].items[0], items[0].items[1]];
        const select = mount(<StatelessMultiSelect
          items={items}
          selectedItems={selectedItems}
          isOpen
        />);
        expect(select.find(Group).length).to.equal(0);
      });

      it('should render 3 groups with all non-selected items', () => {
        const selectedItems = [itemsIn3Groups[0].items[0], itemsIn3Groups[1].items[1]];
        const select = mount(<StatelessMultiSelect
          items={itemsIn3Groups}
          selectedItems={selectedItems}
          isOpen
        />);

        expect(select.find(Group).length).to.equal(3);
        expect(select.find(Group).at(0).find(Item).length).to.equal(1);
        expect(select.find(Group).at(1).find(Item).length).to.equal(1);
        expect(select.find(Group).at(2).find(Item).length).to.equal(2);
      });

      it('should not render a group if all items in the group are selected', () => {
        const selectedItems = [itemsIn3Groups[1].items[0], itemsIn3Groups[1].items[1]];
        const select = mount(<StatelessMultiSelect
          items={itemsIn3Groups}
          selectedItems={selectedItems}
          isOpen
        />);

        expect(select.find(Group).length).to.equal(2);
        expect(select.find(Group).at(0).find(Item).length).to.equal(2);
        expect(select.find(Group).at(0).props().heading).to.equal('group 1');
        expect(select.find(Group).at(1).find(Item).length).to.equal(2);
        expect(select.find(Group).at(1).props().heading).to.equal('group 3');
      });

      it('should render a no matches found if there is no item at all', () => {
        const select = mount(<StatelessMultiSelect
          items={[]}
          selectedItems={[]}
          isOpen
        />);

        expect(select.find(NothingWasFound).length).to.equal(1);
      });

      it('should render a no matches found if all items are selected', () => {
        const selectedItems =
          itemsIn3Groups
          .map(group => group.items)
          .reduceRight((prev, curr) => prev.concat(curr));

        const select = mount(<StatelessMultiSelect
          items={itemsIn3Groups}
          selectedItems={selectedItems}
          isOpen
        />);

        expect(select.find(NothingWasFound).length).to.equal(1);
      });

      it('should not render a no matches found message if at least an item is available in dropdown', () => {
        const selectedItems = [
          itemsIn3Groups[0].items[0],
          itemsIn3Groups[0].items[1],
          itemsIn3Groups[1].items[0],
          itemsIn3Groups[1].items[1],
          itemsIn3Groups[2].items[0],
        ];

        const select = mount(<StatelessMultiSelect
          items={itemsIn3Groups}
          selectedItems={selectedItems}
          isOpen
        />);

        expect(select.find(NothingWasFound).length).to.equal(0);
      });

      it('should filter selected items by their values not reference', () => {
        const select = mount(<StatelessMultiSelect
          items={items}
          selectedItems={[{ value: 2 }]}
          isOpen
        />);

        expect(select.find(Group).length).to.equal(1);
        expect(select.find(Group).find(Item).length).to.equal(1);
        expect(select.find(Group).find(Item).props().description).to.equal('item1');
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
