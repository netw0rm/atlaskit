import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols } from 'skatejs';
import AkutilComponentTemplate from '../src/index.register.js';
import styles from '../src/shadow.less';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect; // eslint-disable-line no-unused-vars
const valueSelector = `.${styles.locals.value}`;


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
  describe('max prop', () => {
    it('should constrain the value when set', (done) => {
      const component = new AkutilComponentTemplate();
      component.max = 99;
      component.value = 111;

      setTimeout(() => {
        const html = component[symbols.shadowRoot].querySelector(valueSelector).innerHTML;
        expect(html).to.match(/99\+/);
        done();
      }, 0);
    });
    it('should not fire if equal to value', (done) => {
      const component = new AkutilComponentTemplate();
      component.max = 99;
      component.value = 99;

      setTimeout(() => {
        const html = component[symbols.shadowRoot].querySelector(valueSelector).innerHTML;
        expect(html).to.not.match(/99\+/);
        done();
      }, 0);
    });
  });
});
