import { emit } from 'skatejs';
import { getShadowRoot } from 'akutil-common-test';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { getMonthName } from '../src/util';
import css from '../src/index.less';
import AkCalendar, { events } from '../src';

chai.use(chaiAsPromised);
const expect = chai.expect;

function shadowDomQuery(component, selector) {
  return Array.from(getShadowRoot(component).querySelectorAll(selector));
}

function shadowDomQueryClassName(elem, name) {
  return shadowDomQuery(elem, `.${css.locals[name] || name}`);
}

function getDay(elem, num) {
  return shadowDomQuery(elem, `[day="${num}"]:not([sibling])`)[0];
}

const now = new Date();

describe('ak-calendar', () => {
  let component;

  beforeEach((done) => {
    component = new AkCalendar();
    document.body.appendChild(component);
    setTimeout(done);
  });

  afterEach(() => {
    document.body.removeChild(component);
  });

  it('should highlight current date', () => {
    expect(shadowDomQueryClassName(component, 'monthAndYear')[0].textContent)
      .to.equal(`${getMonthName(component, now.getMonth() + 1)} ${now.getFullYear()}`);
  });

  it('should emit an event when selected', (done) => {
    Object.assign(component, {
      month: 1,
      year: 2010,
    });
    setTimeout(() => {
      component.addEventListener(events.select, (e) => {
        const { detail } = e;
        expect(detail.day).to.equal(1);
        expect(detail.month).to.equal(1);
        expect(detail.year).to.equal(2010);
        expect(detail.date).to.equal('2010-01-01');
      });
      emit(getDay(component, 1), 'click');
      done();
    }, 1);
  });

  it('selected days should have selected class', (done) => {
    component.selected = `${component.year}-${component.month}-01`;
    setTimeout(() => {
      const selected = shadowDomQueryClassName(component, 'selected');
      expect(selected).to.have.lengthOf(1);
      expect(selected[0]).to.equal(getDay(component, 1));
      done();
    });
  });

  it.skip('calendar moves to the previous month and year', () => {
    // TODO
  });
});
