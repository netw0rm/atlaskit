import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols } from 'skatejs';
import ButtonGroup from '../src/index.js';
import Button from 'ak-button';
import { waitUntil } from 'akutil-common-test';

chai.use(chaiAsPromised);
chai.should();

let container;
let btnGroup;

// Helper functions for getting various parts of the shadowDOM
const getShadowRoot = () => (btnGroup[symbols.shadowRoot]);
const componentHasShadowRoot = () => (getShadowRoot() !== null);

function setupButtonGroup() {
  btnGroup = new ButtonGroup();
  container = document.createElement('div');
  container.appendChild(btnGroup);
  document.body.appendChild(container);
  return waitUntil(componentHasShadowRoot);
}

function tearDownContainer() {
  document.body.removeChild(container);
}

describe('ak-button-group', () => {
  beforeEach(setupButtonGroup);
  afterEach(tearDownContainer);

  it('should be possible to create a component', () => {
    btnGroup.hasOwnProperty(symbols.shadowRoot).should.equal(true);
  });

  it('group that x-overflows its container should stay on same line i.e. same height', (done) => {
    const addBtn = () => {
      const newBtn = new Button();
      newBtn.innerText = 'Hello';
      btnGroup.appendChild(newBtn);
    };
    addBtn();

    btnGroup.parentElement.style.width = '200px';
    setTimeout(() => {
      const initialHeight = btnGroup.offsetHeight;

      addBtn();
      addBtn();
      addBtn();
      addBtn();
      addBtn();
      addBtn();

      setTimeout(() => {
        btnGroup.offsetHeight.should.equal(initialHeight);
        done();
      });
    });
  });
});
