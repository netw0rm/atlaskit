import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Trigger from '../src/trigger.js';
import keyCode from 'keycode';
import { symbols } from 'skatejs';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-dropdown-trigger:', () => {
  describe('general behavior:', () => {
    let component;
    let triggerContainer;

    beforeEach(() => {
      component = new Trigger();
      triggerContainer = document.createElement('div');
      triggerContainer.appendChild(component);
    });
    it('should be possible to create a component', (done) => {
      // testing to see that skate did its job as expected
      // (in case some breaking changes in it that affect rendering)
      setTimeout(() => {
        expect(component.tagName.toLowerCase()).to.equal('ak-dropdown-trigger');
        expect(component[symbols.shadowRoot]).to.be.defined;
        expect(component[symbols.shadowRoot].firstChild).to.be.defined;
      });
      setTimeout(done);
    });

    it('click on a component should emit `ak-dropdown-trigger-activated` event', (done) => {
      const onclick = sinon.spy();
      triggerContainer.appendChild(component);
      triggerContainer.addEventListener('ak-dropdown-trigger-activated', onclick);

      setTimeout(() => component[symbols.shadowRoot].firstChild.click());
      setTimeout(() => expect(onclick.called).to.equal(true));
      setTimeout(done);
    });
  });
  describe('keyboard events:', () => {
    // this is a map for consistency with 'item' tests
    // also they are the same for now, but it's possible its going to change
    const eventsMap = {
      down: 'ak-dropdown-trigger-activated',
      space: 'ak-dropdown-trigger-activated',
      enter: 'ak-dropdown-trigger-activated',
    };
    let component;
    let itemContainer;
    let event;

    beforeEach(() => {
      component = new Trigger();
      itemContainer = document.createElement('div');
      itemContainer.appendChild(component);
      event = new CustomEvent('keydown', {
        bubbles: true,
        cancelable: true,
      });
    });
    Object.keys(eventsMap).forEach((key) => {
      it(`keypress event on the ${key} key should emit ${eventsMap[key]} event`, (done) => {
        event.keyCode = keyCode(key);
        const called = sinon.spy();
        itemContainer.addEventListener(eventsMap[key], called);
        setTimeout(() => {
          component[symbols.shadowRoot].firstChild.dispatchEvent(event);
        });
        setTimeout(() => expect(called.called).to.be.true);
        setTimeout(() => done());
      });

      it('activated event should not be emitted on a disabled element', (done) => {
        component.disabled = true;
        event.keyCode = keyCode('enter');
        const called = sinon.spy();
        itemContainer.addEventListener(eventsMap[key], called);
        setTimeout(() => {
          component[symbols.shadowRoot].firstChild.dispatchEvent(event);
        });
        setTimeout(() => expect(called.called).to.be.false);
        setTimeout(() => done());
      });
    });
  });
});
