import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols } from 'skatejs';
import AkutilComponentTemplate from '../src/index.register.js';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect; // eslint-disable-line no-unused-vars


describe('ak-badge', () => {
  it('should be possible to define the component', () => {
    const component = new AkutilComponentTemplate();

    expect(component).to.be.defined;
    expect(component.getAttribute('defined')).not.to.equal(null);
  });

  it('should display the value specified', () => {
    const component = new AkutilComponentTemplate();
    component.value = 5;
    component[symbols.shadowRoot].innerHTML.should.match(/5/);
  });
});
