import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import React from 'react';
import {
  action,
  title,
} from 'style!../src/components/less/ContainerItemGroup.less';
import ContainerItemGroup from '../src/components/js/ContainerItemGroup';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());
chai.should();
const expect = chai.expect;

describe('<ContainerItemGroup />', () => {
  describe('props', () => {
    it('title should render a title', () => {
      expect(mount(<ContainerItemGroup title="foo" />).find(`.${title}`).text()).to.equal('foo');
    });
    it('action should render in the container item group', () => {
      expect(mount(<ContainerItemGroup action={<div className="create">Create button</div>} />).find('.create')).to.be.present();
    });
    it('with no action specified, no action should be rendered', () => {
      expect(mount(<ContainerItemGroup />).find(`.${action}`)).to.not.be.present();
    });
  });
});
