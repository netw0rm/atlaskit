import { afterMutations, getShadowRoot, waitUntil } from 'akutil-common-test';
import { Component } from 'skatejs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import AkNavigationLink from '../src/index.ak-navigation-link';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

function setupComponent() {
  const component = new AkNavigationLink();
  const componentHasShadowRoot = () => !!getShadowRoot(component);

  document.body.appendChild(component);

  return waitUntil(componentHasShadowRoot).then(() => component);
}

function tearDownComponent(component) {
  document.body.removeChild(component);
}

describe('exports', () => {
  it('should export a base component', () => {
    (new AkNavigationLink()).should.be.an.instanceof(Component);
  });
});
describe('ak-navigation-link', () => {
  let component;
  let shadowRoot;
  beforeEach(() => setupComponent().then((newComponent) => {
    component = newComponent;
    shadowRoot = getShadowRoot(component);
  }));
  afterEach(() => tearDownComponent(component));

  it('href is reflected on the internal anchor element', (done) => {
    afterMutations(
      () => (component.href = '#foo'),
      () => expect(shadowRoot.querySelector('a').getAttribute('href')).to.equal('#foo'),
      done
    );
  });
});
