import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import styles from 'style!../src/components/less/ContainerItem.less';
import { mountWithContext } from './utils';
import ContainerItem from '../src/components/js/ContainerItem';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());
chai.should();
const expect = chai.expect;

describe('<ContainerItem />', () => {
  describe('props', () => {
    it('icon should render an image', () => {
      expect(mountWithContext(<ContainerItem icon={<img alt="foo" />} />)).to.have.exactly(1).descendants('img');
    });
    it('isSelected=true should render with the isSelected class', () => {
      expect(mountWithContext(<ContainerItem isSelected />).find(`.${styles.containerItemOuter}`)).to.have.className(styles.isSelected);
    });
    it('isSelected=false should not render with the isSelected class', () => {
      expect(mountWithContext(<ContainerItem />).find(`.${styles.containerItemOuter}`)).to.not.have.className(styles.isSelected);
    });
  });
});
