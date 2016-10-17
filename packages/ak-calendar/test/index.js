import chai from 'chai';
import AkCalendar from '../src';
import chaiAsPromised from 'chai-as-promised';
import { setupComponent, tearDownComponent, stylesWrapperConstructor } from './_helpers';
import { getShadowRoot } from 'akutil-common-test';
import { getMonthName } from '../src/util';

const now = new Date();
const clock = sinon.useFakeTimers(now.getTime(), 'Date');

chai.use(chaiAsPromised);
const expect = chai.expect;

const Component = stylesWrapperConstructor(AkCalendar);

function shadowDomQuery(component, selector) {
  const result = Array.from(getShadowRoot(component).querySelectorAll(selector));
  return result && result.length === 1 ? result[0] : result;
}

describe('ak-calendar', () => {
  let component;
  let css;

  beforeEach(() =>
    setupComponent(Component)
      .then(c => {
        component = c;
        css = c.css;
      })
  );

  afterEach(() => {
    tearDownComponent(component);
    clock.restore();
  });

  describe('logic', () => {
    describe('initialisation', () => {
      describe('with no attributes', () => {
        it('should highlight current date', () => {
          expect(shadowDomQuery(component, `.${css.monthAndYear} span`)
            .map(span => span.innerHTML))
            .to.include(getMonthName(component, now.getMonth() + 1), now.getYear());
          expect(shadowDomQuery(component, `.${css.today}`).innerHTML)
            .to.equal(now.getDate().toString());
        });
      });
    });
  });
});
