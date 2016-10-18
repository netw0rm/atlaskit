import 'custom-event-polyfill';
import { vdom, define } from 'skatejs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {
  createTemporaryComponent as createTemporary,
  tearDownComponent,
  getShadowRoot,
} from 'akutil-common-test';


import Editing from '../src/Editing';
import shadowStyles from '../src/shadow.less';
import { createDefinition } from './_helpers';

chai.use(chaiAsPromised);
chai.should();


describe('ak-field-base', () => {
  describe('Editing', () => {
    let component;
    let shadowRoot;

    const setupLocalVariables = (newComponent) => {
      component = newComponent;
      shadowRoot = getShadowRoot(newComponent);
    };

    const {
      editModeWrapper: editModeWrapperClass,
      editModeSlotWrapper: slotWrapperClass,
      editConfirm: confirmButtonClass,
      editCancel: cancelButtonClass,
      waitingSpinner: spinnerClass,
      hidden: hiddenClass,
      focused: focusedClass,
      invalid: invalidClass,
    } = shadowStyles.locals;

    afterEach(() => tearDownComponent(component));

    describe('by default', () => {
      const tmpDefinition = (<Editing />);

      beforeEach(() => createTemporary(define, createDefinition(tmpDefinition))
        .then(setupLocalVariables));

      it('should be possible to create an Editing', () => {
        shadowRoot.should.not.be.undefined;
      });

      it('should render a div with the editModeWrapperClass', () => {
        const editModeWrapper = shadowRoot.querySelector(`.${editModeWrapperClass}`);
        expect(editModeWrapper).to.not.be.null;
      });

      it('should render a slotwrapper and a slot element', () => {
        const editModeSlotWrapper = shadowRoot.querySelector(`.${slotWrapperClass}`);
        const editmodeSlot = shadowRoot.querySelector('slot[name=editmode]');

        expect(editModeSlotWrapper).to.not.be.null;
        expect(editmodeSlot).to.not.be.null;
      });

      it('should render the confirm and cancel buttons', () => {
        const confirmButton = shadowRoot.querySelector(`.${confirmButtonClass}`);
        const cancelButton = shadowRoot.querySelector(`.${cancelButtonClass}`);

        expect(confirmButton).to.not.be.null;
        expect(cancelButton).to.not.be.null;
      });

      it('should not render the waiting spinner', () => {
        const waitingSpinner = shadowRoot.querySelector(`.${spinnerClass}`);
        expect(waitingSpinner).to.be.null;
      });
    });

    describe('hideEditing prop = true', () => {
      const tmpDefinition = (<Editing hideEditing />);

      beforeEach(() => createTemporary(define, createDefinition(tmpDefinition))
        .then(setupLocalVariables));

      it('should render root node with .hidden class', () => {
        const rootNode = shadowRoot.querySelector(`.${hiddenClass}`);
        expect(rootNode).to.not.equal.null;
      });

      it('should render root node without .editModeWrapper class', () => {
        const rootNode = shadowRoot.querySelector(`.${editModeWrapperClass}`);
        expect(rootNode).to.equal.null;
      });
    });

    describe('focused prop = true', () => {
      const tmpDefinition = (<Editing focused />);

      beforeEach(() => createTemporary(define, createDefinition(tmpDefinition))
        .then(setupLocalVariables));

      it('should render the slotwrapper with the .focused class', () => {
        const focusedSlotWrapperClassSelector = `.${slotWrapperClass}.${focusedClass}`;
        const focusedSlotWrapper = shadowRoot.querySelector(focusedSlotWrapperClassSelector);
        expect(focusedSlotWrapper).to.not.be.null;
      });
    });

    describe('invalid prop = true', () => {
      const tmpDefinition = (<Editing invalid />);

      beforeEach(() => createTemporary(define, createDefinition(tmpDefinition))
        .then(setupLocalVariables));

      it('should render the slotwrapper with the .invalid class', () => {
        const invalidSlotWrapperClassSelector = `.${slotWrapperClass}.${invalidClass}`;
        const focusedSlotWrapper = shadowRoot.querySelector(invalidSlotWrapperClassSelector);
        expect(focusedSlotWrapper).to.not.be.null;
      });
    });

    describe('focused prop = true AND invalid prop = true', () => {
      const tmpDefinition = (<Editing focused invalid />);

      beforeEach(() => createTemporary(define, createDefinition(tmpDefinition))
        .then(setupLocalVariables));

      it('should render with the focused styles and not the invalid styles', () => {
        const focusedElement = shadowRoot.querySelector(`.${focusedClass}`);
        const invalidElement = shadowRoot.querySelector(`.${invalidClass}`);
        expect(focusedElement).to.not.be.null;
        expect(invalidElement).to.be.null;
      });
    });

    describe('waiting prop = true', () => {
      const tmpDefinition = (<Editing waiting />);

      beforeEach(() => createTemporary(define, createDefinition(tmpDefinition))
        .then(setupLocalVariables));

      it('should render the waiting spinner', () => {
        const waitingSpinner = shadowRoot.querySelector(`.${spinnerClass}`);
        expect(waitingSpinner).to.not.be.null;
      });

      it('should not render the confirm and cancel buttons', () => {
        const confirmButton = shadowRoot.querySelector(`.${confirmButtonClass}`);
        const cancelButton = shadowRoot.querySelector(`.${cancelButtonClass}`);

        expect(confirmButton).to.be.null;
        expect(cancelButton).to.be.null;
      });
    });

    describe('onConfirm callback prop', () => {
      const callbackSpy = sinon.spy();
      const tmpDefinition = (<Editing onConfirm={callbackSpy} />);

      beforeEach(() => createTemporary(define, createDefinition(tmpDefinition))
        .then(setupLocalVariables));

      it('should be called when confirm button is clicked', () => {
        const confirmButton = shadowRoot.querySelector(`.${confirmButtonClass}`);
        const clickEvent = new CustomEvent('click', { bubbles: true });

        confirmButton.dispatchEvent(clickEvent);
        expect(callbackSpy).to.have.been.calledOnce;
      });
    });

    describe('onCancel callback prop', () => {
      const callbackSpy = sinon.spy();
      const tmpDefinition = (<Editing onCancel={callbackSpy} />);

      beforeEach(() => createTemporary(define, createDefinition(tmpDefinition))
        .then(setupLocalVariables));

      it('should be called when cancel button is clicked', () => {
        const cancelButton = shadowRoot.querySelector(`.${cancelButtonClass}`);
        const clickEvent = new CustomEvent('click', { bubbles: true });

        cancelButton.dispatchEvent(clickEvent);
        expect(callbackSpy).to.have.been.calledOnce;
      });
    });
  });
});
