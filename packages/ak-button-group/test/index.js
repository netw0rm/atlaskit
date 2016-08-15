import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols } from 'skatejs';
import ButtonGroup from '../src/index.js';
import RadioButton from '../../ak-radio-button/src/index.js';

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

  describe('with radio buttons', () => {
    let btnGroup;

    beforeEach((done) => {
      btnGroup = new ButtonGroup();
      for (let i = 0; i < 3; i++) {
        const radioBtn = new RadioButton();
        radioBtn.innerText = `Radio ${i}`;
        btnGroup.appendChild(radioBtn);
      }

      setFixtures([btnGroup]);
      waitForRender(btnGroup, done);
    });

    it('should contain the expected number radio buttons', () => {
      btnGroup.children.length.should.equal(3);
    });

    it('should not modify radio button selected state when loaded', () => {
      btnGroup.childNodes.forEach(radioBtn => {
        radioBtn.selected.should.equal(false);
      });
    });

    it('should update selected prop on all radios when one is clicked', () => {
      const radioBtns = btnGroup.childNodes;
      radioBtns.forEach(radioBtnToSelect => {
        radioBtnToSelect.click();

        radioBtns.forEach(loopRadioBtn => {
          loopRadioBtn.selected.should.equal(loopRadioBtn === radioBtnToSelect);
        });
      });
    });
  });
});
