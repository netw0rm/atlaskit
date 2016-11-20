// NOTE: need to switch these tests back on and refactor to enzyme
// once https://ecosystem.atlassian.net/browse/AK-879 is fixed.

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';

import AkNavigation from '../src';


chai.use(chaiAsPromised);
chai.use(chaiEnzyme);
chai.should();
const expect = chai.expect; // eslint-disable-line no-unused-vars

describe('ak-navigation', () => {
  describe('width property', () => {
    it('should be visibly displayed', () => {
      shallow(<AkNavigation width={80} />).find('div').text().should.not.equal('5');
    });
  });
});
