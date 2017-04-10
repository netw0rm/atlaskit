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

    afterEach(() => {
      wrapper.unmount();
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
});
