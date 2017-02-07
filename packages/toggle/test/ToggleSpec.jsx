import sinon from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import CloseIcon from 'ak-icon/glyph/cancel';
import ConfirmIcon from 'ak-icon/glyph/confirm';
import styles from '../src/styles.less';

import { Toggle } from '../src';

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

describe('Toggle', () => {
  it('defaults', () => {
    const wrapper = shallow(<Toggle />);
    expect(wrapper.find('label').length).to.equal(1);
    const label = wrapper.find('label');
    expect((label).hasClass((styles.locals.regular))).to.equal(true);
    expect(label.find('input').length).to.equal(1);
    const iconWrapper = label.find('div').at(2);
    expect(iconWrapper).to.have.length.above(0);
    expect(iconWrapper.find(CloseIcon).length).to.equal(1);
  });

  describe('properties', () => {
    it('isChecked=true', () => {
      const wrapper = shallow(<Toggle isChecked />);
      expect(wrapper.find('input').prop('checked')).to.equal(true);
      const iconWrapper = wrapper.find('div').at(2);
      expect(iconWrapper.find(ConfirmIcon).length).to.be.above(0);
      expect(iconWrapper.find(CloseIcon).length).to.equal(0);
    });
    it('isChecked=false', () => {
      const wrapper = shallow(<Toggle />);
      expect(wrapper.find('input').prop('checked')).to.equal(false);
      const iconWrapper = wrapper.find('div').at(2);
      expect(iconWrapper.find(CloseIcon).length).to.be.above(0);
      expect(iconWrapper.find(ConfirmIcon).length).to.equal(0);
    });
    it('isDisabled=true', () => {
      const wrapper = shallow(<Toggle isDisabled />);
      expect(wrapper.find('input').prop('disabled')).to.equal(true);
    });
    it('isDisabled=false', () => {
      const wrapper = shallow(<Toggle />);
      expect(wrapper.find('input').prop('disabled')).to.equal(false);
    });

    it('name', () =>
      expect(shallow(<Toggle name="test" />).find('input').prop('name', 'test')).to.not.equal(undefined)
    );
    it('value', () =>
      expect(shallow(<Toggle value="test" />).find('input').prop('value', 'test')).to.not.equal(undefined)
    );
    it('size', () =>
      expect(shallow(<Toggle size="large" />).find('label').hasClass(styles.locals.large)).to.equal(true)
    );

    it('label', () => {
      expect(shallow(<Toggle isChecked label="test" />).find(ConfirmIcon).prop('label'))
        .to.equal('test');
      expect(shallow(<Toggle label="test" />).find(CloseIcon).prop('label'))
        .to.equal('test');
    });

    describe('input events handlers', () =>
      ['change', 'focus', 'blur'].forEach(eventName =>
        it('onChange', () => {
          const spy = sinon.spy();
          const props = { [`on${capitalize(eventName)}`]: spy };
          const wrapper = shallow(<Toggle {...props} />);
          wrapper.find('input').simulate(eventName);
          expect(spy.called).to.equal(true);
        })
      )
    );
  });
});
