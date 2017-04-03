import sinon from 'sinon';

import React from 'react';
import { shallow, mount } from 'enzyme';
import styles from '../src/styles.less';

import Spinner from '../src';

const {
  spinner: spinnerClass,
  active: activeClass,
} = styles.locals;

describe('Spinner', () => {
  it('should be possible to create a component', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper).not.to.equal(undefined);
  });

  it('should render a spinner element', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.find(`.${spinnerClass}`)).to.have.length.above(0);
  });

  it('should apply active class by default', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.find(`.${activeClass}`)).to.have.length.above(0);
  });

  describe('isCompleting prop', () => {
    it('should remove the .active class when set to true', () => {
      const wrapper = shallow(<Spinner isCompleting />);
      expect(wrapper.find(`.${activeClass}`).length).to.equal(0);
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

      expect(spy.callCount).to.not.equal(1);
    });
  });

  describe('size prop', () => {
    it('should render the tee-shirt sizes with the proper widths', () => {
      const small = mount(<Spinner size="small" />);
      const medium = mount(<Spinner size="medium" />);
      const large = mount(<Spinner size="large" />);
      const xlarge = mount(<Spinner size="xlarge" />);

      expect(small.find(`.${spinnerClass}`).prop('style').height).to.equal('20px');
      expect(small.find(`.${spinnerClass}`).prop('style').width).to.equal('20px');

      expect(medium.find(`.${spinnerClass}`).prop('style').height).to.equal('30px');
      expect(medium.find(`.${spinnerClass}`).prop('style').width).to.equal('30px');

      expect(large.find(`.${spinnerClass}`).prop('style').height).to.equal('50px');
      expect(large.find(`.${spinnerClass}`).prop('style').height).to.equal('50px');

      expect(xlarge.find(`.${spinnerClass}`).prop('style').width).to.equal('100px');
      expect(xlarge.find(`.${spinnerClass}`).prop('style').width).to.equal('100px');
    });

    it('should render the spinner with a custom size', () => {
      const custom = mount(<Spinner size={72} />);

      expect(custom.find(`.${spinnerClass}`).prop('style').height).to.equal('72px');
      expect(custom.find(`.${spinnerClass}`).prop('style').width).to.equal('72px');
    });

    it('should render the spinner with the default size if an unsupported value is provided', () => {
      const custom = mount(<Spinner size={{ something: 'weird' }} />);

      expect(custom.find(`.${spinnerClass}`).prop('style').height).to.equal('20px');
      expect(custom.find(`.${spinnerClass}`).prop('style').width).to.equal('20px');
    });
  });
});
