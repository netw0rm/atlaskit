import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import keyCode from 'keycode';
import { props } from 'skatejs';
import 'custom-event-polyfill';
import { waitUntil, getShadowRoot } from 'akutil-common-test';

import { name } from '../package.json';
import { events as dropdownEvents } from '../src';
import Item from '../src/index.item';


chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe(name, () => {
  describe('ak-dropdown-item', () => {
    let itemContainer;

    beforeEach(() => {
      itemContainer = document.createElement('div');
      itemContainer.style.width = '300px';
      document.body.appendChild(itemContainer);
    });

    afterEach(() => {
      document.body.removeChild(itemContainer);
    });

    describe('general behavior', () => {
      let component;

      beforeEach(() => {
        component = new Item();
        itemContainer.appendChild(component);
        return waitUntil(() => getShadowRoot(component));
      });

      it('should be possible to create a component', () => {
        // testing to see that skate did its job as expected
        // (in case some breaking changes in it affect rendering)
        expect(getShadowRoot(component)).to.be.defined;
        expect(getShadowRoot(component).firstChild).to.be.defined;
      });

      it(`click on a component should emit ${dropdownEvents.item.activated} event`, () => {
        const clickSpy = sinon.spy();
        itemContainer.addEventListener(dropdownEvents.item.activated, clickSpy);
        getShadowRoot(component).firstChild.click();

        expect(clickSpy.called).to.equal(true);
      });

      it(`click on a disabled component should NOT emit ${dropdownEvents.item.activated} event`,
        () => {
          const clickSpy = sinon.spy();
          itemContainer.addEventListener(dropdownEvents.item.activated, clickSpy);
          props(component, { disabled: true });
          getShadowRoot(component).firstChild.click();

          expect(clickSpy.called).to.equal(false);
        });
    });

    describe('links', () => {
      let component;
      let componentDomElem;

      beforeEach(() => {
        component = `<ak-dropdown-item href="#foo" target="_blank">
          <div>some text</div>
        </ak-dropdown-item>`;
        itemContainer.innerHTML = component;

        return waitUntil(() =>
          itemContainer.firstChild.getAttribute('defined') !== null
        ).then(() => {
          component = itemContainer.firstChild;
          componentDomElem = getShadowRoot(component).firstChild;
        });
      });

      it('href is matched on the link', () => {
        expect(componentDomElem.getAttribute('href')).to.equal('#foo');
      });

      it('target is matched on the link', () => {
        expect(componentDomElem.getAttribute('target')).to.equal('_blank');
      });
    });

    describe('keyboard events', () => {
      const eventsMap = {
        up: dropdownEvents.item.up,
        down: dropdownEvents.item.down,
        space: dropdownEvents.item.activated,
        enter: dropdownEvents.item.activated,
        tab: dropdownEvents.item.tab,
      };
      let component;
      let event;
      let calledSpy;

      beforeEach(() => {
        component = new Item();
        itemContainer.appendChild(component);
        event = new CustomEvent('keydown', {
          bubbles: true,
          cancelable: true,
        });

        calledSpy = sinon.spy();
        return waitUntil(() => getShadowRoot(component));
      });

      afterEach(() => {
        calledSpy.reset();
      });

      Object.keys(eventsMap).forEach((key) => {
        it(`keypress event on the ${key} key should emit ${eventsMap[key]} event`, () => {
          event.keyCode = keyCode(key);
          itemContainer.addEventListener(eventsMap[key], calledSpy);
          getShadowRoot(component).firstChild.dispatchEvent(event);

          expect(calledSpy.called).to.equal(true);
        });
      });

      it(`${dropdownEvents.item.activated} event should not be emitted on a disabled element`, () => {
        event.keyCode = keyCode('enter');
        itemContainer.addEventListener(eventsMap.enter, calledSpy);
        props(component, { disabled: true });
        getShadowRoot(component).firstChild.dispatchEvent(event);

        expect(calledSpy.called).to.equal(false);
      });
    });
  });
});
