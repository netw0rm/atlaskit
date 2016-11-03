import chai from 'chai';
import { getShadowRoot } from 'akutil-common-test';
import chaiAsPromised from 'chai-as-promised';
import 'custom-event-polyfill';
import AkCalendar from '../src';
import styles from '../src/styles';
import { setupComponent, tearDownComponent, stylesWrapperConstructor } from './_helpers';
import { getMonthName } from '../src/util';

chai.use(chaiAsPromised);
const expect = chai.expect;

const Component = stylesWrapperConstructor(AkCalendar, styles);

function shadowDomQuery(component, selector) {
  return Array.from(getShadowRoot(component).querySelectorAll(selector));
}

describe('ak-calendar', () => {
  let component;
  let css;
  let now = new Date(2016, 9, 18);

  beforeEach(() =>
    setupComponent(Component, { now })
      .then((c) => {
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
          expect(shadowDomQuery(component, '[today]')[0].day).to.equal(now.getDate());
        });
      });
    });

    describe('selection', () => {
      describe('selecting state', () => {
        it('should not set selecting state on siblings', (done) => {
          const firstDay = shadowDomQuery(component, '[day="1"]:not([sibling])')[0];
          const event = new CustomEvent('mousedown', {});
          firstDay.dispatchEvent(event);
          setTimeout(() => {
            expect(shadowDomQuery(component, '[selecting]')).to.have.lengthOf(1);
            done();
          });
        });
      });

      describe('selected state', () => {
        it('selected days should have selected class', (done) => {
          const tenthDay = shadowDomQuery(component, '[day="10"]')[0];
          const eleventhDay = shadowDomQuery(component, '[day="11"]')[0];
          tenthDay.click();
          eleventhDay.click();
          setTimeout(() => {
            expect(shadowDomQuery(component, '[selected]')).to.have.lengthOf(2);
            done();
          });
        });

        describe('when first day of month is selected', () => {
          it('siblings should not be selected', (done) => {
            const firstDay = shadowDomQuery(component, '[day="1"]:not([sibling])')[0];
            firstDay.click();
            setTimeout(() => {
              expect(shadowDomQuery(component, '[day="1"][selected]')).to.have.lengthOf(1);
              done();
            });
          });
        });

        describe('when a date in the previous month is clicked', () => {
          now = new Date(2016, 0, 1);
          it('calendar moves to the previous month and year', (done) => {
            const prevMonthDate = shadowDomQuery(component, '[day="31"][month="12"]')[0];
            prevMonthDate.click();
            setTimeout(() => {
              expect(component.month).to.equal(12);
              expect(component.year).to.equal(2015);
              done();
            });
          });

          it('the date is selected', (done) => {
            const prevMonthDate = shadowDomQuery(component, '[day="31"][month="12"]')[0];

            prevMonthDate.click();
            setTimeout(() => {
              const selected = shadowDomQuery(component, '[selected]');
              expect(selected.length).to.equal(1);
              expect(selected[0].day).to.equal(31);
              expect(selected[0].month).to.equal(12);
              expect(selected[0].year).to.equal(2015);
              done();
            });
          });
        });
      });
    });
  });
});
