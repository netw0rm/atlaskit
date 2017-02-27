import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import SubSup from '../../src/marks/subsup';

describe('<SubSup />', () => {

  describe('<Sub />', () => {
    const mark = shallow(<SubSup attrs={{type: 'sub'}}>This is sub</SubSup>);

    it('should wrap content with <sub>-tag', () => {
      expect(mark.is('sub')).to.equal(true);
    });

    it('should output correct html', () => {
      expect(mark.html()).to.equal('<sub>This is sub</sub>');
    });
  });

  describe('<Sup />', () => {
    const mark = shallow(<SubSup attrs={{type: 'sup'}}>This is sup</SubSup>);

    it('should wrap content with <sup>-tag', () => {
      expect(mark.is('sup')).to.equal(true);
    });

    it('should output correct html', () => {
      expect(mark.html()).to.equal('<sup>This is sup</sup>');
    });
  });

});
