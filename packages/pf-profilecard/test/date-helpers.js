import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {
  zeroPadLeft,
  startOfDay,
  isSameDay,
  getHours,
  getMeridiem,
  getTimeLabel,
  // getTimestampWithOffset,
} from '../src/util/datetime';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('util/datetime.js', () => {
  describe('#zeroPadLeft()', () => {
    it('should prepend input with zeros until length `n` is met', () => {
      expect(zeroPadLeft(1, 2)).to.equal('01');
      expect(zeroPadLeft('4', 3)).to.equal('004');
      expect(zeroPadLeft('04', 3)).to.equal('004');
      expect(zeroPadLeft(-21, 5)).to.equal('-00021');
    });
  });

  describe('#startOfDay()', () => {
    it('should return a new date at start of diven date', () => {
      const date = new Date(2016, 4, 1, 18, 21, 43);
      const start = startOfDay(date);

      expect(start.getHours()).to.equal(0);
      expect(start.getMinutes()).to.equal(0);
      expect(start.getSeconds()).to.equal(0);
      expect(start.getMilliseconds()).to.equal(0);

      expect(date.getHours()).to.equal(18);
      expect(date.getMinutes()).to.equal(21);
      expect(date.getSeconds()).to.equal(43);
      expect(date.getMilliseconds()).to.equal(0);
    });
  });

  describe('#isSameDay()', () => {
    it('should return true when both dates are the same day', () => {
      const firstDate = new Date(2016, 4, 1, 18, 21, 43);
      const secondDate = new Date(2016, 4, 1, 3, 54, 27);
      const thirdDate = new Date(2016, 8, 7, 3, 54, 27);

      expect(isSameDay(firstDate, secondDate)).to.be.true;
      expect(isSameDay(firstDate, thirdDate)).to.be.false;
    });
  });

  describe('#getHours()', () => {
    it('should return zero padded single hours when using 24 hour clock', () => {
      const date = new Date(2016, 4, 1, 6, 0, 0);

      expect(getHours(date, true)).to.equal('06');
    });

    it('should return correct hour strings when using 24 hour clock', () => {
      const date = new Date(2016, 4, 1, 13, 21, 43);

      expect(getHours(date, true)).to.equal('13');

      date.setHours(18);
      expect(getHours(date, true)).to.equal('18');

      date.setHours(23);
      expect(getHours(date, true)).to.equal('23');
    });

    it('should return 12h clock hours when not using 24 hour clock', () => {
      const date = new Date(2016, 4, 1, 6, 21, 43);

      expect(getHours(date, false)).to.equal(6);
    });

    it('should return correct hour strings when not using 24 hour clock', () => {
      const date = new Date(2016, 4, 1, 13, 21, 43);

      expect(getHours(date, false)).to.equal(1);

      date.setHours(18);
      expect(getHours(date, false)).to.equal(6);

      date.setHours(23);
      expect(getHours(date, false)).to.equal(11);
    });
  });

  describe('#getMeridiem()', () => {
    it('should return `am` for hours 0 - 11', () => {
      const hoursAm = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      hoursAm.forEach((hour) => {
        expect(getMeridiem(hour)).to.equal('am');
      });
    });

    it('should return `pm` for hours 12 - 23', () => {
      const hoursPm = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
      hoursPm.forEach((hour) => {
        expect(getMeridiem(hour)).to.equal('pm');
      });
    });
  });

  describe('#getTimeLabel()', () => {
    it('should return only time when timestamp matches current day', () => {
      const now = new Date();
      now.setHours(0);
      now.setMinutes(0);

      const ts = Math.floor(now.getTime() / 1000);
      expect(getTimeLabel(ts, true)).to.equal('00:00');
      expect(getTimeLabel(ts, false)).to.equal('12:00am');
    });

    it('should return weekday and time when timestamp does not match current day', () => {
      const now = new Date(2016, 4, 1, 8, 0, 0);

      const ts = Math.floor(now.getTime() / 1000);
      expect(getTimeLabel(ts, true)).to.equal('Sun 08:00');
      expect(getTimeLabel(ts, false)).to.equal('Sun 8:00am');
    });
  });
});
