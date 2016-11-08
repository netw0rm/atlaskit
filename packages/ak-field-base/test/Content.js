import { vdom, define } from 'skatejs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {
  createTemporaryComponent as createTemporary,
  tearDownComponent,
  getShadowRoot,
} from 'akutil-common-test';


import Content from '../src/Content';
import shadowStyles from '../src/shadow.less';
import { createDefinition } from './_helpers';

chai.use(chaiAsPromised);
chai.should();


describe('ak-field-base', () => {
  describe('Content', () => {
    let component;
    let shadowRoot;

    const setupLocalVariables = (newComponent) => {
      component = newComponent;
      shadowRoot = getShadowRoot(newComponent);
    };

    const {
      slotWrapper: slotWrapperClass,
      invalid: invalidClass,
      focused: focusedClass,
      compact: compactClass,
    } = shadowStyles.locals;

    afterEach(() => tearDownComponent(component));

    describe('by default', () => {
      const tmpDefinition = (<Content><div id="child" /></Content>);

      beforeEach(() => createTemporary(define, createDefinition(tmpDefinition))
        .then(setupLocalVariables));

      it('should be possible to create a Content', () => {
        shadowRoot.should.not.be.undefined;
      });

      it('should render a slotwrapper and any children', () => {
        const slotWrapper = shadowRoot.querySelector(`.${slotWrapperClass}`);
        const children = shadowRoot.querySelector('#child');

        expect(slotWrapper).to.not.be.null;
        expect(children).to.not.be.null;
      });
    });

    describe('focused prop = true', () => {
      const tmpDefinition = (<Content focused />);

      beforeEach(() => createTemporary(define, createDefinition(tmpDefinition))
        .then(setupLocalVariables));

      it('should render the slotwrapper with the .focused class', () => {
        const focusedSlotWrapperClassSelector = `.${slotWrapperClass}.${focusedClass}`;
        const focusedSlotWrapper = shadowRoot.querySelector(focusedSlotWrapperClassSelector);
        expect(focusedSlotWrapper).to.not.be.null;
      });
    });

    describe('invalid prop = true', () => {
      const tmpDefinition = (<Content invalid />);

      beforeEach(() => createTemporary(define, createDefinition(tmpDefinition))
        .then(setupLocalVariables));

      it('should render the slotwrapper with the .invalid class', () => {
        const invalidSlotWrapperClassSelector = `.${slotWrapperClass}.${invalidClass}`;
        const invalidSlotWrapper = shadowRoot.querySelector(invalidSlotWrapperClassSelector);
        expect(invalidSlotWrapper).to.not.be.null;
      });
    });

    describe('focused prop = true AND invalid prop = true', () => {
      const tmpDefinition = (<Content focused invalid />);

      beforeEach(() => createTemporary(define, createDefinition(tmpDefinition))
        .then(setupLocalVariables));

      it('should render with the focused styles and not the invalid styles', () => {
        const focusedElement = shadowRoot.querySelector(`.${focusedClass}`);
        const invalidElement = shadowRoot.querySelector(`.${invalidClass}`);
        expect(focusedElement).to.not.be.null;
        expect(invalidElement).to.be.null;
      });
    });

    describe('appearance', () => {
      describe('compact', () => {
        const tmpDefinition = (<Content appearance="compact" />);

        beforeEach(() => createTemporary(define, createDefinition(tmpDefinition))
          .then(setupLocalVariables));

        it('should render the slotwrapper with the .compact class', () => {
          const compactSlotWrapperClassSelector = `.${slotWrapperClass}.${compactClass}`;
          const compactSlotWrapper = shadowRoot.querySelector(compactSlotWrapperClassSelector);
          expect(compactSlotWrapper).to.not.be.null;
        });
      });
    });
  });
});
