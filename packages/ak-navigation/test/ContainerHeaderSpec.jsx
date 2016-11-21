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
      expect(shallow(<ContainerHeader logo={<img alt="foo" />} />).find('img')).to.have.length(1);
    });
    it('without a link should render no <a /> elements', () => {
      expect(shallow(<ContainerHeader logo={<img alt="foo" />} />).find('a')).to.have.length(0);
    });
    it('link should wrap the title and the logo', () => {
      expect(shallow(<ContainerHeader link={<a href="#link">link</a>} logo={<img alt="foo" />} />).find('a')).to.have.length(2);
      expect(shallow(<ContainerHeader link={<a href="#link">link</a>} logo={<img alt="foo" />} />).find('a > img')).to.have.length(1);
    });
  });
});
