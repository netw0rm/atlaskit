import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { props, emit, Component } from 'skatejs';
import { afterMutations, tearDownComponent, checkVisibility } from 'akutil-common-test';

import { name } from '../package.json';
import Dropdown, * as exports from '../src';
import { initDropdown, clickDropdownTrigger, pressDropdownTrigger } from './_helpers';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-dropdown', () => {
  describe('basic defaults', () => {
    it('should export a base component', () => {
      (new Dropdown()).should.be.an.instanceof(Component);
    });

    it('should have sub-components exports', () => {
      const exp = ['events', 'Item', 'CheckboxItem', 'RadioItem', 'Group', 'DropdownTrigger', 'DropdownTriggerButton', 'DropdownTriggerArrow', 'default'];
      (new exports.DropdownTrigger()).should.be.an.instanceof(Component);
      (new exports.DropdownTriggerButton()).should.be.an.instanceof(Component);
      (new exports.DropdownTriggerArrow()).should.be.an.instanceof(Component);
      (new exports.Item()).should.be.an.instanceof(Component);
      (new exports.CheckboxItem()).should.be.an.instanceof(Component);
      (new exports.RadioItem()).should.be.an.instanceof(Component);
      (new exports.Group()).should.be.an.instanceof(Component);

      Object.keys(exports).should.be.deep.equal(exp);
    });

    it('should have an events export with defined events', () => {
      const evArr = ['changeBefore', 'changeAfter', 'openBefore', 'openAfter', 'closeBefore', 'closeAfter', 'item', 'trigger'];
      exports.events.should.be.defined;
      Object.keys(exports.events).should.be.deep.equal(evArr);
      Object.keys(exports.events.item).should.be.deep.equal(['up', 'down', 'tab', 'activated']);
      Object.keys(exports.events.trigger).should.be.deep.equal(['activated']);
    });

    it('should not be okay to mess with event exports', () => {
      Object.isFrozen(exports.events.item).should.be.true;
      Object.isFrozen(exports.events.trigger).should.be.true;
    });

    it('should be possible to create a component', () => initDropdown().then((component) => {
      // testing to see that skate did its job as expected
      // (in case some breaking changes in it that affect rendering)
      expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
      expect(component.shadowRoot).to.be.defined;
      expect(component.shadowRoot.firstChild).to.be.defined;
      tearDownComponent(component);
    }));
  });

  describe('open/close behavior of the dropdown', () => {
    let component;

    beforeEach(() => initDropdown().then((newComponent) => {
      component = newComponent;
    }));
    afterEach(() => tearDownComponent(component));

    it('open = false, dropdown should be closed', () => {
      props(component, { open: false });
      expect(checkVisibility(component.children[1])).to.equal(false);
    });

    it('open = true, dropdown should be open', () => {
      props(component, { open: true });
      expect(checkVisibility(component.children[1])).to.equal(true);
    });

    it('sequence of opening and closing should not mess with the dropdown', () => {
      // duplication is intentional here, do not delete
      props(component, { open: true });
      props(component, { open: false });
      props(component, { open: true });
      expect(checkVisibility(component.children[1])).to.equal(true);
      props(component, { open: false });
      props(component, { open: false });
      props(component, { open: true });
      props(component, { open: true });
      expect(checkVisibility(component.children[1])).to.equal(true);
      props(component, { open: false });
      props(component, { open: false });
      expect(checkVisibility(component.children[1])).to.equal(false);
    });

    it('click on the dropdown should open it', () => {
      clickDropdownTrigger(component);
      expect(component.open).to.equal(true);
      clickDropdownTrigger(component);
      expect(component.open).to.equal(false);
      clickDropdownTrigger(component);
      expect(component.open).to.equal(true);
    });

    it('pressing enter on the dropdown should open it', () => {
      pressDropdownTrigger(component, 'enter');
      expect(component.open).to.equal(true);
      pressDropdownTrigger(component, 'enter');
      expect(component.open).to.equal(false);
      pressDropdownTrigger(component, 'enter');
      expect(component.open).to.equal(true);
    });

    it('pressing space on the dropdown should open it', () => {
      pressDropdownTrigger(component, 'space');
      expect(component.open).to.equal(true);
      pressDropdownTrigger(component, 'space');
      expect(component.open).to.equal(false);
      pressDropdownTrigger(component, 'space');
      expect(component.open).to.equal(true);
    });

    it('click outside of the dropdown should close it', () => {
      props(component, { open: true });
      expect(component.open).to.equal(true);
      document.body.click();
      expect(component.open).to.equal(false);
    });

    it('trigger button item should in sync with the dropdown`s open state', () => {
      props(component, { open: true });
      expect(component.children[0].opened).to.equal(true);
      props(component, { open: false });
      expect(component.children[0].opened).to.equal(false);
      clickDropdownTrigger(component);
      expect(component.children[0].opened).to.equal(true);
      clickDropdownTrigger(component);
      expect(component.children[0].opened).to.equal(false);
      pressDropdownTrigger(component);
      expect(component.children[0].opened).to.equal(true);
      pressDropdownTrigger(component);
      expect(component.children[0].opened).to.equal(false);
    });

    it('position is reflected to inner layer', () => {
      props(component, { open: true });
      const layer = component.shadowRoot.firstChild.childNodes[1];
      expect(layer.position).to.equal('bottom left');
      props(component, { position: 'top left' });
      expect(layer.position).to.equal('top left');
    });
  });

  describe('when the dropdown is open', () => {
    let component;

    beforeEach(() => initDropdown().then((newComponent) => {
      component = newComponent;
    }));
    afterEach(() => tearDownComponent(component));

    it('the first item should have `first` property set to true', () => {
      props(component, { open: true });
      expect(component.children[1].first).to.equal(true);
    });

    it('the last item should have `last` property set to true', () => {
      props(component, { open: true });
      expect(component.children[2].last).to.equal(true);
    });

    it('the first item should have `focused` property if the dropdown was opened via keyboard', () => {
      pressDropdownTrigger(component);
      expect(component.children[1].focused).to.equal(true);
    });

    it('the first item should NOT have `focused` property if the dropdown was opened via click', () => {
      clickDropdownTrigger(component);
      expect(component.children[1].focused).to.equal(false);
    });
  });

  describe('dropdown`s events', () => {
    let component;
    let detail;
    const spy = sinon.spy();
    const prevent = (e) => {
      e.preventDefault();
    };
    const detailsCheck = (e) => {
      detail = e.detail;
    };

    beforeEach(() => initDropdown().then((newComponent) => {
      component = newComponent;
      spy.reset();
      detail = undefined;
    }));
    afterEach(() => tearDownComponent(component));

    describe(`${exports.events.openBefore} event`, () => {
      it('should be emited before the dropdown was open', () => {
        document.addEventListener(exports.events.openBefore, spy);
        pressDropdownTrigger(component);
        expect(spy.called).to.equal(true);
        expect(spy.calledOnce).to.equal(true);
        document.removeEventListener(exports.events.openBefore, spy);
      });

      it('should be cancellable', () => {
        document.addEventListener(exports.events.openBefore, prevent);
        pressDropdownTrigger(component);
        expect(component.open).to.equal(false);
        document.removeEventListener(exports.events.openBefore, prevent);
      });

      it('should have the dropdown in the detail of the event', () => {
        document.addEventListener(exports.events.openBefore, detailsCheck);
        pressDropdownTrigger(component);
        expect(detail).to.equal(component);
        document.removeEventListener(exports.events.openBefore, detailsCheck);
      });
    });

    describe(`${exports.events.openAfter} event`, () => {
      it('should be emited after the dropdown was open', () => {
        document.addEventListener(exports.events.openAfter, spy);
        pressDropdownTrigger(component);
        expect(spy.called).to.equal(true);
        expect(spy.calledOnce).to.equal(true);
        document.removeEventListener(exports.events.openAfter, spy);
      });

      it('should NOT be cancellable', () => {
        document.addEventListener(exports.events.openAfter, prevent);
        pressDropdownTrigger(component);
        expect(component.open).to.equal(true);
        document.removeEventListener(exports.events.openAfter, prevent);
      });

      it('should have the dropdown in the detail of the event', () => {
        document.addEventListener(exports.events.openAfter, detailsCheck);
        pressDropdownTrigger(component);
        expect(detail).to.equal(component);
        document.removeEventListener(exports.events.openAfter, detailsCheck);
      });
    });

    describe(`${exports.events.closeBefore} event`, () => {
      it('should be emited before the dropdown was closed', () => {
        document.addEventListener(exports.events.closeBefore, spy);
        pressDropdownTrigger(component);
        pressDropdownTrigger(component);
        expect(spy.called).to.equal(true);
        expect(spy.calledOnce).to.equal(true);
        document.removeEventListener(exports.events.closeBefore, spy);
      });

      it('should be cancellable', () => {
        document.addEventListener(exports.events.closeBefore, prevent);
        pressDropdownTrigger(component);
        pressDropdownTrigger(component);
        expect(component.open).to.equal(true);
        document.removeEventListener(exports.events.closeBefore, prevent);
      });

      it('should have the dropdown in the detail of the event', () => {
        document.addEventListener(exports.events.closeBefore, detailsCheck);
        pressDropdownTrigger(component);
        pressDropdownTrigger(component);
        expect(detail).to.equal(component);
        document.removeEventListener(exports.events.closeBefore, detailsCheck);
      });
    });

    describe(`${exports.events.closeAfter} event`, () => {
      it('should be emited after the dropdown was closed', () => {
        document.addEventListener(exports.events.closeAfter, spy);
        pressDropdownTrigger(component);
        pressDropdownTrigger(component);
        expect(spy.called).to.equal(true);
        expect(spy.calledOnce).to.equal(true);
        document.removeEventListener(exports.events.closeAfter, spy);
      });

      it('should NOT be cancellable', () => {
        document.addEventListener(exports.events.closeAfter, prevent);
        pressDropdownTrigger(component);
        pressDropdownTrigger(component);
        expect(component.open).to.equal(false);
        document.removeEventListener(exports.events.closeAfter, prevent);
      });

      it('should have the dropdown in the detail of the event', () => {
        document.addEventListener(exports.events.closeAfter, detailsCheck);
        pressDropdownTrigger(component);
        pressDropdownTrigger(component);
        expect(detail).to.equal(component);
        document.removeEventListener(exports.events.closeAfter, detailsCheck);
      });
    });

    describe(`${exports.events.changeBefore} event`, () => {
      it('should be emited before an item was activated/checked', () => {
        props(component, { open: true });
        document.addEventListener(exports.events.changeBefore, spy);
        emit(component, exports.events.item.activated, { detail: { item: component.children[1] } });

        expect(spy.called).to.equal(true);
        expect(spy.calledOnce).to.equal(true);
        document.removeEventListener(exports.events.changeBefore, spy);
      });

      it('should be cancellable', () => {
        props(component, { open: true });
        document.addEventListener(exports.events.changeBefore, prevent);
        emit(component, exports.events.item.activated, { detail: { item: component.children[1] } });

        // the default behaviour for the simple item activation is just closing the dropdown
        // which means that if the component is still open then the event was cancelled
        expect(component.open).to.equal(true);
        document.removeEventListener(exports.events.changeBefore, prevent);
      });

      it('should have the item in the detail of the event', () => {
        props(component, { open: true });
        const item = component.children[1];
        document.addEventListener(exports.events.changeBefore, detailsCheck);
        emit(component, exports.events.item.activated, { detail: { item } });

        expect(detail).to.equal(item);
        document.removeEventListener(exports.events.changeBefore, detailsCheck);
      });
    });

    describe(`${exports.events.changeAfter} event`, () => {
      it('should be emited after an item was activated/checked', () => {
        props(component, { open: true });
        document.addEventListener(exports.events.changeAfter, spy);
        emit(component, exports.events.item.activated, { detail: { item: component.children[1] } });

        expect(spy.called).to.equal(true);
        expect(spy.calledOnce).to.equal(true);
        document.removeEventListener(exports.events.changeAfter, spy);
      });

      it('should NOT be cancellable', () => {
        props(component, { open: true });
        document.addEventListener(exports.events.changeAfter, prevent);
        emit(component, exports.events.item.activated, { detail: { item: component.children[1] } });

        // the default behaviour for the simple item activation is just closing the dropdown
        // which means that if the component is closed then the event was not cancelled
        expect(component.open).to.equal(false);
        document.removeEventListener(exports.events.changeAfter, prevent);
      });

      it('should have the item in the detail of the event', () => {
        props(component, { open: true });
        const item = component.children[1];
        document.addEventListener(exports.events.changeAfter, detailsCheck);
        emit(component, exports.events.item.activated, { detail: { item } });

        expect(detail).to.equal(item);
        document.removeEventListener(exports.events.changeAfter, detailsCheck);
      });
    });
  });

  describe('two dropdowns', () => {
    let component1;
    let component2;

    beforeEach(() =>
      Promise.all([initDropdown(), initDropdown()])
        .then(([c1, c2]) => {
          component1 = c1;
          component2 = c2;
        }));
    afterEach(() => {
      tearDownComponent(component1);
      tearDownComponent(component2);
    });

    it('dropdowns are mutually exclusively openable via mouse', (done) => {
      afterMutations(
        () => (clickDropdownTrigger(component1)),
        () => (clickDropdownTrigger(component2)),
        () => (expect(component1.open).to.equal(false)),
        () => (expect(component2.open).to.equal(true)),
        done
      );
    });
  });

  describe('focus behavior', () => {
    let component;
    const dropOptions = [
      { id: 'DropdownTriggerButton', value: 'Trigger test' },
      { id: 'Item', value: 'Item 1' },
      { id: 'Item', value: 'Item 2' },
      { id: 'Group',
        children: [
          { id: 'Item', value: 'Item 3' },
          { id: 'Item', value: 'Item 4' },
          { id: 'Item', value: 'Item 5' },
        ],
      },
      { id: 'Group',
        children: [
          { id: 'Item', value: 'Item 6' },
          { id: 'Item', value: 'Item 7' },
          { id: 'Item', value: 'Item 8' },
        ],
      },
    ];
    beforeEach(() => initDropdown(dropOptions).then((newComponent) => {
      component = newComponent;
      pressDropdownTrigger(component);
    }));
    afterEach(() => tearDownComponent(component));

    it('should be possible to focus next item', () => {
      expect(component.children[1].focused).to.equal(true);

      emit(component, exports.events.item.down);
      expect(component.children[1].focused).to.equal(false);
      expect(component.children[2].focused).to.equal(true);

      emit(component, exports.events.item.down);
      expect(component.children[1].focused).to.equal(false);
      expect(component.children[2].focused).to.equal(false);
      expect(component.children[3].children[0].focused).to.equal(true);
    });

    it('should be possible to focus previous item', () => {
      emit(component, exports.events.item.down);
      emit(component, exports.events.item.down);

      emit(component, exports.events.item.up);
      expect(component.children[3].children[0].focused).to.equal(false);
      expect(component.children[2].focused).to.equal(true);

      emit(component, exports.events.item.up);
      expect(component.children[3].children[0].focused).to.equal(false);
      expect(component.children[2].focused).to.equal(false);
      expect(component.children[1].focused).to.equal(true);
    });

    it('if there are no previous items the focus should stay on the first item', () => {
      emit(component, exports.events.item.down);
      emit(component, exports.events.item.up);
      emit(component, exports.events.item.up);
      emit(component, exports.events.item.up);
      expect(component.children[1].focused).to.equal(true);
      expect(component.children[1].first).to.equal(true);
    });

    it('if there are no next items the focus should stay on the last item', () => {
      props(component.children[1], { focused: false });
      props(component.children[4].children[2], { focused: true });
      emit(component, exports.events.item.down);
      emit(component, exports.events.item.down);
      expect(component.children[4].children[2].focused).to.equal(true);
      expect(component.children[4].children[2].last).to.equal(true);
    });
  });

  describe('focus behavior with hidden items', () => {
    let component;
    const dropOptions = [
      { id: 'DropdownTriggerButton', value: 'Trigger test' },
      { id: 'Item', value: 'Item 1', props: { hidden: true } },
      { id: 'Item', value: 'Item 2' },
      { id: 'Group',
        children: [
          { id: 'Item', value: 'Item 3', props: { hidden: true } },
          { id: 'Item', value: 'Item 4', props: { hidden: true } },
          { id: 'Item', value: 'Item 5' },
        ],
      },
      { id: 'Group',
        children: [
          { id: 'Item', value: 'Item 6' },
          { id: 'Item', value: 'Item 7', props: { hidden: true } },
          { id: 'Item', value: 'Item 8', props: { hidden: true } },
        ],
      },
    ];
    beforeEach(() => initDropdown(dropOptions).then((newComponent) => {
      component = newComponent;
      pressDropdownTrigger(component);
    }));
    afterEach(() => tearDownComponent(component));

    it('should be possible to focus next item', () => {
      // TODO: uncomment when AK-665 (1) is fixed
      // expect(component.children[1].focused).to.equal(false);
      // expect(component.children[2].focused).to.equal(true);
      emit(component, exports.events.item.down); // TODO: remove this when the AK-665 (1) is fixed

      emit(component, exports.events.item.down);
      expect(component.children[2].focused).to.equal(false);
      expect(component.children[3].children[2].focused).to.equal(true);

      emit(component, exports.events.item.down);
      expect(component.children[2].focused).to.equal(false);
      expect(component.children[3].children[2].focused).to.equal(false);
      expect(component.children[4].children[0].focused).to.equal(true);
    });

    it('should be possible to focus previous item', () => {
      props(component.children[1], { focused: false });
      props(component.children[3].children[2], { focused: true });

      emit(component, exports.events.item.up);
      expect(component.children[3].children[2].focused).to.equal(false);
      expect(component.children[3].children[1].focused).to.equal(false);
      expect(component.children[3].children[0].focused).to.equal(false);
      expect(component.children[2].focused).to.equal(true);
    });

    // TODO: uncomment when the AK-665 (2) is fixed
    // it('if there are no previous items the focus should stay on the first visible item', () => {
    //   props(component.children[1], { focused: false });
    //   props(component.children[3].children[2], { focused: true });
    //
    //   emit(component, exports.events.item.up);
    //   emit(component, exports.events.item.up);
    //   emit(component, exports.events.item.up);
    //   expect(component.children[2].focused).to.equal(true);
    //   expect(component.children[1].focused).to.equal(false);
    // });

    // TODO: uncomment when the AK-665 (3) is fixed
    // it('if there are no next items the focus should stay on the last item', () => {
    //   props(component.children[1], { focused: false });
    //   props(component.children[3].children[2], { focused: true });
    //   emit(component, exports.events.item.down);
    //   emit(component, exports.events.item.down);
    //   emit(component, exports.events.item.down);
    //
    //   expect(component.children[3].children[2].focused).to.equal(false);
    //   expect(component.children[4].children[0].focused).to.equal(true);
    // });
  });

  describe('dropdown with checkbox items', () => {
    let component;
    const dropOptions = [
      { id: 'DropdownTriggerButton', value: 'Trigger test' },
      { id: 'Group',
        children: [
          { id: 'CheckboxItem', value: 'Item 3', props: { checked: true } },
          { id: 'CheckboxItem', value: 'Item 4' },
          { id: 'CheckboxItem', value: 'Item 5' },
        ],
      },
      { id: 'Group',
        children: [
          { id: 'CheckboxItem', value: 'Item 6' },
          { id: 'CheckboxItem', value: 'Item 7' },
          { id: 'CheckboxItem', value: 'Item 8', props: { checked: true } },
        ],
      },
    ];

    beforeEach(() => initDropdown(dropOptions).then((newComponent) => {
      component = newComponent;
      pressDropdownTrigger(component);
    }));
    afterEach(() => tearDownComponent(component));

    it(`item should be checked/unchecked when the ${exports.events.item.activated} event is fired`,
      () => {
        const item = component.children[1].children[0];
        expect(item.checked).to.equal(true);
        emit(component, exports.events.item.activated, { detail: { item } });
        expect(item.checked).to.equal(false);
        emit(component, exports.events.item.activated, { detail: { item } });
        expect(item.checked).to.equal(true);
      });

    it('checking of an item should not affect other items',
      () => {
        const item1 = component.children[1].children[0];
        const item2 = component.children[1].children[1];
        const item3 = component.children[2].children[0];
        const item4 = component.children[2].children[2];

        emit(component, exports.events.item.activated, { detail: { item: item2 } });
        expect(item1.checked).to.equal(true);
        expect(item2.checked).to.equal(true);
        expect(item3.checked).to.equal(false);
        expect(item4.checked).to.equal(true);
      });

    it('should be possible to check any number of items', () => {
      const item1 = component.children[1].children[1];
      const item2 = component.children[1].children[2];
      const item3 = component.children[2].children[0];

      emit(component, exports.events.item.activated, { detail: { item: item1 } });
      expect(item1.checked).to.equal(true);

      emit(component, exports.events.item.activated, { detail: { item: item2 } });
      expect(item2.checked).to.equal(true);

      emit(component, exports.events.item.activated, { detail: { item: item3 } });
      expect(item3.checked).to.equal(true);
    });
  });

  describe('dropdown with radio items', () => {
    let component;
    const dropOptions = [
      { id: 'DropdownTriggerButton', value: 'Trigger test' },
      { id: 'Group',
        children: [
          { id: 'RadioItem', value: 'Item 3', props: { checked: true } },
          { id: 'RadioItem', value: 'Item 4' },
          { id: 'RadioItem', value: 'Item 5' },
        ],
      },
      { id: 'Group',
        children: [
          { id: 'RadioItem', value: 'Item 6' },
          { id: 'RadioItem', value: 'Item 7' },
          { id: 'RadioItem', value: 'Item 8', props: { checked: true } },
        ],
      },
    ];

    beforeEach(() => initDropdown(dropOptions).then((newComponent) => {
      component = newComponent;
      pressDropdownTrigger(component);
    }));
    afterEach(() => tearDownComponent(component));

    it(`item should stay checked when the ${exports.events.item.activated} event is fired`,
      () => {
        const item = component.children[1].children[0];
        expect(item.checked).to.equal(true);
        emit(component, exports.events.item.activated, { detail: { item } });
        expect(item.checked).to.equal(true);
        emit(component, exports.events.item.activated, { detail: { item } });
        expect(item.checked).to.equal(true);
      });

    it('checking of an item should uncheck other items in this group',
      () => {
        const group = component.children[1];

        emit(component, exports.events.item.activated, { detail: { item: group.children[2] } });
        expect(group.children[0].checked).to.equal(false);
        expect(group.children[1].checked).to.equal(false);
        expect(group.children[2].checked).to.equal(true);
      });

    it('checking of an item should not affect items in the other groups',
      () => {
        const group1 = component.children[1];
        const group2 = component.children[2];

        emit(component, exports.events.item.activated, { detail: { item: group1.children[2] } });
        expect(group2.children[0].checked).to.equal(false);
        expect(group2.children[1].checked).to.equal(false);
        expect(group2.children[2].checked).to.equal(true);
      });
  });
});
