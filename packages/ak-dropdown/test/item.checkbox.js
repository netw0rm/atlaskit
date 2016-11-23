import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { props } from 'skatejs';
import 'custom-event-polyfill';
import { waitUntil, getShadowRoot, getRootNode } from 'akutil-common-test';
import Checkbox from 'ak-icon/glyph/checkbox';

import { name } from '../package.json';
import ItemOriginal from '../src/index.item';
import Item from '../src/index.item.checkbox';
import supportsVoiceOver from '../src/internal/supportsVoiceOver';
import shadowItemStyles from '../src/less/shadow-item.less';

const leftPositionClass = shadowItemStyles.locals.itemLeftPosition;
const role = supportsVoiceOver ? 'checkbox' : 'menuitemcheckbox';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe.skip(name, () => {
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

      it('should be an instance of the dropdown-item component', () => {
        expect(component instanceof ItemOriginal).to.equal(true);
      });

      it('should have menuitemcheckbox role', () => {
        expect(getRootNode(component).getAttribute('role')).to.equal(role);
      });

      it('should have `aria-checked` when checked', () => {
        expect(getRootNode(component).getAttribute('aria-checked')).to.equal('false');
        props(component, { checked: true });
        expect(getRootNode(component).getAttribute('aria-checked')).to.equal('true');
      });

      it('should have `aria-disabled` when disabled', () => {
        expect(getRootNode(component).getAttribute('aria-disabled')).to.equal(null);
        props(component, { disabled: true });
        expect(getRootNode(component).getAttribute('aria-disabled')).to.equal('true');
      });

      it('should render checkbox icon', () => {
        const icon = component.shadowRoot.querySelector(`.${leftPositionClass}`).firstChild;
        expect(icon).to.not.be.null;
        expect(icon instanceof Checkbox).to.equal(true);
      });
    });
  });
});
