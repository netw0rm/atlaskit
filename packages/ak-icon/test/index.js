import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import AkIcon from '../src';
import { name } from '../package.json';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-icon', () => {
  it('should be possible to create a component', () => {
    let component;
    expect(() => {
      component = new AkIcon();
    }).not.to.throw(Error);
    expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
  });
});
