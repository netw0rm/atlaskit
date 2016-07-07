import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import '../src/index.register.js';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect; // eslint-disable-line no-unused-vars


describe('akutil-component-template', () => {
  it('should be possible to create a component', () => {
    const component = document.createElement('akutil-component-template');
    // TODO: Talk to Trey on how to make this better - helper fn?
    (component.innerHTML || component.shadowRoot.innerHTML).should.match(/I am an .+? element!/);
  });
});
