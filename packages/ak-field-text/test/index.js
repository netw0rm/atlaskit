import { waitUntil, getShadowRoot } from 'akutil-common-test';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import Component, { events } from '../src';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

describe('ak-field-text', () => {
  function setupComponent(opts = {}) {
    const component = new Component();
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

  describe('disabled', () => {
    let component;

    beforeEach(() => setupComponent({ disabled: true }).then(newComponent => {
      component = newComponent;
    }));
    afterEach(() => tearDownComponent(component));

    it('should apply the disabled property to the input', () => {
      const input = component.querySelector('input');
      expect(input.disabled).to.equal(true);
    });
  });

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

  describe('name', () => {
    let component;
    const expectedName = 'fname';

    beforeEach(() => setupComponent({ name: expectedName }).then(newComponent => {
      component = newComponent;
    }));
    afterEach(() => tearDownComponent(component));

    it('should apply the name property to the input', () => {
      const input = component.querySelector('input');
      expect(input.name).to.equal(expectedName);
    });
  });

  describe('placeholder', () => {
    let component;
    const expectedPlaceholder = 'Placeholder text';

    beforeEach(() => setupComponent({ placeholder: expectedPlaceholder }).then(newComponent => {
      component = newComponent;
    }));
    afterEach(() => tearDownComponent(component));

    it('should apply the placeholder property to the input', () => {
      const input = component.querySelector('input');
      expect(input.placeholder).to.equal(expectedPlaceholder);
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

  describe('type', () => {
    let component;
    const expectedType = 'password';

    beforeEach(() => setupComponent({ type: expectedType }).then(newComponent => {
      component = newComponent;
    }));
    afterEach(() => tearDownComponent(component));

    it('should apply the type property to the input', () => {
      const input = component.querySelector('input');
      expect(input.type).to.equal(expectedType);
    });
  });

  describe('value', () => {
    let component;
    const expectedValue = 'my value';

    beforeEach(() => setupComponent().then(newComponent => {
      component = newComponent;
    }));
    afterEach(() => tearDownComponent(component));

    it('gets the value from the input', () => {
      const input = component.querySelector('input');
      input.value = expectedValue;
      expect(input.value).to.equal(expectedValue);
      expect(component.value).to.equal(expectedValue);
    });

    it('setting the value updates the input value', () => {
      const input = component.querySelector('input');
      component.value = expectedValue;
      expect(input.value).to.equal(expectedValue);
      expect(component.value).to.equal(expectedValue);
    });
  });

  describe('sizing', () => {
    let component;

    beforeEach(() => setupComponent().then(newComponent => {
      component = newComponent;
    }));
    afterEach(() => tearDownComponent(component));

    function inputHeightCorrect(expectedHeight) {
      return () => {
        const height = component.querySelector('input').getBoundingClientRect().height;
        // IE11 will sometimes be a fraction of a pixel off, so accept a close-enough height
        return height === expectedHeight || Math.abs(height - expectedHeight) < 1;
      };
    }

    it('should be 40px high by default', () =>
      waitUntil(inputHeightCorrect(40)).should.be.fulfilled
    );

    it('should be 32px high when compact', () => {
      component.compact = true;
      return waitUntil(inputHeightCorrect(32)).should.be.fulfilled;
    });
  });

  describe('events', () => {
    let component;

    beforeEach(() => setupComponent().then(newComponent => {
      component = newComponent;
    }));
    afterEach(() => tearDownComponent(component));

    it('should emit the akFocus and akBlur events on focus and blur', () => {
      const focusSpy = sinon.spy();
      const blurSpy = sinon.spy();

      component.addEventListener(events.focus, focusSpy);
      component.addEventListener(events.blur, blurSpy);

      const focusEventEmitted = () => focusSpy.calledOnce;
      const blurEventEmitted = () => blurSpy.calledOnce;

      expect(focusEventEmitted()).to.equal(false);
      expect(blurEventEmitted()).to.equal(false);

      const input = component.querySelector('input');
      input.focus();

      return waitUntil(focusEventEmitted).then(() => {
        input.blur();
        return waitUntil(blurEventEmitted).should.be.fulfilled;
      });
    });
  });
});
