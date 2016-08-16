import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Dropdown from '../src/index.js';
import { symbols } from 'skatejs';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-dropdown:', () => {
  describe('general behavior:', () => {
    let component;
    let dropdownContainer;

    beforeEach(() => {
      component = new Dropdown();
      dropdownContainer = document.createElement('div');
      dropdownContainer.appendChild(component);
      document.body.appendChild(dropdownContainer);
    });
    afterEach(() => {
      document.body.removeChild(dropdownContainer);
    });
    it('should be possible to create a component', (done) => {
      // testing to see that skate did its job as expected
      // (in case some breaking changes in it that affect rendering)
      setTimeout(() => {
        expect(component.tagName.toLowerCase()).to.equal('ak-dropdown');
        expect(component[symbols.shadowRoot]).to.be.defined;
        expect(component[symbols.shadowRoot].firstChild).to.be.defined;
      });
      setTimeout(done);
    });
  });
});
