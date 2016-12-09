import Button from 'ak-button';
import chai from 'chai';
import sinonChai from 'sinon-chai';

import { getShadowRoot, waitUntil } from '../src';

chai.should();
chai.use(sinonChai);

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
    expect(getShadowRoot(elem)).to.not.be.defined;
  });
});
