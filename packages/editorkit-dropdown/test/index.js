import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols } from 'skatejs';
import EditorkitDropdown from '../src/index.register.js';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect; // eslint-disable-line no-unused-vars


describe('editorkit-dropdown', () => {
  it('should be possible to create a component', () => {
    const component = new EditorkitDropdown();
    component[symbols.shadowRoot].innerHTML.should.match(/editorkit-option-heading3/);
  });
});
