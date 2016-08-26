import { name } from '../package.json';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import AkutilComponentTemplate from '../src/index.js';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-navigation', () => {
  it('should be possible to create a component', () => {
    const component = new AkutilComponentTemplate();
    expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
  });
});
