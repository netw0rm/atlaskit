import React from 'react';
import { shallow } from 'enzyme';
import styles from '../src/styles/profilecard.less';

import IconLabel from '../src/components/IconLabel';

describe('Profilecard', () => {
  describe('IconLabel', () => {
    it('should render no label when not children are present', () => {
      const wrapper = shallow(<IconLabel />);
      expect(wrapper.text()).to.equal('');
    });

    it('should render LabelIcon without icon when icon property is not set', () => {
      const wrapper = shallow(<IconLabel>Labeltext</IconLabel>);
      expect(wrapper.length).to.be.above(0);
      expect(wrapper.find('span').text()).to.equal('Labeltext');

      const icon = wrapper.find(`.${styles.locals.detailsLabelIcon}`);
      expect(icon.text()).to.equal('');
    });

    it('should render LabelIcon without icon when icon property is an available icon', () => {
      const wrapper = shallow(<IconLabel icon="foobar">Labeltext</IconLabel>);
      expect(wrapper.length).to.be.above(0);
      expect(wrapper.find('span').text()).to.equal('Labeltext');

      const icon = wrapper.find(`.${styles.locals['pf-icon']}`);
      expect(icon.length).to.equal(0);
    });

    it('should render LabelIcon with icon', () => {
      const wrapper = shallow(<IconLabel icon="time">Labeltext</IconLabel>);
      expect(wrapper.length).to.be.above(0);
      expect(wrapper.find('span').text()).to.equal('Labeltext');

      const icon = wrapper.find(`.${styles.locals.detailsLabelIcon}`);
      expect(icon.length).to.be.above(0);
    });
  });
});
