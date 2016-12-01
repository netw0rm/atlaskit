import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { shallow } from 'enzyme';
import styles from '../src/styles/profilecard.less';

import IconLabel from '../src/components/IconLabel';

const { expect } = chai;
chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('pf-profilecard', () => {
  describe('IconLabel', () => {
    it('should render no label when not children are present', () => {
      const wrapper = shallow(<IconLabel />);
      expect(wrapper).to.not.be.defined;
    });

    it('should render LabelIcon without icon when icon property is not set', () => {
      const wrapper = shallow(<IconLabel>Labeltext</IconLabel>);
      expect(wrapper).to.be.defined;
      expect(wrapper.find('span')).to.have.text('Labeltext');

      const icon = wrapper.find(`.${styles.locals.detailsLabelIcon}`);
      expect(icon).to.be.blank();
    });

    it('should render LabelIcon without icon when icon property is an available icon', () => {
      const wrapper = shallow(<IconLabel icon="foobar">Labeltext</IconLabel>);
      expect(wrapper).to.be.defined;
      expect(wrapper.find('span')).to.have.text('Labeltext');

      const icon = wrapper.find(`.${styles.locals['pf-icon']}`);
      expect(icon).to.be.blank();
    });

    it('should render LabelIcon with icon', () => {
      const wrapper = shallow(<IconLabel icon="time">Labeltext</IconLabel>);
      expect(wrapper).to.be.defined;
      expect(wrapper.find('span')).to.have.text('Labeltext');

      const icon = wrapper.find(`.${styles.locals.detailsLabelIcon}`);
      expect(icon).to.not.be.blank();
    });
  });
});
