import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import AkBadge, { events } from '../src';
const { change: changeEvent } = events;
import styles from '../src/shadow.less';
import { afterMutations, getShadowRoot } from 'akutil-common-test';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect; // eslint-disable-line no-unused-vars
const valueSelector = `.${styles.locals.value}`;
const fixture = document.createElement('div');
let component;
const value = () => getShadowRoot(component).querySelector(valueSelector);

describe('ak-badge', () => {
  beforeEach(() => {
    document.body.appendChild(fixture);
    component = new AkBadge();
    fixture.appendChild(component);
  });
  afterEach(() => {
    fixture.removeChild(component);
    component = null;
    document.body.removeChild(fixture);
  });
  describe('value property', () => {
    it('should be visibly displayed', (done) => {
      afterMutations(
          () => (component.value = 5),
          () => {
            const html = value().innerHTML;
            expect(html).to.match(/5/);
          },
          done
      );
    });
    it('should only accept positive numbers', (done) => {
      afterMutations(
          () => (component.value = -5),
          () => {
            const html = value().innerHTML;
            expect(html).to.match(/0/);
          },
          done
      );
    });
    it('should show show Infinity as the ∞ character', (done) => {
      afterMutations(
          () => (component.value = Infinity),
          () => (component.max = Infinity),
          () => {
            const html = value().innerHTML;
            expect(html).to.match(/∞/);
          },
          done
      );
    });
    it('should fire an event when changed', (done) => {
      let changed = false;
      let detail;

      component.addEventListener(changeEvent, (e) => {
        changed = true;
        detail = e.detail;
      });

      afterMutations(
          () => (component.value = 6),
          () => expect(changed).to.equal(true),
          () => expect(detail.oldValue).to.equal(0),
          () => expect(detail.newValue).to.equal(6),
          done
      );
    });
  });
  describe('max property', () => {
    it('should constrain to 99+ when not specified', (done) => {
      afterMutations(
          () => (component.value = 101),
          () => {
            const html = value().innerHTML;
            expect(html).to.match(/99\+/);
          },
          done
      );
    });
    it('should constrain the value when set', (done) => {
      afterMutations(
          () => (component.value = 200),
          () => (component.max = 100),
          () => {
            const html = value().innerHTML;
            expect(html).to.match(/100\+/);
          },
          done
      );
    });
    it('should not constrain if equal to value', (done) => {
      afterMutations(
          () => (component.value = 200),
          () => (component.max = 200),
          () => {
            const html = value().innerHTML;
            expect(html).to.not.match(/200\+/);
          },
          done
      );
    });
    it('should not modify the actual value', (done) => {
      afterMutations(
          () => (component.value = 300),
          () => (component.max = 200),
          () => {
            expect(component.value).to.equal(300);
          },
          done
      );
    });
  });
  describe('appearance property', () => {
    it('should be "default" when not set', (done) => {
      afterMutations(
          () => (component.value = 20),
          () => {
            const el = value();
            expect(el.classList.contains(styles.locals.default)).to.equal(true);
          },
          done
      );
    });
    it('should change when set to an approved value', (done) => {
      afterMutations(
          () => (component.value = 50),
          () => (component.appearance = 'removed'),
          () => {
            const el = value();
            expect(el.classList.contains(styles.locals.removed)).to.equal(true);
          },
          done
      );
    });
    it('should revert to "default" when set to an invalid value', (done) => {
      afterMutations(
          () => (component.value = 9),
          () => (component.appearance = 'foo'),
          () => {
            const el = value();
            expect(el.classList.contains(styles.locals.default)).to.equal(true);
            expect(el.classList.contains('foo')).to.equal(false);
          },
          done
      );
    });
  });
});
