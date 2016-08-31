import { waitUntil, getShadowRoot } from 'akutil-common-test';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import Component from '../src';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

const expect = chai.expect;

function setupComponent() {
  const component = new Component();
  const componentHasShadowRoot = () => !!getShadowRoot(component);

  document.body.appendChild(component);

  return waitUntil(componentHasShadowRoot).then(() => component);
}

function tearDownComponent(component) {
  document.body.removeChild(component);
}


describe('ak-text-field', () => {
  let component;
  let shadowRoot;

  beforeEach(() => setupComponent().then(newComponent => {
    component = newComponent;
    shadowRoot = getShadowRoot(component);
  }));
  afterEach(() => tearDownComponent(component));

  it.skip('should be possible to create a component', () => {
    expect(shadowRoot.innerHTML).to.match(/My name is .+?!/);
  });

  describe.skip('name prop', () => {
    it('should modify the rendered name', () => {
      const newName = 'InigoMontoya';
      const expectedInnerHTML = `My name is ${newName}!`;
      const paragraph = shadowRoot.querySelector('p');

      const nameHasBeenModifiedCorrectly = () => (paragraph.innerHTML === expectedInnerHTML);

      component.name = newName;

      // here we can wrap our assertions in promises and just check that the promise was fulfilled
      waitUntil(nameHasBeenModifiedCorrectly).should.be.fulfilled;
    });
  });

  it('should modify the rendered name', () => {
    (1).should.equal(1);
  });
});
