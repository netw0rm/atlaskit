import 'custom-event-polyfill';
import { vdom, define } from 'skatejs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import keyCode from 'keycode';
import {
  createTemporaryComponent as createTemporary,
  tearDownComponent,
  getShadowRoot,
} from 'akutil-common-test';


import Viewing from '../src/Viewing';
import shadowStyles from '../src/shadow.less';
import { createDefinition } from './_helpers';

chai.use(chaiAsPromised);
chai.should();


describe('ak-field-base', () => {
  describe('Viewing', () => {
    let component;
    let shadowRoot;

    const setupLocalVariables = (newComponent) => {
      component = newComponent;
      shadowRoot = getShadowRoot(newComponent);
    };
    const {
      viewModeWrapper: viewModeWrapperClass,
      hidden: hiddenClass,
      editButtonFocused: focusedClass,
      editButton: editButtonClass,
    } = shadowStyles.locals;

    afterEach(() => tearDownComponent(component));

    describe('by default', () => {
      const tmpDefinition = (<Viewing />);

      beforeEach(() => createTemporary(define, createDefinition(tmpDefinition))
        .then(setupLocalVariables));

      it('should be possible to create a Viewing component', () => {
        shadowRoot.should.not.be.undefined;
      });

      it('should have the viewModeWrapper class applied', () => {
        const rootNode = shadowRoot.querySelector(`.${viewModeWrapperClass}`);
        expect(rootNode).to.not.be.null;
      });

      it('should render a slot element', () => {
        const viewmodeSlot = shadowRoot.querySelector('slot[name=viewmode]');
        expect(viewmodeSlot).to.not.be.null;
      });
    });

    describe('hideViewing prop = true', () => {
      const tmpDefinition = (<Viewing hideViewing />);

      beforeEach(() => createTemporary(define, createDefinition(tmpDefinition))
        .then(setupLocalVariables));

      it('should not apply the viewModeWrapper class', () => {
        const rootNode = shadowRoot.querySelector(`.${viewModeWrapperClass}`);
        expect(rootNode).to.be.null;
      });

      it('should apply the hidden class', () => {
        const rootNode = shadowRoot.querySelector(`.${hiddenClass}`);
        expect(rootNode).to.not.be.null;
      });
    });

    describe('focused prop = true', () => {
      const tmpDefinition = (<Viewing focused />);

      beforeEach(() => createTemporary(define, createDefinition(tmpDefinition))
        .then(setupLocalVariables));

      it('should place the editButtonFocused class on the root node', () => {
        const rootNode = shadowRoot.querySelector(`.${focusedClass}`);
        expect(rootNode).to.not.be.null;
      });
    });

    describe('switchToEditingCallback prop', () => {
      const callbackSpy = sinon.spy();
      const tmpDefinition = (<Viewing switchToEditingCallback={callbackSpy} />);

      beforeEach(() => createTemporary(define, createDefinition(tmpDefinition))
        .then(setupLocalVariables));
      afterEach(() => {
        callbackSpy.reset();
      });

      it('should be called when the root div is clicked', () => {
        const rootNode = shadowRoot.querySelector(`.${viewModeWrapperClass}`);
        const clickEvent = new CustomEvent('click', {});

        rootNode.dispatchEvent(clickEvent);
        expect(callbackSpy).to.have.been.calledOnce;
      });

      it('should be called when clicking the edit button', () => {
        const editButton = shadowRoot.querySelector(`.${editButtonClass}`);
        const clickEvent = new CustomEvent('click', { bubbles: true });

        editButton.dispatchEvent(clickEvent);
        expect(callbackSpy).to.have.been.calledOnce;
      });

      it('should be called when space key pressed', () => {
        const editButton = shadowRoot.querySelector(`.${editButtonClass}`);
        const keypressEvent = new CustomEvent('keydown', { bubbles: true });
        keypressEvent.keyCode = keyCode('SPACE');

        editButton.dispatchEvent(keypressEvent);
        expect(callbackSpy).to.be.calledOnce;
      });
    });

    describe('setFocus prop', () => {
      const setFocusCallback = sinon.spy();
      const tmpDefinition = (<Viewing setFocus={setFocusCallback} />);

      beforeEach(() => createTemporary(define, createDefinition(tmpDefinition))
        .then(setupLocalVariables));

      it('should be called with `true` when button is focused on', () => {
        const editButton = shadowRoot.querySelector(`.${editButtonClass}`);
        const focusEvent = new CustomEvent('focus');

        editButton.dispatchEvent(focusEvent);
        expect(setFocusCallback).to.be.calledWith(true);
      });

      it('should be called with `false` when button is blur\'d', () => {
        const editButton = shadowRoot.querySelector(`.${editButtonClass}`);
        const focusEvent = new CustomEvent('focus');
        const blurEvent = new CustomEvent('blur');

        editButton.dispatchEvent(focusEvent);
        expect(setFocusCallback).to.be.calledWith(true);
        editButton.dispatchEvent(blurEvent);
        expect(setFocusCallback).to.be.calledWith(false);
      });
    });
  });
});
