import * as moment from 'moment';

// FIXME i18n messages
const DATE_FORMAT = {
  sameDay: '[Today]',
  lastDay: '[Yesterday]',
  lastWeek: 'MMMM D',
  sameElse: 'MMMM D'
};

export const getFormattedDate = (ts: Date): string => {
  const stamp = moment(ts);
  if (stamp.isSame(new Date(), 'year')) {
    return stamp.calendar(undefined, DATE_FORMAT);
  }
  return stamp.format('MMMM D, YYYY');
};

export const getStartOfDate = (ts: Date): Date => {
  const stamp = moment(ts);
  return stamp.startOf('date').toDate();
};

export const isSameDate = (d1: Date, d2: Date): boolean => {
  return d1 && d2 && moment(d1).isSame(d2, 'date');
};
