import sinon from 'sinon';
import React from 'react';
import { mount, shallow } from 'enzyme';
import CloseIcon from 'ak-icon/glyph/cancel';
import ConfirmIcon from 'ak-icon/glyph/confirm';

import { ToggleStateless as Toggle } from '../../src';
import { IconWrapper, Input, Label } from '../../src/styled';

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

describe('Toggle', () => {
  it('defaults', () => {
    const wrapper = shallow(<Toggle />);
    const input = wrapper.find(Input);
    const label = wrapper.find(Label);
    const iconWrapper = wrapper.find(IconWrapper);

    expect(input.exists()).to.equal(true);

    expect(label.exists()).to.equal(true);
    expect(label.prop('size')).to.equal('regular');

    expect(iconWrapper.exists()).to.equal(true);
    expect(iconWrapper.find(CloseIcon).exists()).to.equal(true);
  });

  describe('properties', () => {
    it('isChecked=true', () => {
      const wrapper = shallow(<Toggle isChecked />);
      expect(wrapper.find(Input).prop('checked')).to.equal(true);
      expect(wrapper.find(ConfirmIcon).exists()).to.be.equal(true);
      expect(wrapper.find(CloseIcon).exists()).to.equal(false);
    });
    it('isChecked=false', () => {
      const wrapper = shallow(<Toggle />);
      expect(wrapper.find(Input).prop('checked')).to.equal(false);
      expect(wrapper.find(ConfirmIcon).exists()).to.be.equal(false);
      expect(wrapper.find(CloseIcon).exists()).to.equal(true);
    });
    it('isDisabled=true', () => {
      const wrapper = shallow(<Toggle isDisabled />);
      expect(wrapper.find(Input).prop('disabled')).to.equal(true);
    });
    it('isDisabled=false', () => {
      const wrapper = shallow(<Toggle />);
      expect(wrapper.find(Input).prop('disabled')).to.equal(false);
    });

    it('name', () =>
      expect(shallow(<Toggle name="test" />).find(Input).prop('name')).to.equal('test')
    );
    it('value', () =>
      expect(shallow(<Toggle value="test" />).find(Input).prop('value')).to.equal('test')
    );
    it('size', () =>
      expect(shallow(<Toggle size="large" />).find(Label).prop('size')).to.equal('large')
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
          const wrapper = mount(<Toggle {...props} />);
          wrapper.find(Input).simulate(eventName);
          expect(spy.called).to.equal(true);
        })
      )
    );
  });
});
