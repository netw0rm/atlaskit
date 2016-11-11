import { waitUntil, getShadowRoot } from 'akutil-common-test';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import { Component } from 'skatejs';

import ModalDialog, { events } from '../src';
import { setupComponent, tearDownComponent } from './_helpers';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

describe('ak-modal-dialog', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      (new ModalDialog()).should.be.an.instanceof(Component);
    });

    it('should have an events export with defined events', () => {
      events.should.be.defined;
      Object.keys(events).should.be.deep.equal([
        'willClose',
      ]);
    });
  });

  describe('props', () => {
    let component;
    let shadowRoot;
    let dialogIsVisible;
    let dialogIsNotVisible;

    beforeEach(() => setupComponent(ModalDialog).then((newComponent) => {
      component = newComponent;
      shadowRoot = getShadowRoot(component);
      dialogIsVisible = () => (shadowRoot.innerHTML !== '');
      dialogIsNotVisible = () => (shadowRoot.innerHTML === '');
    }));
    afterEach(() => tearDownComponent(component));

    describe('open prop', () => {
      it('should be hidden by default', () => {
        dialogIsVisible().should.equal(false);
      });
      it('should be visible when open = true', () => {
        component.open = true;
        return waitUntil(dialogIsVisible).should.be.fulfilled;
      });
      it('should become hidden when open changed from true -> false', () => {
        component.open = true;
        return waitUntil(dialogIsVisible)
        .then(() => { component.open = false; })
        .then(waitUntil.bind(null, dialogIsNotVisible))
        .should.be.fulfilled;
      });
    });
  });
});
