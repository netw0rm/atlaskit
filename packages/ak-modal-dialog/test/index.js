import { waitUntil, getShadowRoot } from 'akutil-common-test';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import { Component } from 'skatejs';

import MyComponent, { events } from '../src';
import { setupComponent, tearDownComponent } from './_helpers';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

const expect = chai.expect;


describe('ak-modal-dialog', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      (new MyComponent).should.be.an.instanceof(Component);
    });

    it('should have an events export with defined events', () => {
      events.should.be.defined;
      Object.keys(events).should.be.deep.equal([
        'announceName',
        'announceClick',
      ]);
    });
  });

  describe('logic', () => {
    let component;
    let shadowRoot;

    beforeEach(() => setupComponent(MyComponent).then(newComponent => {
      component = newComponent;
      shadowRoot = getShadowRoot(component);
    }));
    afterEach(() => tearDownComponent(component));

    it('should be possible to create a component', () => {
      expect(shadowRoot.innerHTML).to.match(/My name is .+?!/);
    });

    describe('name prop', () => {
      it('should modify the rendered name', () => {
        const newName = 'InigoMontoya';
        const expectedInnerHTML = `My name is ${newName}!`;
        const paragraph = shadowRoot.querySelector('p');

        const nameHasBeenModifiedCorrectly = () => (paragraph.innerHTML === expectedInnerHTML);

        component.name = newName;

        // here we can wrap our assertions in promises and just check that the promise was fulfilled
        return waitUntil(nameHasBeenModifiedCorrectly).should.be.fulfilled;
      });
    });
  });
});
