import chai from 'chai';
import { shallow, mount } from 'enzyme';
import React from 'react';
import ContainerHeader from '../src/components/js/ContainerHeader';

chai.should();
const expect = chai.expect;

describe('<ContainerHeader />', () => {
  describe('props', () => {
    it('icon should render an image', () => {
      expect(shallow(<ContainerHeader icon={<img alt="foo" />} />).find('img')).to.have.length(1);
    });
    it('linkComponent can be used to render an arbitrary link', () => {
      const header = mount(<ContainerHeader
        href="http://google.com"
        linkComponent={({ href, children }) => <a href={href} data-foo="foo">{children}</a>}
      />);
      expect(header.find('[data-foo]').length).to.equal(1);
      expect(header.find('linkComponent').props().href).to.equal('http://google.com');
    });
  });
});
