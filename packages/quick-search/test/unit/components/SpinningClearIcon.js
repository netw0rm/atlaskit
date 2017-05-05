import React from 'react';
import { shallow } from 'enzyme';
import AkSpinner from '@atlaskit/spinner';
import { CrossIcon } from '@atlaskit/icon';

import SpinningClearIcon from '../../../src/components/SpinningClearIcon';

describe('<SpinningClearIcon />', () => {
  it('should show CrossIcon when not spinning', (done) => {
    const wrapper = shallow(<SpinningClearIcon shouldSpin={false} delay={0} />);
    setImmediate(() => {
      expect(wrapper.find(AkSpinner)).to.have.length(0);
      expect(wrapper.find(CrossIcon)).to.have.length(1);
      done();
    });
  });

  it('should spin after delay', (done) => {
    const wrapper = shallow(<SpinningClearIcon shouldSpin delay={50} />);
    setTimeout(() => {
      expect(wrapper.find(AkSpinner)).to.have.length(1);
      expect(wrapper.find(CrossIcon)).to.have.length(0);
      done();
    }, 60);
  });

  it('should show CrossIcon onMouseEnter, irrespective of shouldSpin', (done) => {
    const wrapper = shallow(<SpinningClearIcon shouldSpin delay={0} />);
    wrapper.simulate('mouseenter');
    setImmediate(() => {
      expect(wrapper.find(AkSpinner)).to.have.length(0);
      expect(wrapper.find(CrossIcon)).to.have.length(1);
      done();
    });
  });

  it('should spin onMouseLeave if shouldSpin', (done) => {
    const wrapper = shallow(<SpinningClearIcon shouldSpin delay={0} />);
    wrapper.simulate('mouseenter');
    expect(wrapper.find(CrossIcon)).to.have.length(1);
    wrapper.simulate('mouseleave');
    setImmediate(() => {
      expect(wrapper.find(AkSpinner)).to.have.length(1);
      expect(wrapper.find(CrossIcon)).to.have.length(0);
      done();
    });
  });
});
