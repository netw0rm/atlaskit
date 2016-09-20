import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Dropdown, * as exports from '../src';
import { props, emit, Component } from 'skatejs';
import { name } from '../package.json';
import { afterMutations, getShadowRoot, checkVisibility, waitUntil } from 'akutil-common-test';
import { selected as selectedEvent } from '../src/internal/events';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

function setupComponent(content) {
  const html = content || `<ak-dropdown-item>124</ak-dropdown-item>
    <ak-dropdown-item>444</ak-dropdown-item>`;

  const component = new Dropdown();
  component.innerHTML = `
    <ak-dropdown-trigger-button slot="trigger">test</ak-dropdown-trigger-button>
    ${html}
  `;
  const componentHasShadowRoot = () => !!getShadowRoot(component);

  document.body.appendChild(component);

  return waitUntil(componentHasShadowRoot).then(() => component);
}

function tearDownComponent(component) {
  document.body.removeChild(component);
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
      (new exports.Item).should.be.an.instanceof(Component);
      (new exports.DropdownTrigger).should.be.an.instanceof(Component);
      (new exports.DropdownTriggerButton).should.be.an.instanceof(Component);
      (new exports.Group).should.be.an.instanceof(Component);
    });

    it('should have an events export with defined events', () => {
      const eventsArray = ['selected', 'afterOpen', 'afterClose', 'item', 'trigger'];
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

    beforeEach(() => setupComponent().then(newComponent => {
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

  describe('select item', () => {
    let component;
    let items;
    const html = `<ak-dropdown-item>first</ak-dropdown-item>
                  <ak-dropdown-item>second</ak-dropdown-item>
                  <ak-dropdown-item>third</ak-dropdown-item>`;
    beforeEach(() => setupComponent(html).then(newComponent => {
      component = newComponent;
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

      afterMutations(
        () => checkSelectedItems(items, 0),
        () => emit(items[1], selectedEvent, { detail: { item: items[1] } }),
        () => checkSelectedItems(items, 1),
        done
      );
    });

    it('any checkbox item can be selected and unselected simultaneously', (done) => {
      items.forEach(item => (props(item, { checkbox: true })));

      // mock the event from the item
      emit(items[0], selectedEvent, { detail: { item: items[0] } });
      emit(items[2], selectedEvent, { detail: { item: items[2] } });

      afterMutations(
        () => checkSelectedItems(items, 0, 2),
        () => emit(items[0], selectedEvent, { detail: { item: items[0] } }),
        () => checkSelectedItems(items, 2),
        () => emit(items[0], selectedEvent, { detail: { item: items[2] } }),
        () => checkSelectedItems(items),
        done
      );
    });
  });
});
