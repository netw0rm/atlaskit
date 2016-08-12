import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols } from 'skatejs';
import WebComponentTemplate from '../src/index.js';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect; // eslint-disable-line no-unused-vars


describe('ak-page', () => {
  it('should be possible to create a component', (done) => {
    const component = new WebComponentTemplate();
    document.body.appendChild(component);
    setTimeout(() => {
      expect(component[symbols.shadowRoot]).to.be.defined;
      done();
    }, 1);
  });
});
