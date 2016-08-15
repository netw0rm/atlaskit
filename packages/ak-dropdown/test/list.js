import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import List from '../src/list.js';
import { symbols } from 'skatejs';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-dropdown-list:', () => {
  describe('general behavior:', () => {
    let component;
    let itemContainer;

    beforeEach(() => {
      component = new List();
      itemContainer = document.createElement('div');
      itemContainer.appendChild(component);
    });
    it('should be possible to create a component', (done) => {
      // testing to see that skate did its job as expected
      // (in case some breaking changes in it that affect rendering)
      setTimeout(() => {
        expect(component.tagName.toLowerCase()).to.equal('ak-dropdown-list');
        expect(component[symbols.shadowRoot]).to.be.defined;
        expect(component[symbols.shadowRoot].firstChild).to.be.defined;
      });
      setTimeout(done);
    });
  });
});
