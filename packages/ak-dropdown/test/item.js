import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Item from '../src/item.js';
import keyCode from 'keycode';
import { symbols } from 'skatejs';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-dropdown-item:', () => {
  it('should be possible to create a component', () => {
    let component;
    expect(() => (component = new Item())).not.to.throw(Error);
    expect(component.tagName.toLowerCase()).to.equal('ak-dropdown-item');
  });

  describe('keyboard events:', () => {
    const eventsMap = {
      up: 'ak-dropdown-item-up',
      down: 'ak-dropdown-item-down',
      space: 'ak-dropdown-selected',
      enter: 'ak-dropdown-selected',
      tab: 'ak-dropdown-item-tab',
    };
    let component;
    let componentParent;
    let event;

    beforeEach(() => {
      component = new Item();
      componentParent = document.createElement('div');
      componentParent.appendChild(component);
      event = new CustomEvent('keydown', {
        bubbles: true,
        cancelable: true,
      });
    });
    Object.keys(eventsMap).forEach((key) => {
      it(`keypress event on the ${key} key should emit ${eventsMap[key]} event`, (done) => {
        event.keyCode = keyCode(key);
        let called = false;
        componentParent.addEventListener(eventsMap[key], () => (called = true));
        setTimeout(() => {
          component[symbols.shadowRoot].firstChild.dispatchEvent(event);
          expect(called).to.be.true;
          done();
        }, 0);
      });

      it('selected event should not be emitted on a disabled element', (done) => {
        component.disabled = true;
        event.keyCode = keyCode('enter');
        let called = false;
        componentParent.addEventListener(eventsMap[key], () => (called = true));
        setTimeout(() => {
          component[symbols.shadowRoot].firstChild.dispatchEvent(event);
          expect(called).to.be.false;
          done();
        }, 0);
      });

      it('selected event should not be emitted on a selected element', (done) => {
        component.selected = true;
        event.keyCode = keyCode('enter');
        let called = false;
        componentParent.addEventListener(eventsMap[key], () => (called = true));
        setTimeout(() => {
          component[symbols.shadowRoot].firstChild.dispatchEvent(event);
          expect(called).to.be.false;
          done();
        }, 0);
      });
    });
  });

  // describe('keyboard events', () => {
  //   let component;
  //   let componentParent;
  //   const event = new CustomEvent('keydown', {
  //     bubbles: true,
  //     cancelable: true,
  //   });
  //   let keyPressCallback;
  //
  //   beforeEach(() => {
  //     component = new Item();
  //     componentParent = document.createElement('div');
  //     componentParent.appendChild(component);
  //     keyPressCallback = sinon.spy();
  //   });
  //
  //   it('should emit proper events on keyboard press', (done) => {
  //     event.keyCode = keyCode('up');
  //     let called = false;
  //     componentParent.addEventListener('ak-dropdown-item-up', () => {
  //       called = true;
  //     });
  //
  //     setTimeout(() => {
  //       component[symbols.shadowRoot].firstChild.dispatchEvent(event);
  //       setTimeout(() => {
  //         expect(called).to.be.true;
  //         done();
  //       }, 0);
  //     }, 0);
  //   });
  //
  //   it('should emit proper events on keyboard press', (done) => {
  //     event.keyCode = keyCode('down');
  //     let called = false;
  //     componentParent.addEventListener('ak-dropdown-item-down', () => {
  //       called = true;
  //     });
  //     debugger;
  //     setTimeout(() => {
  //       component[symbols.shadowRoot].firstChild.dispatchEvent(event);
  //       setTimeout(() => {
  //         expect(called).to.be.true;
  //         done();
  //       }, 0);
  //     }, 0);
  //   });
  // });
});
