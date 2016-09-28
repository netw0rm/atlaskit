import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { events as dropdownEvents } from '../src';
import Item from '../src/index.item.checkbox';
import keyCode from 'keycode';
import { props } from 'skatejs';
import 'custom-event-polyfill';
import { waitUntil, getShadowRoot, afterMutations, getRootNode } from 'akutil-common-test';
import shadowItemStyles from '../src/less/shadow-item.less';

const defaultHeight = 30;
const defaultGap = 10;

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-dropdown-item-checkbox', () => {
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

    it('click on a selected component should emit `unselected` event', () => {
      const clickSpy = sinon.spy();
      itemContainer.addEventListener(dropdownEvents.unselected, clickSpy);
      props(component, { selected: true });
      getShadowRoot(component).firstChild.click();

      expect(clickSpy.called).to.equal(true);
    });
  });

  describe('sizing for an item', () => {
    let component;
    let iconDomElem;
    let defaultDomElem;
    const iconClass = `.${shadowItemStyles.locals.itemLeftPosition}`;

    beforeEach(() => {
      component = new Item();
      itemContainer.appendChild(component);
      component.innerHTML = 'test';

      // wait until the component is rendered
      return waitUntil(() => getShadowRoot(component)).then(() => {
        iconDomElem = getShadowRoot(component).querySelector(iconClass);
        defaultDomElem = getShadowRoot(component).querySelector('slot,content').parentNode;
      });
    });

    it(`height should be equal ${defaultHeight}`, (done) => {
      afterMutations(
        () => getRootNode(component).getBoundingClientRect().height,
        (height) => (expect(Math.round(height)).to.equal(defaultHeight)),
        done
      );
    });

    it(`gap between checkbox and left edge of the component should be ${defaultGap}`, (done) => {
      const rectComponent = getRootNode(component).getBoundingClientRect();
      const rectIcon = iconDomElem.getBoundingClientRect();
      const gap = rectIcon.left - rectComponent.left;

      afterMutations(
        () => (expect(Math.round(gap)).to.equal(defaultGap)),
        done
      );
    });

    it(`gap between checkbox and default slot should be ${defaultGap}`, (done) => {
      const rectDefault = defaultDomElem.getBoundingClientRect();
      const rectIcon = iconDomElem.getBoundingClientRect();
      const gap = rectDefault.left - rectIcon.left - rectIcon.width;

      afterMutations(
        () => (expect(Math.round(gap)).to.equal(defaultGap)),
        done
      );
    });
  });

  describe('keyboard events', () => {
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

    it('unselected event should be emitted on a selected checkbox element', () => {
      event.keyCode = keyCode('enter');
      itemContainer.addEventListener(dropdownEvents.unselected, calledSpy);
      props(component, { selected: true });
      getShadowRoot(component).firstChild.dispatchEvent(event);
      expect(calledSpy.called).to.equal(true);
    });
  });
});
