import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { name } from '../package.json';
import Component from '../src';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe.skip('ak-page', () => {
  it('should be possible to create a component', () => {
    const component = new Component();
    expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
  });
});
