import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';
import ContainerHeader from '../src/components/js/ContainerHeader';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme);
chai.should();
const expect = chai.expect; // eslint-disable-line no-unused-vars

describe('<ContainerHeader />', () => {
  describe('props', () => {
    it('logo should render an image', () => {
      expect(shallow(<ContainerHeader icon={<img alt="foo" />} />).find('img')).to.have.length(1);
    });
  });
});
