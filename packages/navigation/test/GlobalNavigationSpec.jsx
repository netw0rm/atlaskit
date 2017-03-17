import { shallow, mount } from 'enzyme';
import React from 'react';
import GlobalNavigation from '../src/components/js/GlobalNavigation';

describe('<GlobalNavigation />', () => {
  describe('renders', () => {
    it('should render a <Spacer />', () => {
      expect(mount(<GlobalNavigation />).find('Spacer')).to.have.length(1);
    });
    it('should render <PrimaryActions />', () => {
      expect(mount(<GlobalNavigation />).find('PrimaryActions')).to.have.length(1);
    });
    it('should render <SecondaryActions />', () => {
      expect(mount(<GlobalNavigation />).find('SecondaryActions')).to.have.length(1);
    });
  });
  describe('props', () => {
    it('primaryIcon prop is passed to <PrimaryActions />', () => {
      const icon = <img alt="foo" />;
      expect(shallow(<GlobalNavigation primaryIcon={icon} />)
        .find('PrimaryActions').props().primaryIcon).to.equal(icon);
    });
    it('primaryItemHref prop is passed to <PrimaryActions />', () => {
      const icon = <img alt="foo" />;
      expect(shallow(<GlobalNavigation primaryIcon={icon} primaryItemHref="http://google.com" />)
        .find('PrimaryActions').props().primaryItemHref).to.equal('http://google.com');
    });
    it('primaryIcon=null means no <GlobalItem /> is rendered', () => {
      expect(shallow(<GlobalNavigation />)
        .find('GlobalItem').length).to.equal(0);
    });
    it('linkComponent is passed on to the primary <PrimaryActions/>', () => {
      const linkComponent = () => null;
      expect(shallow(<GlobalNavigation primaryIcon="foo" linkComponent={linkComponent} />)
        .find('PrimaryActions').props().linkComponent).to.equal(linkComponent);
    });
    it('helpItem should render in the global navigation', () => {
      const helpItem = () => <span className="HELP_ITEM" />;
      expect(mount(
        <GlobalNavigation
          helpItem={helpItem}
        />).contains(helpItem({ appearance: 'global' }))).to.equal(true);
    });
    it('accountItem should render in the global navigation', () => {
      const accountItem = () => <span className="ACCOUNT_ITEM" />;
      expect(mount(
        <GlobalNavigation
          accountItem={accountItem}
        />).contains(accountItem({ appearance: 'global' }))).to.equal(true);
    });
  });
});
