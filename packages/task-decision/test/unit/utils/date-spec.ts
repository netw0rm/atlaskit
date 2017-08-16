import { getFormattedDate, getStartOfDate, isSameDate } from '../../../src/util/date';
import * as subDays from 'date-fns/sub_days';
import * as subWeeks from 'date-fns/sub_weeks';
import * as subYears from 'date-fns/sub_years';

const monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

describe('util/date', () => {
  describe('getFormattedDate', () => {
    it('Today', () => {
      expect(getFormattedDate(new Date())).toBe('Today');
    });

    it('Yesterday', () => {
      const yesterday = subDays(new Date(), 1);
      expect(getFormattedDate(yesterday)).toBe('Yesterday');
    });

    it('Last week', () => {
      const lastWeek = subWeeks(new Date(), 1);
      expect(getFormattedDate(lastWeek)).toBe(`${monthsFull[lastWeek.getMonth()]} ${lastWeek.getDate()}`);
    });

    it('Last year', () => {
      const lastYear = subYears(new Date(), 1);
      expect(getFormattedDate(lastYear)).toBe(`${monthsFull[lastYear.getMonth()]} ${lastYear.getDate()}, ${lastYear.getFullYear()}`);
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
      const d1 = new Date();
      const d2 = new Date();
      d2.setHours(d1.getHours() + 1 % 24);
      expect(isSameDate(d1, d2)).toBe(true);
    });

    it('Different date with two sames times are not same', () => {
      const d1 = new Date();
      const d2 = subDays(d1, 1);
      expect(isSameDate(d1, d2)).toBe(false);
    });
  });
});
