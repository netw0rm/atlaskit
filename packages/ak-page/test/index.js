import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols } from 'skatejs';
import WebComponentTemplate from '../src/index.js';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect; // eslint-disable-line no-unused-vars


describe('ak-page', () => {
  it.skip('should be possible to create a component', () => {
    const component = new WebComponentTemplate();
    component[symbols.shadowRoot].innerHTML.should.match(/I am an .+? element!/);
  });
});
