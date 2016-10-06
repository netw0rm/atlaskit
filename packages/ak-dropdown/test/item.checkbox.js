import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { events as dropdownEvents } from '../src';
import Item from '../src/index.item.checkbox';
import keyCode from 'keycode';
import { props } from 'skatejs';
import 'custom-event-polyfill';
import { waitUntil, getShadowRoot, afterMutations, getRootNode } from 'akutil-common-test';
import shadowItemStyles from '../src/less/shadow-item.less';
import supportsVoiceOver from '../src/internal/supportsVoiceOver';
import { itemHeight, itemLeftToDefaultGap, itemLeftGap } from './_helpers';
const role = supportsVoiceOver ? 'checkbox' : 'menuitemcheckbox';

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

    it('should have menuitemcheckbox role', () => {
      expect(getRootNode(component).getAttribute('role')).to.equal(role);
    });

    it('should have `aria-checked` when selected', () => {
      expect(getRootNode(component).getAttribute('aria-checked')).to.equal('false');
      props(component, { selected: true });
      expect(getRootNode(component).getAttribute('aria-checked')).to.equal('true');
    });

    it('should have `aria-disabled` when disabled', () => {
      expect(getRootNode(component).getAttribute('aria-disabled')).to.equal(null);
      props(component, { disabled: true });
      expect(getRootNode(component).getAttribute('aria-disabled')).to.equal('true');
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

    it(`height should be equal ${itemHeight}`, (done) => {
      afterMutations(
        () => getRootNode(component).getBoundingClientRect().height,
        (height) => (expect(Math.round(height)).to.equal(itemHeight)),
        done
      );
    });

    it(`gap between checkbox and left edge of the component should be ${itemLeftGap}`, (done) => {
      const rectComponent = getRootNode(component).getBoundingClientRect();
      const rectIcon = iconDomElem.getBoundingClientRect();
      const gap = rectIcon.left - rectComponent.left;

      afterMutations(
        () => (expect(Math.round(gap)).to.equal(itemLeftGap)),
        done
      );
    });

    it(`gap between checkbox and default slot should be ${itemLeftToDefaultGap}`, (done) => {
      const rectDefault = defaultDomElem.getBoundingClientRect();
      const rectIcon = iconDomElem.getBoundingClientRect();
      const gap = rectDefault.left - rectIcon.left - rectIcon.width;

      afterMutations(
        () => (expect(Math.round(gap)).to.equal(itemLeftToDefaultGap)),
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
