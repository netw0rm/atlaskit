const i18n = {
  'en-au': {
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    weekdays: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
  },
};

function getI18n(elem) {
  return i18n[elem.i18n];
}

export function getDayName(elem, i) {
  return getI18n(elem).weekdays[i].substring(0, 3);
}

export function getMonthName(elem, i) {
  return getI18n(elem).months[i - 1];
}

export function makeArrayFromNumber(i) {
  const arr = [];
  const num = Math.ceil(i);
  for (let a = 0; a < num; a++) {
    arr.push(a);
  }
  return arr;
}
