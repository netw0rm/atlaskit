import 'custom-event-polyfill';
import { waitUntil, getShadowRoot } from 'akutil-common-test';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import { Component } from 'skatejs';

import FieldBase, { events } from '../src';
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
    editModeWrapper: editModeWrapperClass,
    viewModeWrapper: viewModeWrapperClass,
    editConfirm: confirmButtonClass,
    editCancel: cancelButtonClass,
    label: labelClass,
    labelText: labelTextClass,
    hidden: hiddenClass,
    editButtonFocused: editmodeFocusClass,
    focused: viewmodeFocusClass,
    waitingSpinner: spinnerClass,
    invalid: invalidClass,
    editButton: editButtonClass,
  } = shadowStyles.locals;

  const inEditmodeView = () => (shadowRoot.querySelector(`.${editModeWrapperClass}`) !== null);
  const inViewmodeView = () => (shadowRoot.querySelector(`.${viewModeWrapperClass}`) !== null);

  beforeEach(() => setupComponent().then((newComponent) => {
    component = newComponent;
    shadowRoot = getShadowRoot(component);
  }));
  afterEach(() => tearDownComponent(component));

  describe('exports', () => {
    it('should export a base component', () => {
      (new FieldBase()).should.be.an.instanceof(Component);
    });

    it('should have an events export with defined events', () => {
      events.should.be.defined;
      Object.keys(events).should.be.deep.equal([
        'exitViewingView',
        'exitEditingView',
      ]);
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

  describe('editing prop', () => {
    it('should be reflected', () => {
      const newEditingValue = true; // false by default
      // check the negative case first
      expect(inViewmodeView()).to.be.true;
      expect(inEditmodeView()).to.be.false;

      component.editing = newEditingValue;

      return waitUntil(inEditmodeView)
        .then(() => {
          expect(inViewmodeView()).to.be.false;
        }).should.be.fulfilled;
    });
  });

  describe('focused prop', () => {
    it('should be reflected whilst in viewmode', () => {
      const focusReflected = () => (shadowRoot.querySelector(`.${viewmodeFocusClass}`) !== null);
      expect(focusReflected()).to.be.false;

      component.focused = true;
      return waitUntil(focusReflected).should.be.fulfilled;
    });

    it('should be reflected whilst in editmode', () => {
      // we don't actually have to worry about putting the component in editmode as we no longer
      // selectively render the two views, we just hide them.
      const focusReflected = () => (shadowRoot.querySelector(`.${editmodeFocusClass}`) !== null);
      expect(focusReflected()).to.be.false;

      component.focused = true;
      return waitUntil(focusReflected).should.be.fulfilled;
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

  describe('waiting prop', () => {
    it('should be reflected', () => {
      const waitingReflected = () => (shadowRoot.querySelector(`.${spinnerClass}`) !== null);
      expect(waitingReflected()).to.be.false;

      component.waiting = true;
      return waitUntil(waitingReflected).should.be.fulfilled;
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

  describe('viewmode editButton', () => {
    let editButton;

    beforeEach(() => {
      editButton = shadowRoot.querySelector(`.${editButtonClass}`);
    });

    it('should fire the exitViewingView event when clicked', () => {
      const callbackSpy = sinon.spy();
      const clickEvent = new CustomEvent('click', { bubbles: true });

      document.body.addEventListener(events.exitViewingView, callbackSpy);
      editButton.dispatchEvent(clickEvent);
      expect(callbackSpy).to.be.calledOnce;
      document.body.removeEventListener(events.exitViewingView, callbackSpy);
    });

    it('should switch to editmode if not cancelled', () => {
      const clickEvent = new CustomEvent('click', { bubbles: true });
      expect(inEditmodeView()).to.be.false;

      editButton.dispatchEvent(clickEvent);

      return waitUntil(inEditmodeView).should.be.fulfilled;
    });

    it('should not switch to editmode if cancelled', () => {
      const clickEvent = new CustomEvent('click', { bubbles: true });
      const preventDefault = e => (e.preventDefault());

      document.body.addEventListener(events.exitViewingView, preventDefault);
      editButton.dispatchEvent(clickEvent);
      document.body.removeEventListener(events.exitViewingView, preventDefault);

      // we'll wait to check if the editing mode becomes visible
      let timeIsUp = false;
      setTimeout(() => (timeIsUp = true), 100);

      return waitUntil(() => timeIsUp).then(() => {
        // now make sure we arent in viewmode
        expect(inEditmodeView()).to.be.false;
      }).should.be.fulfilled;
    });
  });

  const editModeButtons = {
    confirm: confirmButtonClass,
    cancel: cancelButtonClass,
  };
  Object.keys(editModeButtons).forEach((button) => {
    describe(`${button} button`, () => {
      let firingButton;
      const firingButtonClass = editModeButtons[button];
      const shouldPassCancelledFlag = button === 'cancel';

      beforeEach(() => {
        // set up some references
        firingButton = shadowRoot.querySelector(`.${firingButtonClass}`);
        // now set up the component (need to be in editing mode to click confirm button)
        component.editing = true;
        return waitUntil(inEditmodeView);
      });

      it('should fire exitEditingView when clicked', () => {
        const callbackSpy = sinon.spy();
        const clickEvent = new CustomEvent('click');

        document.body.addEventListener(events.exitEditingView, callbackSpy);
        firingButton.dispatchEvent(clickEvent);
        expect(callbackSpy).to.be.calledOnce;
        document.body.removeEventListener(events.exitEditingView, callbackSpy);
      });

      it(`should ${shouldPassCancelledFlag ? '' : ' not '} pass cancelled when clicked`, () => {
        const clickEvent = new CustomEvent('click');
        const callback = (e) => {
          expect(!!e.detail.cancelButtonPressed).to.equal(shouldPassCancelledFlag);
        };
        const callbackSpy = sinon.spy(callback);

        document.body.addEventListener(events.exitEditingView, callbackSpy);
        firingButton.dispatchEvent(clickEvent);
        expect(callbackSpy).to.be.calledOnce;
        document.body.removeEventListener(events.exitEditingView, callbackSpy);
      });

      it('should switch to viewing mode if not cancelled', () => {
        const clickEvent = new CustomEvent('click');
        firingButton.dispatchEvent(clickEvent);

        return waitUntil(inViewmodeView).should.be.fulfilled;
      });

      it('should not switch to viewing mode if cancelled', () => {
        const clickEvent = new CustomEvent('click');
        // cancels any event passed to it
        const preventDefault = e => (e.preventDefault());

        document.body.addEventListener(events.exitEditingView, preventDefault);
        firingButton.dispatchEvent(clickEvent);
        document.body.removeEventListener(events.exitEditingView, preventDefault);

        // we'll wait to check if the viewing mode becomes visible
        let timeIsUp = false;
        setTimeout(() => (timeIsUp = true), 100);

        return waitUntil(() => timeIsUp).then(() => {
          // now make sure we arent in viewmode
          expect(inViewmodeView()).to.be.false;
        }).should.be.fulfilled;
      });
    });
  });
});
