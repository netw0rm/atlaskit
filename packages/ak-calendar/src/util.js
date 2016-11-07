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

function getI18n() {
  return i18n['en-au'];
}

export function getDayName(elem, i) {
  return getI18n().weekdays[i].substring(0, 3);
}

export function getMonthName(elem, i) {
  return getI18n().months[i - 1];
}

export function dateToString(date) {
  return date ? `${date.year}-${date.month + 1}-${date.day}` : '';
}

export function makeArrayFromNumber(i) {
  const arr = [];
  const num = Math.ceil(i);
  for (let a = 0; a < num; a++) {
    arr.push(a);
  }
  return arr;
}
