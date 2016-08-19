import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols } from 'skatejs';
import AkNavigation from '../src/index.js';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;


describe('ak-navigation', () => {
  it.skip('should be possible to create a component', () => {
    const component = new AkNavigation();
    component[symbols.shadowRoot].innerHTML.should.match(/I am an .+? element!/);
  });

  it('fires an ak-navigation-open event when opening', () => {
    const component = new AkNavigation();
    component.open = false;
    let called = false;
    component.addEventListener('ak-navigation-open', () => {
      called = true;
    });
    component.open = true;
    expect(called).to.equal(true);
  });

  it('fires an ak-navigation-open event when closing', () => {
    const component = new AkNavigation();
    component.open = true;
    let called = false;
    component.addEventListener('ak-navigation-close', () => {
      called = true;
    });
    component.open = false;
    expect(called).to.equal(true);
  });
});
