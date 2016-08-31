import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Item, EVENTS as DROPDOWN_EVENTS } from '../src';
import keyCode from 'keycode';
import { symbols } from 'skatejs';
import 'custom-event-polyfill';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-dropdown-item', () => {
  describe('general behavior', () => {
    let component;
    let itemContainer;
    beforeEach(() => {
      component = new Item();
      itemContainer = document.createElement('div');
      itemContainer.appendChild(component);
      document.body.appendChild(itemContainer);
    });
    afterEach(() => {
      document.body.removeChild(itemContainer);
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

    it('click on a component should emit `selected` event', (done) => {
      const clickSpy = sinon.spy();
      itemContainer.appendChild(component);
      itemContainer.addEventListener(DROPDOWN_EVENTS.SELECTED, clickSpy);

      setTimeout(() => component[symbols.shadowRoot].firstChild.click());
      setTimeout(() => expect(clickSpy.called).to.equal(true));
      setTimeout(() => done());
    });
  });
  describe('keyboard events', () => {
    const eventsMap = {
      up: DROPDOWN_EVENTS.ITEM_UP,
      down: DROPDOWN_EVENTS.ITEM_DOWN,
      space: DROPDOWN_EVENTS.SELECTED,
      enter: DROPDOWN_EVENTS.SELECTED,
      tab: DROPDOWN_EVENTS.ITEM_TAB,
    };
    let component;
    let itemContainer;
    let event;

    beforeEach(() => {
      component = new Item();
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
        let called = false;
        itemContainer.addEventListener(eventsMap[key], () => (called = true));
        setTimeout(() => {
          component[symbols.shadowRoot].firstChild.dispatchEvent(event);
        });
        setTimeout(() => expect(called).to.be.true);
        setTimeout(() => done());
      });

      it('selected event should not be emitted on a disabled element', (done) => {
        component.disabled = true;
        event.keyCode = keyCode('enter');
        let called = false;
        itemContainer.addEventListener(eventsMap[key], () => (called = true));
        setTimeout(() => {
          component[symbols.shadowRoot].firstChild.dispatchEvent(event);
        });
        setTimeout(() => expect(called).to.be.false);
        setTimeout(() => done());
      });

      it('selected event should not be emitted on a selected element', (done) => {
        component.selected = true;
        event.keyCode = keyCode('enter');
        let called = false;
        itemContainer.addEventListener(eventsMap[key], () => (called = true));
        setTimeout(() => {
          component[symbols.shadowRoot].firstChild.dispatchEvent(event);
        });
        setTimeout(() => expect(called).to.be.false);
        setTimeout(() => done());
      });
    });
  });
});
