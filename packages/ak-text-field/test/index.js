import { waitUntil, getShadowRoot } from 'akutil-common-test';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import Component from '../src';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

describe('ak-text-field', () => {
  function setupComponent(opts = {}) {
    const component = new Component();
    const input = document.createElement('input');
    input.type = 'text';
    component.appendChild(input);
    Object.keys(opts).forEach((key) => {
      component[key] = opts[key];
    });
    const componentHasShadowRoot = () => !!getShadowRoot(component);

    document.body.appendChild(component);

    return waitUntil(componentHasShadowRoot).then(() => component);
  }

  function tearDownComponent(component) {
    document.body.removeChild(component);
  }

  describe('label', () => {
    let component;
    let shadowRoot;
    const expectedLabel = 'My new label';

    beforeEach(() => setupComponent({ label: expectedLabel }).then(newComponent => {
      component = newComponent;
      shadowRoot = getShadowRoot(component);
    }));
    afterEach(() => tearDownComponent(component));
    it('should render the supplied label', () => {
      const label = shadowRoot.querySelector('label > div');
      const labelIsCorrect = () => (label.innerText === expectedLabel);

      return waitUntil(labelIsCorrect).should.be.fulfilled;
    });

    it('should focus input when label clicked', () => {
      const focusSpy = sinon.spy();
      const input = component.querySelector('input');
      input.addEventListener('focus', focusSpy);

      const labelText = 'My other label';
      const label = shadowRoot.querySelector('label > div');
      component.label = labelText;
      const labelIsCorrect = () => (label.innerText === labelText);

      return waitUntil(labelIsCorrect).then(() => {
        const labelFocused = () => (focusSpy.calledOnce);
        expect(labelFocused()).to.equal(false);
        label.click();
        return waitUntil(labelFocused).should.be.fulfilled;
      });
    });

    it('should not throw error when label clicked with no input', () => {
      const label = shadowRoot.querySelector('label');
      expect(() => (label.click())).to.not.throw(Error);
    });
  });

  describe('required', () => {
    let component;
    let shadowRoot;

    beforeEach(() => setupComponent({ required: true }).then(newComponent => {
      component = newComponent;
      shadowRoot = getShadowRoot(component);
    }));
    afterEach(() => tearDownComponent(component));

    it('should render the supplied label with required field', () => {
      const required = shadowRoot.querySelector('label > div > span');
      const requiredIsCorrect = () => (required.innerText === '*');

      return waitUntil(requiredIsCorrect).should.be.fulfilled;
    });
  });

  describe('compact', () => {
    let component;

    beforeEach(() => setupComponent().then(newComponent => {
      component = newComponent;
    }));
    afterEach(() => tearDownComponent(component));

    function getInputHeight() {
      return component.querySelector('input').getBoundingClientRect().height;
    }

    it('input should be 40px high by default', () => {
      const inputHasCorrectHeight = () => getInputHeight() === 40;
      return waitUntil(inputHasCorrectHeight).should.be.fulfilled;
    });

    it('input should be 32px high when compact', () => {
      component.compact = true;

      const inputHasCorrectHeight = () => getInputHeight() === 32;
      return waitUntil(inputHasCorrectHeight).should.be.fulfilled;
    });
  });
});
