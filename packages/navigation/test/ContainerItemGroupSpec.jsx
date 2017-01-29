import { mount } from 'enzyme';
import React from 'react';
import {
  action,
  title,
} from 'style!../src/components/less/ContainerItemGroup.less';
import ContainerItemGroup from '../src/components/js/ContainerItemGroup';

describe('<ContainerItemGroup />', () => {
  describe('props', () => {
    it('title should render a title', () => {
      expect(mount(<ContainerItemGroup title="foo" />).find(`.${title}`).text()).to.equal('foo');
    });
    it('action should render in the container item group', () => {
      expect(mount(<ContainerItemGroup action={<div className="create">Create button</div>} />).find('.create').length).to.be.above(0);
    });
    it('with no action specified, no action should be rendered', () => {
      expect(mount(<ContainerItemGroup />).find(`.${action}`).isEmpty()).to.equal(true);
    });
  });
});
