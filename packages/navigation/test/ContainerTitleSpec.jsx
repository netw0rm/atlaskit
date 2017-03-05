import { shallow, mount } from 'enzyme';
import React from 'react';
import ContainerTitle from '../src/components/js/ContainerTitle';

describe('<ContainerTitle />', () => {
  describe('props', () => {
    it('icon should render an image', () => {
      expect(shallow(<ContainerTitle icon={<img alt="foo" />} />).find('img')).to.have.length(1);
    });
    it('linkComponent can be used to render an arbitrary link', () => {
      const header = mount(<ContainerTitle
        href="http://google.com"
        linkComponent={({ href, children }) => <a href={href} data-foo="foo">{children}</a>}
      />);
      expect(header.find('[data-foo]').length).to.equal(1);
      expect(header.find('linkComponent').props().href).to.equal('http://google.com');
    });
  });
});
