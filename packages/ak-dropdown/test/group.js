import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Group } from '../src';
import { Component } from 'skatejs';
import 'custom-event-polyfill';
import { waitUntil, getShadowRoot } from 'akutil-common-test';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

function setupComponent() {
  const component = new Group();
  component.innerHTML = `
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

describe('exports', () => {
  it('should export a base component', () => {
    (new Group).should.be.an.instanceof(Component);
  });
});

describe('general behavior', () => {
  let component;

  beforeEach(() => setupComponent().then(newComponent => {
    component = newComponent;
  }));
  afterEach(() => tearDownComponent(component));

  it('should be possible to create a component', () => {
    // testing to see that skate did its job as expected
    // (in case some breaking changes in it that affect rendering)
    expect(getShadowRoot(component)).to.be.defined;
    expect(getShadowRoot(component).firstChild).to.be.defined;
  });
});
