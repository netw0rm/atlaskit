import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Item, events as dropdownEvents } from '../src';
import keyCode from 'keycode';
import { symbols, props } from 'skatejs';
import 'custom-event-polyfill';

const defaultHeight = 30;
const defaultGap = 10;

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-dropdown-item', () => {
  let itemContainer;

  beforeEach((done) => {
    itemContainer = document.createElement('div');
    itemContainer.style.width = '300px';
    document.body.appendChild(itemContainer);
    setTimeout(done);
  });

  afterEach(() => {
    document.body.removeChild(itemContainer);
  });

  describe('general behavior', () => {
    let component;

    beforeEach((done) => {
      component = new Item();
      itemContainer.appendChild(component);
      setTimeout(done);
    });

    it('should be possible to create a component', () => {
      // testing to see that skate did its job as expected
      // (in case some breaking changes in it affect rendering)
      expect(component[symbols.shadowRoot]).to.be.defined;
      expect(component[symbols.shadowRoot].firstChild).to.be.defined;
    });

    it('click on a component should emit `selected` event', () => {
      const clickSpy = sinon.spy();
      itemContainer.addEventListener('ak-dropdown-selected', clickSpy);
      component[symbols.shadowRoot].firstChild.click();

      expect(clickSpy.called).to.equal(true);
    });

    it('click on a disabled component should NOT emit `selected` event', () => {
      const clickSpy = sinon.spy();
      itemContainer.addEventListener('ak-dropdown-selected', clickSpy);
      props(component, { disabled: true });
      component[symbols.shadowRoot].firstChild.click();

      expect(clickSpy.called).to.equal(false);
    });

    it('click on a selected component should NOT emit `selected` event', () => {
      const clickSpy = sinon.spy();
      itemContainer.addEventListener('ak-dropdown-selected', clickSpy);
      props(component, { selected: true });
      component[symbols.shadowRoot].firstChild.click();

      expect(clickSpy.called).to.equal(false);
    });
  });

  describe('sizing for a simple item:', () => {
    let component;
    let componentDomElem;

    beforeEach((done) => {
      component = '<ak-dropdown-item><div>some text</div></ak-dropdown-item>';
      itemContainer.innerHTML = component;
      setTimeout(() => {
        component = itemContainer.firstChild;
        componentDomElem = component[symbols.shadowRoot].firstChild;
        done();
      });
    });

    it(`height should be equal ${defaultHeight}`, () => {
      expect(componentDomElem.getBoundingClientRect().height).to.equal(defaultHeight);
    });

    it(`height should be equal ${defaultHeight} even if the content is very long`, () => {
      component.innerHTML = `test text test texttest texttest texttest texttest
       texttest texttest texttest texttest texttest texttest text`;

      expect(componentDomElem.getBoundingClientRect().height).to.equal(defaultHeight);
    });

    it(`gap between default slot and left edge of the component should be ${defaultGap}`, () => {
      const rectComponent = component[symbols.shadowRoot].firstChild.getBoundingClientRect();
      const rectDiv = component.childNodes[0].getBoundingClientRect();
      const gapLeft = rectDiv.left - rectComponent.left;

      expect(gapLeft).to.equal(defaultGap);
    });

    it(`gap between default slot and right edge should be at least ${defaultGap}`, () => {
      component.innerHTML = `<div>test text test texttest texttest texttest texttest
      texttest texttest texttest texttest texttest texttest text</div>`;
      const rectComponent = component[symbols.shadowRoot].firstChild.getBoundingClientRect();
      const rectDiv = component.childNodes[0].getBoundingClientRect();
      const gapRight = rectComponent.left + rectComponent.width - rectDiv.left - rectDiv.width;

      expect(gapRight).to.equal(defaultGap);
    });
  });

  describe('sizing for an item with slotted left (like avatars)', () => {
    let component;
    let componentDomElem;

    beforeEach((done) => {
      const html = '<div slot="left" style="height:40px;width:40px;"></div><div>some text</div>';
      component = `<ak-dropdown-item>${html}</ak-dropdown-item>`;
      itemContainer.innerHTML = component;

      // wait until the component is rendered
      setTimeout(() => {
        component = itemContainer.firstChild;
        componentDomElem = component[symbols.shadowRoot].firstChild;
        done();
      });
    });

    it(`height should be equal ${defaultHeight} even if the left slot is not empty`, () => {
      expect(componentDomElem.getBoundingClientRect().height).to.equal(defaultHeight);
    });

    it(`gap between left slot and left edge of the component should be ${defaultGap}`, () => {
      const rectComponent = component[symbols.shadowRoot].firstChild.getBoundingClientRect();
      const rectDiv = component.firstChild.getBoundingClientRect();
      const gap = rectDiv.left - rectComponent.left;

      expect(gap).to.equal(defaultGap);
    });

    it(`gap between left slot and default slot should be ${defaultGap}`, () => {
      const rectSlot = component.childNodes[0].getBoundingClientRect();
      const rectDefault = component.childNodes[1].getBoundingClientRect();
      const gap = rectDefault.left - rectSlot.left - rectSlot.width;

      expect(gap).to.equal(defaultGap);
    });
  });

  describe('keyboard events', () => {
    const eventsMap = {
      up: dropdownEvents.item.up,
      down: dropdownEvents.item.down,
      space: dropdownEvents.selected,
      enter: dropdownEvents.selected,
      tab: dropdownEvents.item.tab,
    };
    let component;
    let event;
    let calledSpy;

    beforeEach((done) => {
      component = new Item();
      itemContainer.appendChild(component);
      event = new CustomEvent('keydown', {
        bubbles: true,
        cancelable: true,
      });
      document.body.appendChild(itemContainer);
      calledSpy = sinon.spy();
      setTimeout(done);
    });

    Object.keys(eventsMap).forEach((key) => {
      it(`keypress event on the ${key} key should emit ${eventsMap[key]} event`, () => {
        event.keyCode = keyCode(key);
        itemContainer.addEventListener(eventsMap[key], calledSpy);
        component[symbols.shadowRoot].firstChild.dispatchEvent(event);

        expect(calledSpy.called).to.equal(true);
      });

      it('selected event should not be emitted on a disabled element', () => {
        event.keyCode = keyCode('enter');
        itemContainer.addEventListener(eventsMap[key], calledSpy);
        props(component, { disabled: true });
        component[symbols.shadowRoot].firstChild.dispatchEvent(event);

        expect(calledSpy.called).to.equal(false);
      });

      it('selected event should not be emitted on a selected element', () => {
        event.keyCode = keyCode('enter');
        itemContainer.addEventListener(eventsMap[key], calledSpy);
        props(component, { selected: true });
        component[symbols.shadowRoot].firstChild.dispatchEvent(event);

        expect(calledSpy.called).to.equal(false);
      });
    });
  });
});
