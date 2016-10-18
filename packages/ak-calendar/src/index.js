/** @jsx h */

import { Calendar } from 'calendar-base';
import { define, emit, h, prop, vdom } from 'skatejs';
import { style } from 'akutil-common';
import { dateToString, getDayName, getMonthName, makeArrayFromNumber } from './util';
import * as events from './index.events';
import * as keys from './keys';
import classnames from 'classnames';
import styles from './styles';
import {
  $a11y,
  $calendars,
  $next,
  $prev,
  $selectDay,
  $selecting,
} from './index.symbols';

const daysPerWeek = 7;
const monthsPerYear = 12;

// TODO formalize this helper
const attr = Object.keys(prop).reduce((prev, curr) => {
  prev[curr] = prop[curr].bind(null, { attribute: true });
  return prev;
}, {});

// TODO find out if there is a better way. If not formalise this.
const Announcer = () => (
  <div
    ref={(e) => {
      e.setAttribute('aria-live', 'assertive');
      e.setAttribute('aria-relevant', 'text');
      Object.assign(e.style, {
        border: '0',
        clip: 'rect(0 0 0 0)',
        height: '1px',
        margin: '-1px',
        overflow: 'hidden',
        padding: '0',
        position: 'absolute',
        width: '1px',
      });
    }}
  />
);

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class Calendar
 * @example @js import Calendar from 'ak-calendar';
 * const component = new Calendar();
 */
export default define('ak-calendar', {
  props: {
    [$a11y]: prop.string(),
    [$selecting]: prop.string(),
    day: attr.number({ default: new Date().getDate() }),
    disabled: attr.array(),
    focused: attr.number({ default: 0 }),
    selected: attr.array(),
    i18n: attr.string({ default: 'en-au' }),
    max: attr.number(),
    min: attr.number(),
    month: attr.number({ default: new Date().getMonth() + 1 }),
    year: attr.number({ default: new Date().getFullYear() }),
  },
  prototype: {
    loseFocus() {
      this.focused = 0;
    },
    navigateWithKeyboard(e) {
      const key = e.keyCode;
      const focused = this.focused;
      const isArrowKey = [keys.down, keys.left, keys.right, keys.up].indexOf(key) > -1;
      const isInitialArrowKeyPress = !focused && isArrowKey;

      if (isInitialArrowKeyPress) {
        this.focused = 1;
        return;
      }

      // TODO break this down into separate functions.
      if (key === keys.down) {
        const next = focused + daysPerWeek;
        const daysInMonth = Calendar.daysInMonth(this.year, this.month - 1);

        if (next > daysInMonth) {
          this[$next]();
          this.focused = next - daysInMonth;
        } else {
          this.focused = next;
        }
      } else if (key === keys.left) {
        const next = focused - 1;

        if (next < 1) {
          this[$prev]();
          this.focused = Calendar.daysInMonth(this.year, this.month - 1);
        } else {
          this.focused = next;
        }
      } else if (key === keys.right) {
        const next = focused + 1;
        const daysInMonth = Calendar.daysInMonth(this.year, this.month - 1);

        if (next > daysInMonth) {
          this[$next]();
          this.focused = 1;
        } else {
          this.focused = next;
        }
      } else if (key === keys.up) {
        const next = focused - daysPerWeek;
        if (next < 1) {
          this[$prev]();
          this.focused = Calendar.daysInMonth(this.year, this.month - 1) + next;
        } else {
          this.focused = next;
        }
      } else if (key === keys.escape) {
        this.focused = 0;
      } else if (key === keys.enter || key === keys.space) {
        const day = focused;
        const month = this.month;
        const year = this.year;
        emit(this, 'select', {
          detail: { day, month, year },
        });
      }
    },
    next() {
      if (this.month === monthsPerYear) {
        this.month = 1;
        this.year++;
      } else {
        this.month++;
      }
    },
    prev() {
      if (this.month === 1) {
        this.month = monthsPerYear;
        this.year--;
      } else {
        this.month--;
      }
    },
    selectDay(e) {
      const day = Number(e.currentTarget.getAttribute('data-day'));
      const month = this.month;
      const year = this.year;
      emit(this, 'select', {
        detail: { day, month, year },
      });
    },
    selectHandler(e) {
      const d = e.detail;
      const s = `${d.year}-${d.month}-${d.day}`;
      const i = this.selected.indexOf(s);

      if (i > -1) {
        this.selected.splice(i, 1);
        this.selected = this.selected;
      } else {
        this.selected = this.selected.concat(s);
      }
    },
  },
  created(elem) {
    elem[$calendars] = new Calendar({
      siblingMonths: true,
      weekNumbers: true,
    });

    if (!elem.hasAttribute('tabindex')) {
      elem.setAttribute('tabindex', 0);
    }

    if (!elem.hasAttribute('aria-label')) {
      elem.setAttribute('aria-label', elem.getAttribute('title') || 'Calendar');
    }

    elem.addEventListener('blur', elem.loseFocus);
    elem.addEventListener('keydown', elem.navigateWithKeyboard);
    elem.addEventListener('mouseover', elem.loseFocus);
    elem.addEventListener('select', elem.selectHandler);

    elem[$next] = elem.next.bind(elem);
    elem[$prev] = elem.prev.bind(elem);
    elem[$selectDay] = elem.selectDay.bind(elem);
  },
  render(elem) {
    const calendar = elem[$calendars].getCalendar(elem.year, elem.month - 1);
    const now = new Date();
    const weeks = [];

    const css = style(vdom, styles);

    calendar.forEach((date) => {
      const dateAsString = dateToString(date);
      const week = date.weekDay === 0 ? [] : weeks[weeks.length - 1];

      if (!week.length) {
        weeks.push(week);
      }

      const isDisabled = elem.disabled.indexOf(dateAsString) > -1;
      const isFocused = elem.focused === date.day && !date.siblingMonth;
      const isSelected = elem.selected.indexOf(dateAsString) > -1;
      const isSelecting = elem[$selecting] === (dateAsString);
      const isSiblingMonth = date.siblingMonth;
      const isToday = date.day === now.getDate() &&
        date.month === now.getMonth() &&
        date.year === now.getFullYear();

      week.push(
        <td
          aria-live={isFocused ? 'polite' : ''}
          class={classnames(css.day, {
            [css.disabled]: isDisabled,
            [css.focused]: isFocused,
            [css.selected]: isSelected,
            [css.selecting]: isSelecting,
            [css.sibling]: isSiblingMonth,
            [css.today]: isToday,
          })}
          data-day={date.day.toString()}
          onClick={elem[$selectDay]}
          onMousedown={() => (elem[$selecting] = dateToString(date))}
          onMouseup={() => (elem[$selecting] = '')}
        >{date.day}</td>
      );
    });

    return [
      <Announcer>{new Date(elem.year, elem.month, elem.day).toString()}</Announcer>,
      <table>
        <caption>
          <div class={css.heading}>
            <button class={classnames(css.btn, css.btnPrev)} onClick={elem[$prev]}>p</button>
            <div class={css.monthAndYear}>
              <span>{getMonthName(elem, elem.month)}</span>
              {' '}
              <span>{elem.year}</span>
            </div>
            <button class={classnames(css.btn, css.btnNext)} onClick={elem[$next]}>n</button>
          </div>
        </caption>
        <thead>
          <tr>
            {makeArrayFromNumber(daysPerWeek).map(i =>
              <th class={css.dayOfWeek}>{getDayName(elem, i)}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {weeks.map(week => <tr>{week}</tr>)}
        </tbody>
      </table>,
    ];
  },
});

export { events };
