import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols } from 'skatejs';
import ButtonGroup from '../src/index.js';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect; // eslint-disable-line no-unused-vars

function setFixtures(elems) {
  document.body.innerHTML = '';
  elems.forEach(elem => {
    document.body.appendChild(elem);
  });
}

function waitForRender(elem, cb) {
  setTimeout(() => {
    if (elem[symbols.shadowRoot]) {
      return cb();
    }
    return waitForRender(elem, cb);
  }, 0);
}

describe('ak-button-group', () => {
  it('should be possible to create a component', () => {
    const btnGroup = new ButtonGroup();
    setFixtures([btnGroup]);
    waitForRender(btnGroup, () => {
      btnGroup.hasOwnProperty(symbols.shadowRoot).should.equal(true);
    });
  });
});
