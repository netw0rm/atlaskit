import sinon from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { shallow } from 'enzyme';
import CloseIcon from 'ak-icon/glyph/cancel';
import ConfirmIcon from 'ak-icon/glyph/confirm';
import styles from '../src/styles.less';

import { Toggle } from '../src';

chai.use(chaiEnzyme());
chai.use(sinonChai);

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

describe('ak-toggle', () => {
  it('defaults', () => {
    const wrapper = shallow(<Toggle />);
    expect(wrapper).to.have.exactly(1).descendants('label');
    const label = wrapper.find('label');
    expect(label).to.have.exactly(1).descendants('input');
    const iconWrapper = label.find(`.${styles.locals.iconWrapper}`);
    expect(iconWrapper).to.exist;
    expect(iconWrapper)
      .to.have.exactly(1).descendants(CloseIcon);
  });

  describe('properties', () => {
    it('isChecked=true', () => {
      const wrapper = shallow(<Toggle isChecked />);
      expect(wrapper.find('input')).to.have.prop('checked', true);
      expect(wrapper.find(`.${styles.locals.iconWrapper}`)).to.have.descendants(ConfirmIcon);
    });
    it('isChecked=false', () => {
      const wrapper = shallow(<Toggle />);
      expect(wrapper.find('input')).to.have.prop('checked', false);
      expect(wrapper.find(`.${styles.locals.iconWrapper}`)).to.have.descendants(CloseIcon);
    });
    it('isDisabled=true', () => {
      const wrapper = shallow(<Toggle isDisabled />);
      expect(wrapper.find('input')).to.have.prop('disabled', true);
      expect(wrapper.find('label')).to.have.className(styles.locals.disabled);
    });
    it('isDisabled=false', () => {
      const wrapper = shallow(<Toggle />);
      expect(wrapper.find('input')).to.have.prop('disabled', false);
      expect(wrapper.find('label')).to.not.have.className(styles.locals.disabled);
    });

    it('name', () =>
      expect(shallow(<Toggle name="test" />).find('input')).to.have.prop('name', 'test')
    );
    it('value', () =>
      expect(shallow(<Toggle value="test" />).find('input')).to.have.prop('value', 'test')
    );

    it('labelWhenChecked', () => {
      const wrapper = shallow(<Toggle isChecked labelWhenChecked="test" />);
      expect(wrapper.find(ConfirmIcon)).to.have.prop('label', 'test');
    });

    it('labelWhenUnchecked', () => {
      const wrapper = shallow(<Toggle labelWhenUnchecked="test" />);
      expect(wrapper.find(CloseIcon)).to.have.prop('label', 'test');
    });

    describe('input events handlers', () =>
      ['change', 'focus', 'blur'].forEach(eventName =>
        it('onChange', () => {
          const spy = sinon.spy();
          const props = { [`on${capitalize(eventName)}`]: spy };
          const wrapper = shallow(<Toggle {...props} />);
          wrapper.find('input').simulate(eventName);
          expect(spy).to.have.been.called;
        })
      )
    );
  });
});
