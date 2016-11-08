import 'custom-event-polyfill';
import { waitUntil, getShadowRoot } from 'akutil-common-test';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import { Component } from 'skatejs';

import FieldBase from '../src';
import shadowStyles from '../src/shadow.less';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

const expect = chai.expect;

function setupComponent() {
  const component = new FieldBase();
  const componentHasShadowRoot = () => getShadowRoot(component);

  document.body.appendChild(component);

  return waitUntil(componentHasShadowRoot).then(() => component);
}

function tearDownComponent(component) {
  document.body.removeChild(component);
}

describe('ak-field-base', () => {
  let component;
  let shadowRoot;

  const {
    label: labelClass,
    labelText: labelTextClass,
    compact: compactClass,
    disabled: disabledClass,
    focused: focusedClass,
    hidden: hiddenClass,
    invalid: invalidClass,
  } = shadowStyles.locals;

  beforeEach(() => setupComponent().then((newComponent) => {
    component = newComponent;
    shadowRoot = getShadowRoot(component);
  }));
  afterEach(() => tearDownComponent(component));

  describe('exports', () => {
    it('should export a base component', () => {
      (new FieldBase()).should.be.an.instanceof(Component);
    });
  });

  describe('label prop', () => {
    it('should be reflected', () => {
      const newLabel = 'new label';
      const label = shadowRoot.querySelector(`.${labelClass}`);
      const newLabelReflected = () => (label.textContent === newLabel);
      // check the negative case first
      expect(newLabelReflected()).to.be.false;

      component.label = newLabel;

      return waitUntil(newLabelReflected).should.be.fulfilled;
    });
  });

  describe('hideLabel prop', () => {
    it('should be reflected', () => {
      const hiddenLabelTextSelector = `.${labelTextClass}.${hiddenClass}`;
      const hideLabelReflected = () => (shadowRoot.querySelector(hiddenLabelTextSelector) !== null);
      expect(hideLabelReflected()).to.be.false;

      component.hideLabel = true;
      return waitUntil(hideLabelReflected).should.be.fulfilled;
    });
  });

  describe('invalid prop', () => {
    it('should be reflected', () => {
      const invalidReflected = () => (shadowRoot.querySelector(`.${invalidClass}`) !== null);
      expect(invalidReflected()).to.be.false;

      component.invalid = true;
      return waitUntil(invalidReflected).should.be.fulfilled;
    });
  });

  describe('disabled prop', () => {
    it('should be reflected', () => {
      const disabledReflected = () => (shadowRoot.querySelector(`.${disabledClass}`) !== null);
      expect(disabledReflected()).to.be.false;

      component.disabled = true;
      return waitUntil(disabledReflected).should.be.fulfilled;
    });
  });

  describe('appearance prop', () => {
    describe('with value of compact', () => {
      it('should be reflected', () => {
        const compactReflected = () => (shadowRoot.querySelector(`.${compactClass}`) !== null);
        expect(compactReflected()).to.be.false;

        component.appearance = 'compact';
        return waitUntil(compactReflected).should.be.fulfilled;
      });
    });
  });

  describe('focus behaviour', () => {
    let inputChild;
    const focusEvent = new CustomEvent('focus');

    beforeEach(() => {
      inputChild = document.createElement('input');
      inputChild.type = 'text';
      inputChild.slot = 'input-slot';
      component.appendChild(inputChild);
    });
    afterEach(() => {
      component.removeChild(inputChild);
    });

    it('should apply focus styles when slotted child is focused', () => {
      const focusApplied = () => (shadowRoot.querySelector(`.${focusedClass}`) !== null);

      expect(focusApplied()).to.be.false;
      inputChild.dispatchEvent(focusEvent);

      return waitUntil(focusApplied).should.be.fulfilled;
    });

    it('should remove focus styles when slotted child is blurred', () => {
      const focusApplied = () => (shadowRoot.querySelector(`.${focusedClass}`) !== null);
      const blurEvent = new CustomEvent('blur');

      // focus first so that we can blur
      inputChild.dispatchEvent(focusEvent);

      return waitUntil(focusApplied).then(() => {
        inputChild.dispatchEvent(blurEvent);

        return waitUntil(() => !focusApplied());
      }).should.be.fulfilled;
    });
  });
});
