import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Dropdown, * as exports from '../src';
import { props, Component } from 'skatejs';
import { name } from '../package.json';
import {
  afterMutations,
  getShadowRoot,
  checkVisibility,
  waitUntil,
} from 'akutil-common-test';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

function setupComponent() {
  const component = new Dropdown();
  component.innerHTML = `
    <ak-dropdown-trigger-button slot="trigger">test</ak-dropdown-trigger-button>
    <ak-dropdown-item>124</ak-dropdown-item>
    <ak-dropdown-item>444</ak-dropdown-item>
  `;
  const componentHasShadowRoot = () => !!getShadowRoot(component);
  document.body.appendChild(component);
  return waitUntil(componentHasShadowRoot).then(() => component);
}

function tearDownComponent(component) {
  document.body.removeChild(component);
}

function clickDropdownTrigger(component) {
  getShadowRoot(component.querySelector('[slot="trigger"]')).firstChild.click();
}

function setupTwoDropdowns() {
  const component1 = new Dropdown();
  const component2 = new Dropdown();
  const html = `
    <ak-dropdown-trigger-button slot="trigger">test</ak-dropdown-trigger-button>
    <ak-dropdown-item>124</ak-dropdown-item>
    <ak-dropdown-item>444</ak-dropdown-item>
  `;
  component1.innerHTML = html;
  component2.innerHTML = html;
  const componentsHaveShadowRoot = () => !!getShadowRoot(component1) && !!getShadowRoot(component2);
  document.body.appendChild(component1);
  document.body.appendChild(component2);
  const components = { component1, component2 };
  return waitUntil(componentsHaveShadowRoot).then(() => components);
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
    it('three clicks leaves the dropdown open with items in it', () => {
      props(component, { open: true });
      props(component, { open: false });
      props(component, { open: true });
      expect(component.open).to.equal(true);
      expect(checkVisibility(component.children[1])).to.equal(true);
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

    beforeEach(() => setupTwoDropdowns().then(components => {
      component1 = components.component1;
      component2 = components.component2;
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
});
