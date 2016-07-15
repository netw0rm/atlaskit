import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols } from 'skatejs';
import AKAvatar from '../src/index.register.js';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect; // eslint-disable-line no-unused-vars


describe('ak-avatar', () => {
  it('should be possible to create a component', () => {
    const component = new AKAvatar();
    component[symbols.shadowRoot].innerHTML.should.match(/I am an .+? element!/);
  });
});
