// @FIXME: needs i18n at some point
const meridiem = ['am', 'pm'];
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Add leading zeros to given number to match given targetLength
 * @ignore
 * @param {number} number
 * @param {number} targetLength
 * @return {string}
 */
export const zeroPadLeft = (number, targetLength) => {
  targetLength = targetLength || 0;
  number = parseInt(number, 10);

  const sign = number < 0 ? '-' : '';
  const numStr = Math.abs(number).toString();
  const padding = new Array((targetLength - numStr.length) + 1).join('0');

  return `${sign}${padding}${numStr}`;
};

/**
 * Return new date object rewound to the start of the day of given date
 * @ignore
 * @param  {date} date
 * @return {date}
 */
export const startOfDay = (date) => {
  const internalDate = new Date(date);
  internalDate.setHours(0, 0, 0, 0);

  return internalDate;
};

/**
 * Check if the two dates given are on the same day
 * @ignore
 * @param  {date}  firstDate
 * @param  {date}  secondDate
 * @return {boolean}
 */
export const isSameDay = (firstDate, secondDate) =>
  startOfDay(firstDate).getTime() === startOfDay(secondDate).getTime();

/**
 * Return hours from given date
 * @ignore
 * @param  {date} date
 * @param  {boolean} use24h
 * @return {string|number}
 */
export const getHours = (date, use24h) => {
  const hours = date.getHours();

  if (use24h) {
    return zeroPadLeft(hours, 2);
  } else if (hours === 0) {
    return 12;
  } else if (hours > 12) {
    return hours % 12;
  }

  return hours;
};

/**
 * Return meridiem string for given hours
 * @ignore
 * @param  {number} hours
 * @return {string}
 */
export const getMeridiem = hours => ((hours / 12) >= 1 ? meridiem[1] : meridiem[0]);

/**
 * Return time label string for given timestamp
 * @ignore
 * @param  {number} timestamp
 * @param  {boolean} use24h
 * @return {string}
 */
export const getTimeLabel = (timestamp, use24h) => {
  if (!timestamp) { return false; }

  const date = new Date(timestamp * 1000);
  const timeHours = getHours(date, use24h);
  const timeMinutes = zeroPadLeft(date.getMinutes(), 2);
  const timeMeridiem = use24h ? '' : getMeridiem(date.getHours());

  if (isSameDay(date, new Date())) {
    return `${timeHours}:${timeMinutes}${timeMeridiem}`;
  }

  return `${weekdays[date.getDay()]} ${timeHours}:${timeMinutes}${timeMeridiem}`;
};

/**
 * Return new timestamp with given timezone offset
 * @ignore
 * @param {number} timeZoneOffset
 * @return {number}
 */
export const getTimestampWithOffset = (timeZoneOffset) => {
  const now = new Date();
  const localOffset = now.getTimezoneOffset();
  /*
    dateObj.getTimezoneOffset()

    The time-zone offset is the difference, in minutes, between UTC and
    local time. Note that this means that the offset is positive if the
    local timezone is behind UTC and negative if it is ahead.

    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
   */
  const remoteOffset = timeZoneOffset * -1;
  const offset = (remoteOffset - localOffset) * 60 * 1000;

  return Math.floor(new Date(now.getTime() - offset) / 1000);
};
