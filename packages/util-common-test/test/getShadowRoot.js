import Button from 'ak-button';

import { getShadowRoot, waitUntil } from '../src';

// eslint-disable-next-line mocha/no-skipped-tests
describe.skip('getShadowRoot', () => {
  let component;
  beforeEach(() => {
    component = new Button();
    document.body.appendChild(component);
  });
  afterEach(() => {
    document.body.removeChild(component);
  });

  it('should return the shadowroot of a component if it has one', () => {
    const componentHasShadowRoot = () => !!getShadowRoot(component);
    return waitUntil(componentHasShadowRoot).should.be.fulfilled;
  });

  it('should return undefined for component without shadowroot', () => {
    const elem = document.body.appendChild(document.createElement('div'));
    expect(getShadowRoot(elem)).to.equal(undefined);
  });
});
