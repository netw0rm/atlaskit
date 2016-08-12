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
    it('should be visibly displayed', () => {
      const component = new AkBadge();
      component.value = 5;

      component[symbols.shadowRoot].innerHTML.should.match(/5/);
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
    it('should constrain the value when set', (done) => {
      const component = new AkBadge();
      component.max = 99;
      component.value = 111;

      setTimeout(() => {
        const html = component[symbols.shadowRoot].querySelector(valueSelector).innerHTML;
        expect(html).to.match(/99\+/);
        done();
      }, 0);
    });
    it('should not fire if equal to value', (done) => {
      const component = new AkBadge();
      component.max = 99;
      component.value = 99;

      setTimeout(() => {
        const el = component[symbols.shadowRoot].querySelector(valueSelector);
        expect(el).to.not.match(/99\+/);
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
