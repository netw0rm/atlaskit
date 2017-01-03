import sinon from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { shallow } from 'enzyme';
import CloseIcon from 'ak-icon/glyph/cancel';
import ConfirmIcon from 'ak-icon/glyph/confirm';

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
    const iconWrapper = label.find('div').at(2);
    expect(iconWrapper).to.exist;
    expect(iconWrapper)
      .to.have.exactly(1).descendants(CloseIcon);
  });

  describe('properties', () => {
    it('isChecked=true', () => {
      const wrapper = shallow(<Toggle isChecked />);
      expect(wrapper.find('input')).to.have.prop('checked', true);
      const iconWrapper = wrapper.find('div').at(2);
      expect(iconWrapper).to.have.descendants(ConfirmIcon);
      expect(iconWrapper).to.not.have.descendants(CloseIcon);
    });
    it('isChecked=false', () => {
      const wrapper = shallow(<Toggle />);
      expect(wrapper.find('input')).to.have.prop('checked', false);
      const iconWrapper = wrapper.find('div').at(2);
      expect(iconWrapper).to.have.descendants(CloseIcon);
      expect(iconWrapper).to.not.have.descendants(ConfirmIcon);
    });
    it('isDisabled=true', () => {
      const wrapper = shallow(<Toggle isDisabled />);
      expect(wrapper.find('input')).to.have.prop('disabled', true);
    });
    it('isDisabled=false', () => {
      const wrapper = shallow(<Toggle />);
      expect(wrapper.find('input')).to.have.prop('disabled', false);
    });

    it('name', () =>
      expect(shallow(<Toggle name="test" />).find('input')).to.have.prop('name', 'test')
    );
    it('value', () =>
      expect(shallow(<Toggle value="test" />).find('input')).to.have.prop('value', 'test')
    );

    it('label', () => {
      expect(shallow(<Toggle isChecked label="test" />).find(ConfirmIcon))
        .to.have.prop('label', 'test');
      expect(shallow(<Toggle label="test" />).find(CloseIcon))
        .to.have.prop('label', 'test');
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
