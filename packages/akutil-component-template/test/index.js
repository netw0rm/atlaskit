import { waitUntil } from 'akutil-common-test';
import { symbols } from 'skatejs';
const { shadowRoot } = symbols;
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import Component from '../src';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

const expect = chai.expect;

let component;

const getShadowRoot = () => (component[shadowRoot]);
const getParagraph = () => (getShadowRoot().querySelector('p'));

function setUpComponent(done) {
  const componentHasShadowRoot = () => (getShadowRoot() !== null);

  component = new Component();
  document.body.appendChild(component);

  waitUntil(componentHasShadowRoot).then(() => {
    expect(componentHasShadowRoot()).to.be.true;
  }).then(done);
}

function tearDownComponent() {
  document.body.removeChild(component);
}


describe('akutil-component-template', () => {
  beforeEach(setUpComponent);
  afterEach(tearDownComponent);

  it('should be possible to create a component', () => {
    expect(component[shadowRoot].innerHTML).to.match(/My name is .+?!/);
  });

  describe('name prop', () => {
    it('should modify the rendered name', done => {
      const newName = 'InigoMontoya';
      const expectedInnerHTML = `My name is ${newName}!`;
      const paragraph = getParagraph();

      const nameHasBeenModifiedCorrectly = () => (paragraph.innerHTML === expectedInnerHTML);

      component.name = newName;

      waitUntil(nameHasBeenModifiedCorrectly).then(() => {
        expect(nameHasBeenModifiedCorrectly()).to.be.true;
      }).then(done);
    });
  });
});
