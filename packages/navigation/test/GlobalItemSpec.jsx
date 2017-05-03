import { shallow, mount } from 'enzyme';
import React from 'react';
import GlobalItem from '../src/components/js/GlobalItem';

describe('<GlobalItem />', () => {
  describe('props', () => {
    it('default size prop is small', () => {
      expect((shallow(<GlobalItem />).find('GlobalItemInner').props().size)).to.equal('small');
    });
    it('small size prop renders small global item', () => {
      expect((shallow(<GlobalItem size="small" />).find('GlobalItemInner').props().size)).to.equal('small');
    });
    it('medium size prop renders medium global item', () => {
      expect((shallow(<GlobalItem size="medium" />).find('GlobalItemInner').props().size)).to.equal('medium');
    });
    it('large size prop renders large global item', () => {
      expect((shallow(<GlobalItem size="large" />).find('GlobalItemInner').props().size)).to.equal('large');
    });
    it('linkComponent can be used to render an arbitrary link', () => {
      const item = mount(<GlobalItem
        href="http://google.com"
        linkComponent={({ href, children }) => <a href={href} data-foo="foo">{children}</a>}
      />);
      expect(item.find('[data-foo]').length).to.equal(1);
      expect(item.find('linkComponent').props().href).to.equal('http://google.com');
    });
  });
});
