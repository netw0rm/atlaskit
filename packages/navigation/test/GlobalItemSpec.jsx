import { shallow, mount } from 'enzyme';
import React from 'react';
import styles from 'style-loader!../src/components/less/GlobalItem.less';
import GlobalItem from '../src/components/js/GlobalItem';

describe('<GlobalItem />', () => {
  describe('props', () => {
    it('default size prop is small', () => {
      expect((shallow(<GlobalItem />).find(`.${styles.globalItem}`)).hasClass((styles.smallGlobalItem))).to.equal(true);
    });
    it('small size prop renders small global item', () => {
      expect((shallow(<GlobalItem size="small" />).find(`.${styles.globalItem}`)).hasClass((styles.smallGlobalItem))).to.equal(true);
    });
    it('medium size prop renders medium global item', () => {
      expect((shallow(<GlobalItem size="medium" />).find(`.${styles.globalItem}`)).hasClass((styles.mediumGlobalItem))).to.equal(true);
    });
    it('large size prop renders large global item', () => {
      expect((shallow(<GlobalItem size="large" />).find(`.${styles.globalItem}`)).hasClass((styles.largeGlobalItem))).to.equal(true);
    });
    it('isSelected renders with the isSelected class', () => {
      expect((shallow(<GlobalItem isSelected />).find(`.${styles.globalItem}`)).hasClass((styles.isSelected))).to.equal(true);
    });
    it('appearance="container" renders with the hasContainerAppearance class', () => {
      expect((shallow(<GlobalItem appearance="container" />).find(`.${styles.globalItem}`)).hasClass((styles.hasContainerAppearance))).to.equal(true);
    });
    it('appearance="settings" renders with the hasProjectSettingsAppearance class', () => {
      expect((shallow(<GlobalItem appearance="settings" />).find(`.${styles.globalItem}`)).hasClass((styles.hasProjectSettingsAppearance))).to.equal(true);
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
