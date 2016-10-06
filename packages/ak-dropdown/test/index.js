import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Dropdown, * as exports from '../src';
import keyCode from 'keycode';
import { props, emit, Component } from 'skatejs';
import { name } from '../package.json';
import { afterMutations, getShadowRoot, checkVisibility, waitUntil } from 'akutil-common-test';
import { selected as selectedEvent,
  unselected as unselectedEvent, item as itemEvents } from '../src/internal/events';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

function initComponent(setup) {
  const component = new Dropdown();
  setup(component);

  const componentHasShadowRoot = () => !!getShadowRoot(component);
  document.body.appendChild(component);
  return waitUntil(componentHasShadowRoot).then(() => component);
}

const testDropdownItems = `
  <ak-dropdown-item>124</ak-dropdown-item>
  <ak-dropdown-item>444</ak-dropdown-item>
`;

function setupComponentExample(content = testDropdownItems) {
  return initComponent(component => {
    component.innerHTML = `
      <ak-dropdown-trigger-button slot="trigger">test</ak-dropdown-trigger-button>
      ${content}
    `;
  });
}

function tearDownComponent(component) {
  document.body.removeChild(component);
}

function clickDropdownTrigger(component) {
  getShadowRoot(component.querySelector('[slot="trigger"]')).firstChild.click();
}

function pressDropdownTrigger(component) {
  const event = new CustomEvent('keydown', {
    bubbles: true,
    cancelable: true,
  });
  event.keyCode = keyCode('enter');
  getShadowRoot(component.querySelector('[slot="trigger"]')).firstChild.dispatchEvent(event);
}

function checkSelectedItems(items, ...index) {
  [...items].forEach((el, i) => {
    if (index.indexOf(i) > -1) {
      expect(items[i].selected).to.equal(true);
    } else {
      expect(items[i].selected).to.equal(false);
    }
  });
}

describe('ak-dropdown', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      (new Dropdown).should.be.an.instanceof(Component);
    });

    it('should have an sub-components exports', () => {
      (new exports.DropdownTrigger).should.be.an.instanceof(Component);
      (new exports.DropdownTriggerButton).should.be.an.instanceof(Component);
    });

    it('should have an events export with defined events', () => {
      const eventsArray = ['selected', 'unselected', 'afterOpen', 'afterClose', 'item', 'trigger'];
      exports.events.should.be.defined;
      Object.keys(exports.events).should.be.deep.equal(eventsArray);
      Object.keys(exports.events.item).should.be.deep.equal(['up', 'down', 'tab']);
      Object.keys(exports.events.trigger).should.be.deep.equal(['activated']);
    });

    it('should not be okay to mess with event exports', () => {
      Object.isFrozen(exports.events.item).should.be.true;
      Object.isFrozen(exports.events.trigger).should.be.true;
    });
  });

  describe('general behavior', () => {
    let component;
    let shadowRoot;

    beforeEach(() => setupComponentExample().then(newComponent => {
      component = newComponent;
      shadowRoot = getShadowRoot(component);
    }));
    afterEach(() => tearDownComponent(component));

    it('should be possible to create a component', () => {
      // testing to see that skate did its job as expected
      // (in case some breaking changes in it that affect rendering)
      expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
      expect(getShadowRoot(component)).to.be.defined;
      expect(getShadowRoot(component).firstChild).to.be.defined;
    });

    it('open property controls open state', () => {
      props(component, { open: false });
      expect(checkVisibility(component.children[1])).to.equal(false);
      props(component, { open: true });
      expect(checkVisibility(component.children[0])).to.equal(true);
    });

    it('click on the dropdown should open it', () => {
      clickDropdownTrigger(component);
      expect(component.open).to.equal(true);
    });

    it('keypress on the dropdown should open it', () => {
      pressDropdownTrigger(component);
      expect(component.open).to.equal(true);
    });

    it('when the dropdown is open all the elements should have correct properties', () => {
      props(component, { open: true });
      expect(component.children[1].first).to.equal(true);
      expect(component.children[2].last).to.equal(true);
    });

    it('trigger item should in sync when the dropdown`s open state', () => {
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

    it('if the dropdown was open via click the first element should be not focused', () => {
      clickDropdownTrigger(component);
      expect(component.children[1].focused).to.equal(false);
    });

    it('if the dropdown was open via keydown the first element should be focused', () => {
      pressDropdownTrigger(component);
      expect(component.children[1].focused).to.equal(true);
    });

    it('three clicks leaves the dropdown open with items in it', () => {
      props(component, { open: true });
      props(component, { open: false });
      props(component, { open: true });
      expect(component.open).to.equal(true);
      expect(checkVisibility(component.children[1])).to.equal(true);
    });

    it('click outside of the dropdown should close it', () => {
      props(component, { open: true });
      expect(component.open).to.equal(true);
      document.body.click();
      expect(component.open).to.equal(false);
    });

    it('position is reflected to inner layer', (done) => {
      // we can't just do querySelector('ak-layer') here, ak-layer is defined a few times
      // and doesn't have a nice clear tag name anymore
      let layer;
      props(component, { open: true });
      afterMutations(
        () => (layer = shadowRoot.firstChild.childNodes[1]),
        () => (expect(layer.position).to.equal('bottom left')),
        () => (component.position = 'top left'),
        () => (expect(layer.position).to.equal('top left')),
        done
      );
    });
  });

  describe('two dropdowns', () => {
    let component1;
    let component2;

    beforeEach(() =>
      Promise.all([setupComponentExample(), setupComponentExample()])
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

  describe('select item', () => {
    let component;
    let items;
    const html = `<ak-dropdown-item>first</ak-dropdown-item>
                  <ak-dropdown-item>second</ak-dropdown-item>
                  <ak-dropdown-item>third</ak-dropdown-item>`;
    beforeEach(() => setupComponentExample(html).then(newComponent => {
      component = newComponent;
      props(component, { open: true });
      items = component.querySelectorAll('ak-dropdown-item');
    }));
    afterEach(() => tearDownComponent(component));

    it('should be possible to select an item', (done) => {
      const item = items[0];

      // mock the event from the item
      emit(item, selectedEvent, { detail: { item } });

      afterMutations(
        () => expect(items[0].selected).to.equal(true),
        done
      );
    });

    it('only one item should be selected', (done) => {
      // mock the event from the item
      emit(items[0], selectedEvent, { detail: { item: items[0] } });
      emit(items[1], selectedEvent, { detail: { item: items[1] } });

      afterMutations(
        () => checkSelectedItems(items, 1),
        done
      );
    });
  });

  describe('select checkbox items', () => {
    let component;
    let items;
    const html = `<ak-dropdown-item-checkbox>first</ak-dropdown-item-checkbox>
                  <ak-dropdown-item-checkbox>second</ak-dropdown-item-checkbox>
                  <ak-dropdown-item-checkbox>third</ak-dropdown-item-checkbox>`;
    beforeEach(() => setupComponentExample(html).then(newComponent => {
      component = newComponent;
      props(component, { open: true });
      items = component.querySelectorAll('ak-dropdown-item-checkbox');
    }));
    afterEach(() => tearDownComponent(component));

    it('should be possible to select an item', (done) => {
      const item = items[0];

      // mock the event from the item
      emit(item, selectedEvent, { detail: { item } });

      afterMutations(
        () => expect(items[0].selected).to.equal(true),
        done
      );
    });

    it('any checkbox item can be selected and unselected simultaneously', (done) => {
      // mock the event from the item
      emit(items[0], selectedEvent, { detail: { item: items[0] } });
      emit(items[2], selectedEvent, { detail: { item: items[2] } });

      afterMutations(
        () => checkSelectedItems(items, 0, 2),
        () => emit(items[2], unselectedEvent, { detail: { item: items[2] } }),
        () => checkSelectedItems(items, 0),
        () => emit(items[0], unselectedEvent, { detail: { item: items[0] } }),
        () => checkSelectedItems(items),
        done
      );
    });
  });

  describe('select radio items', () => {
    let component;
    let group1;
    let group2;
    let groups;
    const html = `<ak-dropdown-group>
                    <ak-dropdown-item-radio>first</ak-dropdown-item-radio>
                    <ak-dropdown-item-radio>second</ak-dropdown-item-radio>
                    <ak-dropdown-item-radio>third</ak-dropdown-item-radio>
                  </ak-dropdown-group>
                  <ak-dropdown-group>
                    <ak-dropdown-item-radio>first</ak-dropdown-item-radio>
                    <ak-dropdown-item-radio>second</ak-dropdown-item-radio>
                    <ak-dropdown-item-radio>third</ak-dropdown-item-radio>
                  </ak-dropdown-group>`;
    beforeEach(() => setupComponentExample(html).then(newComponent => {
      component = newComponent;
      props(component, { open: true });
      groups = component.querySelectorAll('ak-dropdown-group');
      group1 = groups[0].children;
      group2 = groups[1].children;
    }));
    afterEach(() => tearDownComponent(component));

    it('should be possible to select an item', (done) => {
      const item = group1[0];

      // mock the event from the item
      emit(item, selectedEvent, { detail: { item } });

      afterMutations(
        () => expect(item.selected).to.equal(true),
        done
      );
    });

    it('only one item inside a group should be selected', (done) => {
      // mock the event from the item
      emit(group1[0], selectedEvent, { detail: { item: group1[0] } });
      emit(group1[1], selectedEvent, { detail: { item: group1[1] } });

      afterMutations(
        () => checkSelectedItems(group1, 1),
        done
      );
    });

    it('should be possible to select items in different groups', (done) => {
      // mock the event from the item
      emit(group1[0], selectedEvent, { detail: { item: group1[0] } });
      emit(group2[0], selectedEvent, { detail: { item: group2[0] } });

      afterMutations(
        () => checkSelectedItems(group1, 0),
        () => checkSelectedItems(group2, 0),
        done
      );
    });
  });

  describe('focus behavior', () => {
    let component;
    const html = `<ak-dropdown-item>first</ak-dropdown-item>
                  <ak-dropdown-item>second</ak-dropdown-item>
                  <ak-dropdown-item>third</ak-dropdown-item>
                  <ak-dropdown-item hidden>first</ak-dropdown-item>
                  <ak-dropdown-item hidden>second</ak-dropdown-item>
                  <ak-dropdown-item>third</ak-dropdown-item>`;
    beforeEach(() => setupComponentExample(html).then(newComponent => {
      component = newComponent;
      pressDropdownTrigger(component);
    }));
    afterEach(() => tearDownComponent(component));

    it('should be possible to focus next item', () => {
      expect(component.children[1].focused).to.equal(true);

      emit(component, itemEvents.down);
      expect(component.children[1].focused).to.equal(false);
      expect(component.children[2].focused).to.equal(true);

      emit(component, itemEvents.down);
      expect(component.children[1].focused).to.equal(false);
      expect(component.children[2].focused).to.equal(false);
      expect(component.children[3].focused).to.equal(true);
    });

    it('should be possible to focus previous item', () => {
      emit(component, itemEvents.down);
      emit(component, itemEvents.down);
      emit(component, itemEvents.up);
      expect(component.children[3].focused).to.equal(false);
      expect(component.children[2].focused).to.equal(true);
      emit(component, itemEvents.up);
      expect(component.children[3].focused).to.equal(false);
      expect(component.children[2].focused).to.equal(false);
      expect(component.children[1].focused).to.equal(true);
    });

    it('if there are no previous items the focus should stay on the first item', () => {
      emit(component, itemEvents.down);
      emit(component, itemEvents.up);
      emit(component, itemEvents.up);
      emit(component, itemEvents.up);
      expect(component.children[1].focused).to.equal(true);
      expect(component.children[1].first).to.equal(true);
    });

    it('if there are no next items the focus should stay on the last item', () => {
      props(component.children[1], { focused: false });
      props(component.children[6], { focused: true });
      emit(component, itemEvents.down);
      emit(component, itemEvents.down);
      expect(component.children[6].focused).to.equal(true);
      expect(component.children[6].last).to.equal(true);
    });

    it('all the focus movements should skip hidden items', () => {
      props(component.children[1], { focused: false });
      props(component.children[3], { focused: true });
      emit(component, itemEvents.down);
      expect(component.children[6].focused).to.equal(true);
      emit(component, itemEvents.up);
      expect(component.children[6].focused).to.equal(false);
      expect(component.children[3].focused).to.equal(true);
    });
  });
});
