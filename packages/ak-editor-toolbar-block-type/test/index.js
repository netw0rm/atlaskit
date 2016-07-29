import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols } from 'skatejs';
import Dropdown from '../src';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect; // eslint-disable-line no-unused-vars


describe('ak-editor-toolbar-block-type', () => {
  it('should be possible to create a component', () => {
    const component = new Dropdown();
    component[symbols.shadowRoot].innerHTML.should.match(/font-select/);
  });
});
