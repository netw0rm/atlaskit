import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Trigger, EVENTS as DROPDOWN_EVENTS } from '../src';
import keyCode from 'keycode';
import { symbols } from 'skatejs';
import 'custom-event-polyfill';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-dropdown-trigger', () => {
  describe('general behavior', () => {
    let component;
    let triggerContainer;

    beforeEach(() => {
      component = new Trigger();
      triggerContainer = document.createElement('div');
      triggerContainer.appendChild(component);
      document.body.appendChild(triggerContainer);
    });
    afterEach(() => {
      document.body.removeChild(triggerContainer);
    });
    it('should be possible to create a component', (done) => {
      // testing to see that skate did its job as expected
      // (in case some breaking changes in it that affect rendering)
      setTimeout(() => {
        expect(component[symbols.shadowRoot]).to.be.defined;
        expect(component[symbols.shadowRoot].firstChild).to.be.defined;
      });
      setTimeout(done);
    });

    it(`click on a component should emit '${DROPDOWN_EVENTS.TRIGGER_ACTIVATED}' event`, (done) => {
      const clickSpy = sinon.spy();
      triggerContainer.appendChild(component);
      triggerContainer.addEventListener(DROPDOWN_EVENTS.TRIGGER_ACTIVATED, clickSpy);

      setTimeout(() => component[symbols.shadowRoot].firstChild.click());
      setTimeout(() => expect(clickSpy.called).to.equal(true));
      setTimeout(done);
    });
  });
  describe('keyboard events', () => {
    // this is a map for consistency with 'item' tests
    // also they are the same for now, but it's possible its going to change
    const eventsMap = {
      down: DROPDOWN_EVENTS.TRIGGER_ACTIVATED,
      space: DROPDOWN_EVENTS.TRIGGER_ACTIVATED,
      enter: DROPDOWN_EVENTS.TRIGGER_ACTIVATED,
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
      document.body.appendChild(itemContainer);
    });
    afterEach(() => {
      document.body.removeChild(itemContainer);
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
