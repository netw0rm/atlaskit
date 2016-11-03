import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { props } from 'skatejs';
import { tearDownComponent } from 'akutil-common-test';

import { dropdownMinWidth, dropdownMaxWidth, dropdownMaxHeight } from '../src/internal/consts';

import { initDropdown,
  itemHeight, itemLeftToDefaultGap, itemLeftGap, getPaddings } from './_helpers';
import shadowItemStyles from '../src/less/shadow-item.less';
import shadowListStyles from '../src/less/shadow-list.less';

const defaultClass = shadowItemStyles.locals.itemDefaultPosition;
const leftPositionClass = shadowItemStyles.locals.itemLeftPosition;
const dropClass = shadowListStyles.locals.list;

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

function generateBunchOfItems(num) {
  const res = [];
  for (let i = 0; i < num; i++) {
    res.push({ id: 'Item', value: 'item1' });
  }

  return res;
}

describe('sizes, paddings and margins', () => {
  describe('dropdown item', () => {
    let component;
    let item;

    afterEach(() => tearDownComponent(component));

    describe('sizing for a simple item:', () => {
      beforeEach(() => initDropdown().then((newComponent) => {
        component = newComponent;
        props(component, { open: true });
        item = newComponent.children[1];
      }));

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

    describe('sizes of the dropdown depending on the number and size of items', () => {
      it('width of the standard dropdown with the button trigger should be at least the button width + 10px', (done) => {
        initDropdown([
          { id: 'DropdownTriggerButton', value: 'Trigger test' },
          { id: 'Item', value: 'Item 1' },
        ]).then((newComponent) => {
          component = newComponent;
          props(component, { open: true });
          const trigger = component.firstChild;
          const dropItem = component.children[1];

          window.requestAnimationFrame(() => {
            expect(Math.round(trigger.getBoundingClientRect().width)).to.equal(
              Math.round(dropItem.getBoundingClientRect().width) - 10);
            done();
          });
        });
      });

      it(`width of the standard dropdown with the button trigger should not exceed ${dropdownMaxWidth}`, (done) => {
        initDropdown([
          { id: 'DropdownTriggerButton', value: 'Trigger test' },
          { id: 'Item', value: 'very long itemvery long itemvery long itemvery long itemvery long itemvery long itemvery long item' },
        ]).then((newComponent) => {
          component = newComponent;
          props(component, { open: true });
          const dropItem = component.children[1];

          window.requestAnimationFrame(() => {
            expect(Math.round(dropItem.getBoundingClientRect().width)).to.equal(dropdownMaxWidth);
            done();
          });
        });
      });

      it(`width of the standard dropdown with the buttonless trigger should be at least ${dropdownMinWidth}`, (done) => {
        initDropdown([
          { id: 'DropdownTrigger', value: 'Trigger test' },
          { id: 'Item', value: 'Item 1' },
        ]).then((newComponent) => {
          component = newComponent;
          props(component, { open: true });
          const dropItem = component.children[1];

          window.requestAnimationFrame(() => {
            expect(Math.round(dropItem.getBoundingClientRect().width)).to.equal(dropdownMinWidth);
            done();
          });
        });
      });

      it(`width of the standard dropdown with the buttonless trigger should not exceed ${dropdownMaxWidth}`, (done) => {
        initDropdown([
          { id: 'DropdownTrigger', value: 'Trigger test' },
          { id: 'Item', value: 'very long itemvery long itemvery long itemvery long itemvery long itemvery long itemvery long item' },
        ]).then((newComponent) => {
          component = newComponent;
          props(component, { open: true });
          const dropItem = component.children[1];

          window.requestAnimationFrame(() => {
            expect(Math.round(dropItem.getBoundingClientRect().width)).to.equal(dropdownMaxWidth);
            done();
          });
        });
      });

      it(`height of the standard dropdown should not exceed ${dropdownMaxHeight}`, (done) => {
        initDropdown([
          { id: 'DropdownTrigger', value: 'Trigger test' },
          ...generateBunchOfItems(11),
        ]).then((newComponent) => {
          component = newComponent;
          props(component, { open: true });
          const dropContainer = component.shadowRoot.querySelector(`.${dropClass}`);
          let height;

          window.requestAnimationFrame(() => {
            height = dropContainer.getBoundingClientRect().height;
            expect(Math.round(height)).to.equal(dropdownMaxHeight);
            done();
          });
        });
      });

      it(`height of the tall dropdown can exceed ${dropdownMaxHeight}`, (done) => {
        initDropdown([
          { id: 'DropdownTrigger', value: 'Trigger test' },
          ...generateBunchOfItems(11),
        ]).then((newComponent) => {
          component = newComponent;
          props(component, { open: true, appearance: 'tall' });
          const dropContainer = component.shadowRoot.querySelector(`.${dropClass}`);
          let height;

          window.requestAnimationFrame(() => {
            height = dropContainer.getBoundingClientRect().height;
            expect(Math.round(height) > dropdownMaxHeight).to.equal(true);
            done();
          });
        });
      });

      it('width of the fitwidth dropdown should be in sync with its target', (done) => {
        const triggerWidth = 500;
        initDropdown([
          { id: 'DropdownTrigger',
            value: `<div style="width:${triggerWidth}px">very long trigger</div>` },
          { id: 'Item', value: 'item' },
        ]).then((newComponent) => {
          component = newComponent;
          props(component, { open: true, appearance: 'fitwidth' });
          const dropItem = component.children[1];
          window.requestAnimationFrame(() => {
            expect(Math.round(dropItem.getBoundingClientRect().width)).to.equal(triggerWidth);
            done();
          });
        });
      });
    });
  });
});
