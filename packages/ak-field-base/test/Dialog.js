import { vdom, define } from 'skatejs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {
  createTemporaryComponent as createTemporary,
  tearDownComponent,
  getShadowRoot,
  locateWebComponent,
} from 'akutil-common-test';


import Dialog from '../src/Dialog';
import { createDefinition } from './_helpers';

chai.use(chaiAsPromised);
chai.should();


describe('ak-field-base', () => {
  describe('Dialog', () => {
    let component;
    let shadowRoot;
    let inlineDialog;

    function getInlineDialog() {
      return locateWebComponent('ak-inline-dialog', shadowRoot)[0];
    }

    const setupLocalVariables = (newComponent) => {
      component = newComponent;
      shadowRoot = getShadowRoot(newComponent);
      inlineDialog = getInlineDialog();
    };

    afterEach(() => tearDownComponent(component));

    describe('by default', () => {
      const tmpDefinition = (<Dialog />);

      beforeEach(() => createTemporary(define, createDefinition(tmpDefinition))
        .then(setupLocalVariables));

      it('should be possible to create a Root', () => {
        shadowRoot.should.not.be.undefined;
      });

      it('should render an inline dialog element', () => {
        inlineDialog.should.not.be.undefined;
      });
    });

    describe('open prop', () => {
      const tmpDefinition = (<Dialog open />);

      beforeEach(() => createTemporary(define, createDefinition(tmpDefinition))
        .then(setupLocalVariables));

      it('should be reflected in the inline dialog element', () => {
        expect(inlineDialog.open).to.equal(true);
      });
    });
  });
});
