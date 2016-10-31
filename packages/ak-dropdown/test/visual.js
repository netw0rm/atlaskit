import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { props } from 'skatejs';
import { tearDownComponent } from 'akutil-common-test';

import { initDropdown,
  itemHeight, itemLeftToDefaultGap, itemLeftGap, getPaddings } from './_helpers';
import shadowItemStyles from '../src/less/shadow-item.less';

const defaultClass = shadowItemStyles.locals.itemDefaultPosition;
const leftPositionClass = shadowItemStyles.locals.itemLeftPosition;

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('sizes, paddings and margins', () => {
  describe('dropdown item', () => {
    let component;
    let item;

    describe('sizing for a simple item:', () => {
      beforeEach(() => initDropdown().then((newComponent) => {
        component = newComponent;
        props(component, { open: true });
        item = newComponent.children[1];
      }));
      afterEach(() => tearDownComponent(component));

      it(`height should be equal ${itemHeight}`, () => {
        expect(item.getBoundingClientRect().height).to.equal(itemHeight);
      });

      it(`height should be equal ${itemHeight} even if the content is very long`, () => {
        item.innerHTML = `test text test texttest texttest texttest texttest
       texttest texttest texttest texttest texttest texttest text`;

        expect(item.getBoundingClientRect().height).to.equal(itemHeight);
      });

      it(`gap between default slot and left edge of the component should be ${itemLeftGap}`, () => {
        const parentContainer = item.shadowRoot.firstChild;
        const testedContainer = item.shadowRoot.querySelector(`.${defaultClass}`);
        expect(getPaddings(parentContainer, testedContainer).left).to.equal(itemLeftGap);
      });

      it(`gap between default slot and right edge should be at least ${itemLeftGap}`, () => {
        item.innerHTML = `<div>test text test texttest texttest texttest texttest
           texttest texttest texttest texttest texttest texttest text</div>`;
        const parentContainer = item.shadowRoot.firstChild;
        const testedContainer = item.shadowRoot.querySelector(`.${defaultClass}`);
        expect(getPaddings(parentContainer, testedContainer).right >= itemLeftGap).to.equal(true);
      });
    });

    describe('sizing for an item with slotted left', () => {
      beforeEach(() => initDropdown([
        { id: 'DropdownTriggerButton', value: 'Trigger test' },
        { id: 'Item', value: '<div slot="left">1</div> Item 1' },
      ]).then((newComponent) => {
        component = newComponent;
        props(component, { open: true });
        item = newComponent.children[1];
      }));
      afterEach(() => tearDownComponent(component));

      it(`height should be equal ${itemHeight} even if the left slot is not empty`, () => {
        expect(item.getBoundingClientRect().height).to.equal(itemHeight);
      });

      it(`gap between left slot and left edge of the component should be ${itemLeftGap}`, () => {
        const parentContainer = item.shadowRoot.firstChild;
        const testedContainer = item.shadowRoot.querySelector(`.${leftPositionClass}`);
        expect(getPaddings(parentContainer, testedContainer).left).to.equal(itemLeftGap);
      });

      it(`gap between left slot and default slot should be ${itemLeftToDefaultGap}`, () => {
        const leftContainer = item.shadowRoot.querySelector(`.${leftPositionClass}`);
        const defaultContainer = item.shadowRoot.querySelector(`.${defaultClass}`);

        expect(getPaddings(leftContainer, defaultContainer).between).to.equal(itemLeftToDefaultGap);
      });
    });
  });
});
