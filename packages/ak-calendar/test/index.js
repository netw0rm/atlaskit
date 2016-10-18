import chai from 'chai';
import 'custom-event-polyfill';
import AkCalendar from '../src';
import chaiAsPromised from 'chai-as-promised';
import { setupComponent, tearDownComponent, stylesWrapperConstructor } from './_helpers';
import { getShadowRoot } from 'akutil-common-test';
import { getMonthName } from '../src/util';

chai.use(chaiAsPromised);
const expect = chai.expect;
const now = new Date(2016, 9, 18);

const Component = stylesWrapperConstructor(AkCalendar);

function shadowDomQuery(component, selector) {
  return Array.from(getShadowRoot(component).querySelectorAll(selector));
}

describe('ak-calendar', () => {
  let component;
  let css;

  beforeEach(() =>
    setupComponent(Component, { now })
      .then(c => {
        component = c;
        css = c.css;
      })
  );

  afterEach(() => {
    tearDownComponent(component);
  });

  describe('logic', () => {
    describe('initialisation', () => {
      describe('with no attributes', () => {
        it('should highlight current date', () => {
          expect(shadowDomQuery(component, `.${css.monthAndYear} span`)
            .map(span => span.innerHTML))
            .to.include(getMonthName(component, now.getMonth() + 1), now.getYear());
          expect(shadowDomQuery(component, `.${css.today}`)[0].innerHTML)
            .to.equal(now.getDate().toString());
        });
      });
    });

    describe('selection', () => {
      describe('selecting state', () => {
        it('should not set selecting state on siblings', (done) => {
          const firstDay = shadowDomQuery(component, `[data-day="1"]:not(.${css.sibling})`)[0];
          const event = new CustomEvent('mousedown', {});
          firstDay.dispatchEvent(event);
          setTimeout(() => {
            expect(shadowDomQuery(component, `.${css.selecting}`)).to.have.lengthOf(1);
            done();
          });
        });
      });

      describe('selected state', () => {
        it('selected days should have selected class', (done) => {
          const tenthDay = shadowDomQuery(component, '[data-day="10"]')[0];
          const eleventhDay = shadowDomQuery(component, '[data-day="11"]')[0];
          tenthDay.click();
          eleventhDay.click();
          setTimeout(() => {
            expect(shadowDomQuery(component, `.${css.selected}`)).to.have.lengthOf(2);
            done();
          });
        });

        describe('when first day of month is selected', () => {
          it('siblings should not be selected', (done) => {
            const firstDay = shadowDomQuery(component, `[data-day="1"]:not(.${css.sibling})`)[0];
            firstDay.click();
            setTimeout(() => {
              expect(shadowDomQuery(component, `[data-day="1"].${css.selected}`))
                .to.have.lengthOf(1);
              done();
            });
          });
        });

        describe('when a date in the previous month is clicked', () => {
          it('calendar moves to the previous month', (done) => {
            const prevMonthDate = shadowDomQuery(component, `[data-day="30"].${css.sibling}`)[0];
            prevMonthDate.click();
            setTimeout(() => {
              expect(component.month).to.equal(now.getMonth());
              done();
            });
          });

          it('the date is selected', (done) => {
            const prevMonthDate = shadowDomQuery(component, '[data-day="30"][data-month="9"]')[0];
            prevMonthDate.click();
            setTimeout(() => {
              expect(
                shadowDomQuery(component, `[data-day="30"][data-month="9"].${css.selected}`).length
              ).to.equal(1);
              done();
            });
          });
        });
      });
    });
  });
});
