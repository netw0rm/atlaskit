import { waitUntil, getShadowRoot } from 'akutil-common-test';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import Component from '../src';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

function setupComponent() {
  const component = new Component();
  component.label = 'My label';
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

  describe('label', () => {
    it('should render the supplied label', () => {
      const expectedLabel = 'My new label';
      component.label = expectedLabel;

      const label = shadowRoot.querySelector('label');
      const labelIsCorrect = () => (label.innerText === expectedLabel);

      return waitUntil(labelIsCorrect).should.be.fulfilled;
    });

    it('should focus input when label clicked', (done) => {
      const focusSpy = sinon.spy();
      const input = document.createElement('input');
      component.appendChild(input);
      input.addEventListener('focus', focusSpy);

      const labelText = 'My other label';
      const label = shadowRoot.querySelector('label');
      component.label = labelText;
      const labelIsCorrect = () => (label.innerText === labelText);

      waitUntil(labelIsCorrect).should.be.fulfilled.then(() => {
        label.click();
        setTimeout(() => {
          focusSpy.calledOnce.should.be.true;
          done();
        }, 100);
      });
    });
  });
});
