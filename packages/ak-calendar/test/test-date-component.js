import chai from 'chai';
import { getShadowRoot, waitUntil } from 'akutil-common-test';
import chaiAsPromised from 'chai-as-promised';
import DateComponent from '../src/internal/date-component';
import styles from '../src/internal/date-component/styles';
import { stylesWrapperConstructor } from './_helpers';

chai.use(chaiAsPromised);
chai.should();

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
  });
});
