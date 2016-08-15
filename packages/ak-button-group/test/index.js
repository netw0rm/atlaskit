import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols } from 'skatejs';
import ButtonGroup from '../src/index.js';
import RadioButton from '../../ak-radio-button/src/index.js';
import keyCode from 'keycode';

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

function pressKey(code, cb) {
  // const keyPressEvent = new CustomEvent('keydown', {
  //   bubbles: true,
  //   cancelable: true,
  // });
  // keyPressEvent.keyCode = code;
  const keyPressEvent = new KeyboardEvent('keydown', {
    code,
    keyCode: code,
  });

  document.dispatchEvent(keyPressEvent);
  setTimeout(cb, 1);
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

    it('should contain 3 radio buttons', () => {
      btnGroup.children.length.should.equal(3);
    });

    it('should not modify radio button selected state when loaded', () => {
      btnGroup.childNodes.forEach(radioBtn => {
        radioBtn.selected.should.equal(false);
      });
    });

    it('should update selected prop on all radios when one is clicked', () => {
      btnGroup.childNodes.forEach(radioBtnToSelect => {
        radioBtnToSelect.click();

        btnGroup.childNodes.forEach(loopRadioBtn => {
          loopRadioBtn.selected.should.equal(loopRadioBtn === radioBtnToSelect);
        });
      });
    });

    it.skip('should be able to select radio buttons using keyboard tab/enter', (done) => {
      const radioBtns = btnGroup.childNodes;

      // inputBefore.focus();
      // pressKey(keyCode('TAB'));

      radioBtns[0].focus();
      setTimeout(() => {
        document.activeElement.should.equal(radioBtns[0]);
        pressKey(keyCode('ENTER'));
        radioBtns[0].selected.should.equal(true);
        done();
      });

      // done();
      // let focusedRadioButtonIndex = 0;
      // function tabToNextButton() {
      //     console.log(document.activeElement);
      //     debugger;
      //     pressKey(keyCode('ENTER'), () => {
      //       radioBtns.forEach(loopRadioBtn => {
      //         const shouldBtnBeSelected = loopRadioBtn === radioBtns[focusedRadioButtonIndex];
      //         loopRadioBtn.selected.should.equal(
      //           shouldBtnBeSelected,
      //           `Radio button ${focusedRadioButtonIndex}`
      //         );
      //       });
      //
      //       focusedRadioButtonIndex++;
      //       done();
      //     });
      //   });
      // }
      //
      // tabToNextButton();
    });
  });
});
