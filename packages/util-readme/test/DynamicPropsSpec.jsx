import { mount } from 'enzyme';
import React from 'react';
import chai from 'chai';

import DynamicProps from '../src/DynamicProps';

const expect = chai.expect;

describe('DynamicProps', () => {
  it('renders a placeholder when there are no proptypes', () => {
    const componentSrc = `
export default class Foo extends React.PureComponent {
  render() {
    return '';
  }
}`;
    expect(mount(<DynamicProps componentSrc={componentSrc} />).text()).to.contain('There are no props for this component');
  });

  it('does not render the placeholder when there are proptypes', () => {
    const componentSrc = `
export default class Foo extends React.PureComponent {
  static propTypes = {
    foo: PropTypes.string,
  }
  render() {
    return '';
  }
}`;
    const wrapper = mount(<DynamicProps componentSrc={componentSrc} />);
    expect(wrapper.text()).to.not.contain('There are no props for this component');
    expect(wrapper.find('table')).to.have.length(1);
  });
});
