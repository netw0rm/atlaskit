import { getFormattedDate, getStartOfDate, isSameDate } from '../../../src/util/date';
import * as moment from 'moment';

const months = moment.months();

describe('util/date', () => {
  describe('getFormattedDate', () => {
    it('Today', () => {
      expect(getFormattedDate(new Date())).toBe('Today');
    });

    it('Yesterday', () => {
      const yesterday = moment().subtract(1, 'day').toDate();
      expect(getFormattedDate(yesterday)).toBe('Yesterday');
    });

    it('Last week', () => {
      const lastWeek = moment().subtract(1, 'week').toDate();
      expect(getFormattedDate(lastWeek)).toBe(`${months[lastWeek.getMonth()]} ${lastWeek.getDate()}`);
    });

    it('Last year', () => {
      const lastYear = moment().subtract(1, 'year').toDate();
      expect(getFormattedDate(lastYear)).toBe(`${months[lastYear.getMonth()]} ${lastYear.getDate()}, ${lastYear.getFullYear()}`);
    });
  });

  describe('getStartOfDate', () => {
    it('Date returns is same without time component', () => {
      const now = new Date();
      const startOfDate = getStartOfDate(now);
      expect(startOfDate.getFullYear()).toBe(now.getFullYear());
      expect(startOfDate.getMonth()).toBe(now.getMonth());
      expect(startOfDate.getDate()).toBe(now.getDate());
      expect(startOfDate.getHours()).toBe(0);
      expect(startOfDate.getMinutes()).toBe(0);
      expect(startOfDate.getSeconds()).toBe(0);
      expect(startOfDate.getMilliseconds()).toBe(0);
    });
  });

  describe('isSameDate', () => {
    it('Same date with two different times are same', () => {
      const d1 = moment(new Date()).set('hour', 12).toDate();
      const d2 = moment(d1).set('hour', 13).toDate();
      expect(isSameDate(d1, d2)).toBe(true);
    });

    it('Different date with two sames times are not same', () => {
      const d1 = new Date();
      const d2 = moment(d1).subtract(1, 'day').toDate();
      expect(isSameDate(d1, d2)).toBe(false);
    });
  });
});
