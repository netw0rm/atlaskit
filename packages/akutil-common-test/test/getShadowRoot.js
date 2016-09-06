import { getShadowRoot } from '../src';
import Avatar from 'ak-avatar';
import chai from 'chai';
import sinonChai from 'sinon-chai';
chai.should();
chai.use(sinonChai);


describe('getShadowRoot', () => {
  let component;
  beforeEach(() => {
    component = new Avatar();
    document.body.appendChild(component);
  });
  afterEach(() => {
    document.body.removeChild(component);
  });

  it('should return undefined for component without shadowroot', () => {
    const elem = document.body.appendChild(document.createElement('div'));
    expect(getShadowRoot(elem)).to.not.be.defined;
  });
});
