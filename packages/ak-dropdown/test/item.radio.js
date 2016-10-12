import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Item from '../src/index.item.radio';
import 'custom-event-polyfill';
import { waitUntil, getShadowRoot, afterMutations, getRootNode } from 'akutil-common-test';
import shadowItemStyles from '../src/less/shadow-item.less';
import { props } from 'skatejs';
import supportsVoiceOver from '../src/internal/supportsVoiceOver';
import { itemHeight, itemLeftToDefaultGap, itemLeftGap } from './_helpers';

const role = supportsVoiceOver ? 'radio' : 'menuitemradio';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-dropdown-item-radio', () => {
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

    it('should have menuitemradio role', () => {
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
        height => (expect(Math.round(height)).to.equal(itemHeight)),
        done
      );
    });

    it(`gap between radio and left edge of the component should be ${itemLeftGap}`, (done) => {
      const rectComponent = getRootNode(component).getBoundingClientRect();
      const rectIcon = iconDomElem.getBoundingClientRect();
      const gap = rectIcon.left - rectComponent.left;

      afterMutations(
        () => (expect(Math.round(gap)).to.equal(itemLeftGap)),
        done
      );
    });

    it(`gap between radio and default slot should be ${itemLeftToDefaultGap}`, (done) => {
      const rectDefault = defaultDomElem.getBoundingClientRect();
      const rectIcon = iconDomElem.getBoundingClientRect();
      const gap = rectDefault.left - rectIcon.left - rectIcon.width;

      afterMutations(
        () => (expect(Math.round(gap)).to.equal(itemLeftToDefaultGap)),
        done
      );
    });
  });
});
