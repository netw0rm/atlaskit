import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';
import sinonChai from 'sinon-chai';
import styles from 'style!../src/components/less/DrawerBackIcon.less';
import DrawerBackIcon from '../src/components/js/DrawerBackIcon';

chai.use(chaiEnzyme());
chai.use(sinonChai);
chai.should();
const expect = chai.expect;

describe('<DrawerBackIcon />', () => {
  describe('props', () => {
    it('renders children', () => {
      const icon = <em>test</em>;
      expect(shallow(<DrawerBackIcon>{icon}</DrawerBackIcon>).contains(icon)).to.equal(true);
    });
    it('isVisible controls the presence of the isVisible class', () => {
      expect(shallow(<DrawerBackIcon isVisible />).length).to.equal(1);
      expect(shallow(<DrawerBackIcon />).find(`.${styles.isVisible}`).length).to.equal(0);
    });
  });
});
