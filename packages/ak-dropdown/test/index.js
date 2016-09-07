import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Dropdown, * as exports from '../src';
import { symbols, Component } from 'skatejs';
import { name } from '../package.json';
import { afterMutations, getShadowRoot, waitUntil, checkVisibility } from 'akutil-common-test';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

function setupComponent() {
  const component = new Dropdown();
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
      (new exports.Trigger).should.be.an.instanceof(Component);
      (new exports.TriggerButton).should.be.an.instanceof(Component);
    });

    it('should have an events export with defined events', () => {
      exports.events.should.be.defined;
      Object.keys(exports.events).should.be.deep.equal(['selected', 'item', 'trigger']);
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
    it('should be possible to create a component', (done) => {
      // testing to see that skate did its job as expected
      // (in case some breaking changes in it that affect rendering)
      setTimeout(() => {
        expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
        expect(component[symbols.shadowRoot]).to.be.defined;
        expect(component[symbols.shadowRoot].firstChild).to.be.defined;
      });
      setTimeout(done);
    });
    it('open property controls open state', (done) => {
      component.innerHTML = '<span>something visible</span>';
      afterMutations(
        () => (component.open = false),
        () => (expect(checkVisibility(component.childNodes[0])).to.equal(false)),
        () => (component.open = true),
        () => (expect(checkVisibility(component.childNodes[0])).to.equal(true)),
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
