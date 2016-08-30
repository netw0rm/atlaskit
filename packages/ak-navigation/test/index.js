import { name } from '../package.json';
import { keydown, keyup, afterMutations, getShadowRoot, waitUntil } from 'akutil-common-test';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import AkNavigation from '../src/index.js';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

function setupComponent() {
  const component = new AkNavigation();
  const componentHasShadowRoot = () => !!getShadowRoot(component);

  document.body.appendChild(component);

  return waitUntil(componentHasShadowRoot).then(() => component);
}

function tearDownComponent(component) {
  document.body.removeChild(component);
}

describe('ak-navigation', () => {
  let component;
  let shadowRoot;

  beforeEach(() => setupComponent().then(newComponent => {
    component = newComponent;
    shadowRoot = getShadowRoot(component);
  }));
  afterEach(() => tearDownComponent(component));

  it('should be possible to create a component', () => {
    expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
    expect(shadowRoot.innerHTML).to.not.equal('');
  });

  it('fires an ak-navigation-open event when opening', () => {
    component.open = false;
    let called = false;
    component.addEventListener('ak-navigation-open', () => {
      called = true;
    });
    component.open = true;
    expect(called).to.equal(true);
  });

  it('fires an ak-navigation-open event when closing', () => {
    component.open = true;
    let called = false;
    component.addEventListener('ak-navigation-close', () => {
      called = true;
    });
    component.open = false;
    expect(called).to.equal(true);
  });

  it('toggling does not work before attached', () => {
    expect(component.open).to.equal(false);
    afterMutations(() => {
      keydown('[');
      expect(component.open).to.equal(false);
    });
  });

  it('toggling works while attached', () => {
    document.body.appendChild(component);
    expect(component.open).to.equal(false);
    afterMutations(() => {
      keydown('[');
      expect(component.open).to.equal(true);
    });
  });

  it('toggling does not work after deteached', () => {
    document.body.appendChild(component);
    expect(component.open).to.equal(false);
    afterMutations(() => {
      keydown('[');
      expect(component.open).to.equal(false);
    });
  });

  it('sidebar link items are mutually exclusively selectable via enter', () => {
    component.innerHTML = `
      <ak-navigation-link selected></ak-navigation-link>
      <ak-navigation-link></ak-navigation-link>
      <ak-navigation-link></ak-navigation-link>
    `;
    afterMutations(() => {
      expect(component.children[0].selected).to.equal(true);
      expect(component.children[1].selected).to.equal(false);
      expect(component.children[2].selected).to.equal(false);
      keyup('enter', component.childNodes[1]);
      expect(component.children[0].selected).to.equal(false);
      expect(component.children[1].selected).to.equal(true);
      expect(component.children[2].selected).to.equal(false);
    });
  });
});
