import { shallow, mount } from 'enzyme';
import React from 'react';
import styles from 'style-loader!../src/components/less/GlobalNavigation.less';
import GlobalNavigation from '../src/components/js/GlobalNavigation';

describe('<GlobalNavigation />', () => {
  describe('renders', () => {
    it('should render a <Spacer />', () => {
      expect(mount(<GlobalNavigation />).find('Spacer')).to.have.length(1);
    });
    it('should render <GlobalActions />', () => {
      expect(mount(<GlobalNavigation />).find('GlobalActions')).to.have.length(1);
    });
  });
  describe('props', () => {
    it('primaryIcon prop is passed to <GlobalActions />', () => {
      const icon = <img alt="foo" />;
      expect(shallow(<GlobalNavigation primaryIcon={icon} />)
        .find('GlobalActions').props().primaryIcon).to.equal(icon);
    });
    it('primaryItemHref prop is passed to <GlobalActions />', () => {
      const icon = <img alt="foo" />;
      expect(shallow(<GlobalNavigation primaryIcon={icon} primaryItemHref="http://google.com" />)
        .find('GlobalActions').props().primaryItemHref).to.equal('http://google.com');
    });
    it('primaryIcon=null means no <GlobalItem /> is rendered', () => {
      expect(shallow(<GlobalNavigation />)
        .find('GlobalItem').length).to.equal(0);
    });
    it('linkComponent is passed on to the primary <GlobalActions/>', () => {
      const linkComponent = () => null;
      expect(shallow(<GlobalNavigation primaryIcon="foo" linkComponent={linkComponent} />)
        .find('GlobalActions').props().linkComponent).to.equal(linkComponent);
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
    it('appearance="settings" renders with the hasSettingsAppearance class', () => {
      expect((shallow(
        <GlobalNavigation
          appearance="settings"
        />).find(`.${styles.globalNavigationOuter}`)).hasClass((styles.hasSettingsAppearance))).to.equal(true);
    });
  });
});
