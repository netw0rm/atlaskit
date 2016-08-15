import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols } from 'skatejs';
import AkBadge from '../src/index.js';
import styles from '../src/shadow.less';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect; // eslint-disable-line no-unused-vars
const valueSelector = `.${styles.locals.value}`;


describe('ak-badge', () => {
  describe('value property', () => {
    it('should be visibly displayed', (done) => {
      const component = new AkBadge();
      component.value = 5;

      setTimeout(() => {
        const html = component[symbols.shadowRoot].querySelector(valueSelector).innerHTML;
        expect(html).to.match(/5/);
        done();
      }, 0);
    });
    it('should only accept positive numbers', (done) => {
      const component = new AkBadge();
      component.value = -5;

      setTimeout(() => {
        const html = component[symbols.shadowRoot].querySelector(valueSelector).innerHTML;
        expect(html).to.match(/0/);
        done();
      }, 0);
    });
    it('should show show Infinity as the ∞ character', (done) => {
      const component = new AkBadge();
      component.value = Infinity;
      component.max = Infinity;

      setTimeout(() => {
        const html = component[symbols.shadowRoot].querySelector(valueSelector).innerHTML;
        expect(html).to.match(/∞/);
        done();
      }, 0);
    });
    it('should fire an event when changed', () => {
      let changed = false;
      const component = new AkBadge();
      component.value = 5;

      component.addEventListener('change', () => {
        changed = true;
      });
      component.value = 6;
      expect(changed).to.equal(true);
    });
  });
  describe('max property', () => {
    it('should constrain to 99+ when not specified', (done) => {
      const component = new AkBadge();
      component.value = 101;

      setTimeout(() => {
        const html = component[symbols.shadowRoot].querySelector(valueSelector).innerHTML;
        expect(html).to.match(/99\+/);
        done();
      }, 0);
    });
    it('should constrain the value when set', (done) => {
      const component = new AkBadge();
      component.max = 100;
      component.value = 101;

      setTimeout(() => {
        const html = component[symbols.shadowRoot].querySelector(valueSelector).innerHTML;
        expect(html).to.match(/100\+/);
        done();
      }, 0);
    });
    it('should not fire if equal to value', (done) => {
      const component = new AkBadge();
      component.max = 100;
      component.value = 100;

      setTimeout(() => {
        const html = component[symbols.shadowRoot].querySelector(valueSelector).innerHTML;
        expect(html).to.not.match(/100\+/);
        done();
      }, 0);
    });
  });
  describe('appearance property', () => {
    it('should be "default" when not set', () => {
      const component = new AkBadge();
      const el = component[symbols.shadowRoot].querySelector(`.${styles.locals.default}`);
      component.value = 13;

      expect(el).to.not.equal(null);
    });
    it('should change when set to an approved value', (done) => {
      const component = new AkBadge();
      component.value = 13;
      component.appearance = 'removed';

      setTimeout(() => {
        const el = component[symbols.shadowRoot].querySelector(`.${styles.locals.removed}`);
        expect(el).to.not.equal(null);
        done();
      }, 0);
    });
    it('should revert to "default" when set to an invalid value', (done) => {
      const component = new AkBadge();
      component.value = 13;
      component.appearance = 'foo';

      setTimeout(() => {
        const el = component[symbols.shadowRoot].querySelector(`.${styles.locals.default}`);
        expect(el).to.not.equal(null);
        done();
      }, 0);
    });
  });
});
