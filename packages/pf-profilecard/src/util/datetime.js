// @FIXME: needs i18n at some point
const meridiem = ['am', 'pm'];
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Return absolute base 10 number as zero padded string
 * @ignore
 * @param {number} number
 * @param {number} targetLength
 * @return {string} absolute base 10 number of `number` as zero padded string
 */
export const zeroPadLeft = (number, targetLength) => {
  if (isNaN(number) || typeof number !== 'number') {
    throw new Error('zeroPadLeft expects first argument to be a number');
  }

  let numStr = Math.abs(parseInt(number, 10)).toString();

  while (numStr.length < targetLength) {
    numStr = `0${numStr}`;
  }

  return numStr;
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
 * Returns true if two date objects are on the same day ignoring time.
 * @ignore
 * @param  {date}  firstDate
 * @param  {date}  secondDate
 * @return {boolean}
 */
export const isSameDay = (firstDate, secondDate) =>
  startOfDay(firstDate).getTime() === startOfDay(secondDate).getTime();

/**
 * Return hours as string from given date object
 * @ignore
 * @param  {date} date
 * @param  {boolean} use24h
 * @return {string}
 */
export const getHours = (date, use24h) => {
  const hours = date.getHours();

  if (use24h) {
    return zeroPadLeft(hours, 2);
  } else if (hours === 0) {
    return '12';
  } else if (hours > 12) {
    return (hours % 12).toString();
  }

  return hours.toString();
};

/**
 * Return AM/PM suffix for given hours to use in 12h clock display
 * @ignore
 * @param  {number} hours
 * @return {string}
 * @example getMeridiem(3) -> 'am'
 * getMeridiem(15) -> 'pm'
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
