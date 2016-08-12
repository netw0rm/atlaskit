import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols } from 'skatejs';
import AkutilComponentTemplate from '../src/index.js';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect; // eslint-disable-line no-unused-vars


describe('ak-navigation', () => {
  it('should be possible to create a component', (done) => {
    const component = new AkutilComponentTemplate();
    document.body.appendChild(component);
    setTimeout(() => {
      expect(component[symbols.shadowRoot]).to.be.defined;
      done();
    }, 1);
  });
});
