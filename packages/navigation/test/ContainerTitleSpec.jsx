import { shallow, mount } from 'enzyme';
import React from 'react';
import ContainerTitle from '../src/components/js/ContainerTitle';

describe('<ContainerTitle />', () => {
  describe('props', () => {
    it('icon should render an image', () => {
      expect(shallow(<ContainerTitle icon={<img alt="foo" />} />).find('img')).to.have.length(1);
    });

    it('linkComponent can be used to render an arbitrary link', () => {
      const wrapper = mount(<ContainerTitle
        href="http://google.com"
        linkComponent={({ href, children }) => <a href={href} data-foo="foo">{children}</a>}
      />);
      expect(wrapper.find('[data-foo]').length).to.equal(1);
      expect(wrapper.find('linkComponent').props().href).to.equal('http://google.com');
      wrapper.unmount();
    });

    it('should render its title', () => {
      const wrapper = mount(
        <ContainerTitle text="Main text" />
      );

      expect(wrapper.text()).to.equal('Main text');
      wrapper.unmount();
    });

    it('should render subText if it is provided', () => {
      const wrapper = mount(
        <ContainerTitle text="Main text" subText="sub text" />
      );

      expect(wrapper.text()).to.equal('Main textsub text');
      wrapper.unmount();
    });
  });
});
