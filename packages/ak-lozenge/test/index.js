import { afterMutations, getShadowRoot } from 'akutil-common-test';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import Lozenge from '../src';
import styles from '../src/shadow.less';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

const expect = chai.expect;

describe('ak-lozenge', () => {
  let component;
  const lozengeSelector = `.${styles.locals.lozenge}`;
  const lozengeDiv = () => getShadowRoot(component).querySelector(lozengeSelector);

  beforeEach((done) => {
    component = new Lozenge();

    afterMutations(
      // append component to the body to ensure it has been rendered.
      () => document.body.appendChild(component),
      done
    );
  });

  afterEach(() => {
    document.body.removeChild(component);
  });

  describe('bold property', () => {
    it('should not be the default', (done) => {
      afterMutations(
        () => {
          const el = lozengeDiv();
          expect(el.hasAttribute('bold')).to.equal(false);
        },
        done
      );
    });
    it('should change when toggled', (done) => {
      afterMutations(
        () => (component.bold = true),
        () => {
          const el = lozengeDiv();
          expect(el.hasAttribute('bold')).to.equal(true);
        },
        done
      );
    });
  });
  describe('appearance property', () => {
    it('should be "default" when not set', (done) => {
      afterMutations(
          () => {
            const el = lozengeDiv();
            expect(el.classList.contains(styles.locals.default)).to.equal(true);
          },
          done
      );
    });
    it('should change when set to an approved value', (done) => {
      afterMutations(
          () => (component.appearance = 'success'),
          () => {
            const el = lozengeDiv();
            expect(el.classList.contains(styles.locals.success)).to.equal(true);
          },
          done
      );
    });
    it('should revert to "default" when set to an invalid value', (done) => {
      afterMutations(
          () => (component.appearance = 'foo'),
          () => {
            const el = lozengeDiv();
            expect(el.classList.contains(styles.locals.default)).to.equal(true);
            expect(el.classList.contains('foo')).to.equal(false);
          },
          done
      );
    });
  });
});
