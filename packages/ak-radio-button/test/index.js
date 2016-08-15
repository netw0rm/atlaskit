import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols } from 'skatejs';
import RadioButton from '../src/index.js';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect; // eslint-disable-line no-unused-vars

function waitForRender(elem, cb) {
  setTimeout(() => {
    if (elem[symbols.shadowRoot]) {
      return cb();
    }
    return waitForRender(elem, cb);
  }, 0);
}

function setFixtures(elems) {
  document.body.innerHTML = '';
  elems.forEach(elem => {
    document.body.appendChild(elem);
  });
}

describe('ak-radio-button', () => {
  let radioBtn;

  beforeEach((done) => {
    radioBtn = new RadioButton();
    radioBtn.innerText = 'Hello world';
    radioBtn.setAttribute('tabindex', 0);
    setFixtures([radioBtn]);
    waitForRender(radioBtn, done);
  });

  it('should be possible to create a component', () => {
    radioBtn.hasOwnProperty(symbols.shadowRoot).should.equal(true);
  });

  it('should be possible to focus on the component', () => {
    radioBtn.focus();
    document.activeElement.should.equal(radioBtn);
  });
});
