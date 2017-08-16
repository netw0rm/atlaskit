import * as format from 'date-fns/format';
import * as isSameDay from 'date-fns/is_same_day';
import * as isThisYear from 'date-fns/is_this_year';
import * as isToday from 'date-fns/is_today';
import * as isYesterday from 'date-fns/is_yesterday';
import * as startOfDay from 'date-fns/start_of_day';

export const getFormattedDate = (ts: Date): string => {
  if (isToday(ts)) {
    return 'Today';
  } else if (isYesterday(ts)) {
    return 'Yesterday';
  } else if (isThisYear(ts)) {
    return format(ts, 'MMMM D');
  } else {
    return format(ts, 'MMMM D, YYYY');
  }
};

export const getStartOfDate = (ts: Date): Date => {
  return startOfDay(ts);
};

export const isSameDate = (d1: Date, d2: Date): boolean => {
  return isSameDay(d1, d2);
};
