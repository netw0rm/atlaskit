import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import React from 'react';
import { shallow, mount } from 'enzyme';
import styles from '../src/styles.less';

import Spinner from '../src';

const { expect } = chai;
chai.use(chaiEnzyme());
chai.use(sinonChai);

const {
  spinner: spinnerClass,
  active: activeClass,
} = styles.locals;

describe('ak-spinner', () => {
  it('should be possible to create a component', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper).not.to.equal(undefined);
  });

  it('should render a spinner element', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.find(`.${spinnerClass}`)).not.to.equal(undefined);
  });

  it('should apply active class by default', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.find(`.${activeClass}`)).not.to.equal(undefined);
  });

  describe('isCompleting prop', () => {
    it('should remove the .active class when set to true', () => {
      const wrapper = shallow(<Spinner isCompleting />);
      expect(wrapper.find(`.${activeClass}`)).to.equal(undefined);
    });
  });

  describe('onComplete prop', () => {
    it('should be called after isCompleting is set', () => {
      /* Unfortunately this is not testable properly in jsdom as no transitionEnd event will ever
         get fired. The best we can do manually fire the event and check that function gets called
      */
      const spy = sinon.spy();
      const wrapper = mount(<Spinner onComplete={spy} isCompleting />);
      wrapper.find(`.${spinnerClass}`)
        .simulate('transitionEnd', { propertyName: 'stroke-dashoffset' });

      expect(spy.callCount).to.equal(1);
    });

    it('should not be called if isCompleting is not set', () => {
      const spy = sinon.spy();
      const wrapper = mount(<Spinner onComplete={spy} />);
      wrapper.find(`.${spinnerClass}`)
        .simulate('transitionEnd', { propertyName: 'stroke-dashoffset' });

      expect(spy).to.not.have.been.calledOnce;
    });
  });
});
