import chai from 'chai';
import { props } from 'skatejs';
import { getShadowRoot, waitUntil, hasClass } from 'akutil-common-test';
import chaiAsPromised from 'chai-as-promised';
import DateComponent from '../src/internal/date-component';
import styles from '../src/internal/date-component/styles';
import { stylesWrapperConstructor } from './_helpers';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

const Component = stylesWrapperConstructor(DateComponent, styles);

describe('ak-calendar-date', () => {
  let component;
  let css;

  beforeEach(() => {
    const c = new Component();
    const componentHasShadowRoot = () => !!getShadowRoot(c);
    document.body.appendChild(c);

    return waitUntil(componentHasShadowRoot).then(() => {
      component = c;
      css = c.css;
    });
  });

  afterEach(() => (document.body.removeChild(component)));

  describe('attributes', () => {
    describe('day', () => {
      beforeEach(() => {
        component.day = 1;
      });

      it('should render the day property', () =>
        waitUntil(() =>
          getShadowRoot(component).querySelector(`.${css.day}`).innerHTML === '1'
        ).should.be.fulfilled
      );
    });

    [
      'disabled',
      'focused',
      'selected',
      'selecting',
      'sibling',
      'today',
    ].forEach((attr) => {
      describe(`when attribute ${attr} is set`, () => {
        beforeEach(() => (props(component, { [attr]: true })));

        it(`should add the class ${attr}`, () =>
          expect(hasClass(getShadowRoot(component).querySelector(`.${css.day}`), css[attr])).to.be.true
        );
      });
    });
  });
});
