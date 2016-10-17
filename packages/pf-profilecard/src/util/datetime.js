const leadWithZero = (number, threshold) => (
  number < threshold ? `0${number}` : number
);

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

export const formatWeekdayString = (timestamp) => {
  const now = new Date(timestamp * 1000);

  if (now.toDateString() === new Date().toDateString()) {
    return null;
  }

  const daysArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return `${daysArray[now.getDay()]}`;
};

export const formatTimeString = (timestamp, use24h) => {
  const now = new Date(timestamp * 1000);

  let timeHours = now.getHours();
  let timeMinutes = now.getMinutes();
  let timeSeconds = now.getSeconds();
  let timePeriod = '';

  timeMinutes = leadWithZero(timeMinutes, 10);
  timeSeconds = leadWithZero(timeSeconds, 10);

  if (use24h) {
    timeHours = leadWithZero(timeHours, 10);
  } else {
    timeHours = timeHours === 0 ? 12 : timeHours;

    if (timeHours <= 12) {
      timePeriod = 'AM';
    } else {
      timeHours = timeHours <= 12 ? timeHours : timeHours - 12;
      timePeriod = 'PM';
    }
  }

  return `${timeHours}:${timeMinutes}${timePeriod.toLowerCase()}`;
};

export const getTimeLabel = (timestamp, use24h) => {
  if (!timestamp) { return false; }
  const datetime = formatTimeString(timestamp, use24h);
  const weekday = formatWeekdayString(timestamp);

  return weekday ? `${weekday} ${datetime}` : datetime;
};
