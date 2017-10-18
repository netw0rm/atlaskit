import React from 'react';
import { shallow, mount } from 'enzyme';
import IconLabel from '../../src/components/IconLabel';
import {
  DetailsLabelIcon,
  DetailsLabelText,
} from '../../src/styled/Card';

describe('Profilecard', () => {
  describe('IconLabel', () => {
    it('should render no label when not children are present', () => {
      const wrapper = shallow(<IconLabel />);
      expect(wrapper.text()).toBe('');
    });

    it('should render LabelIcon without icon when icon property is not set', () => {
      const wrapper = mount(<IconLabel>Labeltext</IconLabel>);
      expect(wrapper.length).toBeGreaterThan(0);
      expect(wrapper.find(DetailsLabelText).text()).toBe('Labeltext');

      const icon = wrapper.find(DetailsLabelIcon);
      expect(icon.children().length).toBe(0);
    });

    it('should render LabelIcon without icon when icon property is an unavailable icon', () => {
      const wrapper = mount(<IconLabel icon="foobar">Labeltext</IconLabel>);
      expect(wrapper.length).toBeGreaterThan(0);
      expect(wrapper.find(DetailsLabelText).text()).toBe('Labeltext');

      const icon = wrapper.find(DetailsLabelIcon);
      expect(icon.children().length).toBe(0);
    });

    it('should render LabelIcon with valid icons', () => {
      const validIcons = [
        'location',
        'time',
        'mention',
        'email',
        'available',
        'unavailable',
        'busy',
      ];

      validIcons.forEach((presence) => {
        it(`should render label with content ${presence}`, () => {
          const wrapper = mount(<IconLabel icon="time">Labeltext</IconLabel>);
          expect(wrapper.length).toBeGreaterThan(0);
          expect(wrapper.find(DetailsLabelText).text()).toBe('Labeltext');

          const icon = wrapper.find(DetailsLabelIcon);
          expect(icon.children().length).toBe(1);
        });
      });
    });
  });
});
