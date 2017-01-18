import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';
import React from 'react';
import sinonChai from 'sinon-chai';
import styles from 'style-loader!../src/components/less/GlobalItem.less';
import GlobalItem from '../src/components/js/GlobalItem';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());
chai.use(sinonChai);
chai.should();
const expect = chai.expect;

describe('<GlobalItem />', () => {
  describe('props', () => {
    it('default size prop is small', () => {
      expect(shallow(<GlobalItem />).find(`.${styles.globalItem}`)).to.have.className(styles.smallGlobalItem);
    });
    it('small size prop renders small global item', () => {
      expect(shallow(<GlobalItem size="small" />).find(`.${styles.globalItem}`)).to.have.className(styles.smallGlobalItem);
    });
    it('medium size prop renders medium global item', () => {
      expect(shallow(<GlobalItem size="medium" />).find(`.${styles.globalItem}`)).to.have.className(styles.mediumGlobalItem);
    });
    it('large size prop renders large global item', () => {
      expect(shallow(<GlobalItem size="large" />).find(`.${styles.globalItem}`)).to.have.className(styles.largeGlobalItem);
    });
    it('isSelected renders with the isSelected class', () => {
      expect(shallow(<GlobalItem isSelected />).find(`.${styles.globalItem}`)).to.have.className(styles.isSelected);
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
