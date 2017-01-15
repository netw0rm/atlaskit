import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';
import React from 'react';
import GlobalNavigation from '../src/components/js/GlobalNavigation';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());
chai.should();
const expect = chai.expect;

describe('<GlobalNavigation />', () => {
  describe('children', () => {
    it('should render a <Spacer />', () => {
      expect(shallow(<GlobalNavigation />).find('Spacer')).to.have.length(1);
    });
    it('should render a <GlobalItem /> with medium size', () => {
      const icon = <img alt="foo" />;
      expect(shallow(<GlobalNavigation primaryIcon={icon} />)
        .find('GlobalItem').props().size).to.equal('medium');
    });
  });
  describe('props', () => {
    it('width prop is reflected directly on <Spacer />', () => {
      expect(shallow(<GlobalNavigation width={500} />).find('Spacer').props().width).to.equal(500);
      expect(shallow(<GlobalNavigation width={200} />).find('Spacer').props().width).to.equal(200);
    });
    it('primaryIcon prop is passed to <GlobalItem />', () => {
      const icon = <img alt="foo" />;
      expect(shallow(<GlobalNavigation primaryIcon={icon} />)
        .find('GlobalItem').props().children).to.equal(icon);
    });
    it('primaryItemHref prop is passed to <GlobalItem />', () => {
      const icon = <img alt="foo" />;
      expect(shallow(<GlobalNavigation primaryIcon={icon} primaryItemHref="http://google.com" />)
        .find('GlobalItem').props().href).to.equal('http://google.com');
    });
    it('primaryIcon=null means no <GlobalItem /> is rendered', () => {
      expect(shallow(<GlobalNavigation />)
        .find('GlobalItem').length).to.equal(0);
    });
    it('linkComponent is passed on to the primary <GlobalItem/>', () => {
      const linkComponent = () => null;
      expect(shallow(<GlobalNavigation primaryIcon="foo" linkComponent={linkComponent} />)
        .find('GlobalItem').props().linkComponent).to.equal(linkComponent);
    });
    it('helpItem should render in the global navigation', () => {
      const helpItem = <span className="HELP_ITEM" />;
      expect(mount(
        <GlobalNavigation
          helpItem={helpItem}
        />).contains(helpItem)).to.equal(true);
    });
    it('accountItem should render in the global navigation', () => {
      const accountItem = <span className="ACCOUNT_ITEM" />;
      expect(mount(
        <GlobalNavigation
          accountItem={accountItem}
        />).contains(accountItem)).to.equal(true);
    });
  });
});
