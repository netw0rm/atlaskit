import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Dropdown, * as exports from '../src';
import { props, Component } from 'skatejs';
import { name } from '../package.json';
import { afterMutations, getShadowRoot, checkVisibility, waitUntil } from 'akutil-common-test';

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

describe('ak-dropdown', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      (new Dropdown).should.be.an.instanceof(Component);
    });

    it('should have an sub-components exports', () => {
      (new exports.Item).should.be.an.instanceof(Component);
      (new exports.DropdownTrigger).should.be.an.instanceof(Component);
      (new exports.DropdownTriggerButton).should.be.an.instanceof(Component);
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

    it('dropdown should reposition itself after being open', () => {
      const spy = sinon.spy();
      component.reposition = spy;
      props(component, { open: true });
      expect(spy.called).to.equal(true);
    });
    it('open property controls open state', (done) => {
      afterMutations(
        () => (component.innerHTML = '<span>something visible</span>'),
        () => (component.open = false),
        () => (expect(checkVisibility(component.children[0])).to.equal(false)),
        () => (component.open = true),
        () => (expect(checkVisibility(component.children[0])).to.equal(true)),
        done
      );
    });
    it('position is reflected to inner layer', (done) => {
      afterMutations(
        () => (expect(shadowRoot.querySelector('ak-layer').position).to.equal('bottom left')),
        () => (component.position = 'top left'),
        () => (expect(shadowRoot.querySelector('ak-layer').position).to.equal('top left')),
        done
      );
    });
  });
});
