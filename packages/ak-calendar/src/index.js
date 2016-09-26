/** @jsx h */

import { Calendar } from 'calendar-base';
import { define, emit, h, prop, vdom } from 'skatejs';
import { style } from 'akutil-common';
import { getDayName, getMonthName, makeArrayFromNumber } from './util';
import * as events from './index.events';
import * as keys from './keys';
import calendars from './calendars';
import classnames from 'classnames';

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
  events: {
    'click .next'() {
      this.next();
    },
    'click .prev'() {
      this.prev();
    },
    'click td'(e) {
      const day = Number(e.currentTarget.getAttribute('data-day'));
      const month = this.month;
      const year = this.year;
      emit(this, 'select', {
        detail: { day, month, year },
      });
    },
    blur() {
      this.focused = 0;
    },
    keydown(e) {
      const key = e.keyCode;
      const focused = this.focused;
      const isArrowKey = [keys.down, keys.left, keys.right, keys.up].indexOf(key) > -1;
      const isInitialArrowKeyPress = !focused && isArrowKey;

      if (isInitialArrowKeyPress) {
        this.focused = 1;
        return;
      }

      if (key === keys.down) {
        const next = focused + 7;
        const daysInMonth = Calendar.daysInMonth(this.year, this.month - 1);

        if (next > daysInMonth) {
          this.next();
          this.focused = next - daysInMonth;
        } else {
          this.focused = next;
        }
      } else if (key === keys.left) {
        const next = focused - 1;

        if (next < 1) {
          this.prev();
          this.focused = Calendar.daysInMonth(this.year, this.month - 1);
        } else {
          this.focused = next;
        }
      } else if (key === keys.right) {
        const next = focused + 1;
        const daysInMonth = Calendar.daysInMonth(this.year, this.month - 1);

        if (next > daysInMonth) {
          this.next();
          this.focused = 1;
        } else {
          this.focused = next;
        }
      } else if (key === keys.up) {
        const next = focused - 7;
        if (next < 1) {
          this.prev();
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
    mouseover() {
      this.focused = 0;
    },
  },
  properties: {
    a11y: prop.string(),
    btnNext: prop.string({
      attribute: true,
      default: '\u2192',
    }),
    btnPrev: prop.string({
      attribute: true,
      default: '\u2190',
    }),
    day: prop.number({
      attribute: true,
      default: new Date().getDate(),
    }),
    disabled: prop.array(),
    focused: prop.number({
      attribute: true,
      default: 0,
      set(elem, data) {
        elem.a11y = data.newValue ? `Focused ${elem.year}-${elem.month}-${data.newValue}` : '';
      },
    }),
    highlighted: prop.array(),
    i18n: prop.string({
      attribute: true,
      default: 'en-au',
    }),
    max: {
      attribute: true,
    },
    min: {
      attribute: true,
    },
    month: prop.number({
      attribute: true,
      default: new Date().getMonth() + 1,
    }),
    year: prop.number({
      attribute: true,
      default: new Date().getFullYear(),
    }),
  },
  prototype: {
    prev() {
      if (this.month === 1) {
        this.month = 12;
        this.year--;
      } else {
        this.month--;
      }
    },
    next() {
      if (this.month === 12) {
        this.month = 1;
        this.year++;
      } else {
        this.month++;
      }
    },
  },
  created(elem) {
    calendars.set(elem, new Calendar({
      siblingMonths: true,
      weekNumbers: true,
    }));

    if (!elem.hasAttribute('tabindex')) {
      elem.setAttribute('tabindex', 0);
    }

    if (!elem.hasAttribute('aria-label')) {
      elem.setAttribute('aria-label', elem.getAttribute('title') || 'Calendar');
    }

    elem.addEventListener('select', function select(e) {
      const d = e.detail;
      const s = `${d.year}-${d.month}-${d.day}`;
      const i = this.highlighted.indexOf(s);

      if (i > -1) {
        this.highlighted.splice(i, 1);
        this.highlighted = this.highlighted;
        this.a11y = `Un-highlighted ${new Date(d.year, d.month - 1, d.day)}`;
      } else {
        this.highlighted = this.highlighted.concat(s);
        this.a11y = `Highlighted ${new Date(d.year, d.month - 1, d.day)}`;
      }
    });
  },
  render(elem) {
    const calendar = calendars.get(elem).getCalendar(elem.year, elem.month - 1);
    const now = new Date();
    const weeks = [];
    const css = style(vdom, {
      td: {
        cursor: 'pointer',
        padding: '3px 6px',
      },
      caption: {
        'font-size': '20px',
        padding: '6px 12px',
      },

      // TODO reuse styles
      disabled: {
        color: '#ccc',
      },
      sibling: {
        color: '#ccc',
      },

      // TODO reuse styles
      'disabled:hover': {
        'background-color': 'transparent',
        cursor: 'default',
      },
      'sibling:hover': {
        'background-color': 'transparent',
        cursor: 'default',
      },

      current: {
        'background-color': '#eee',
      },

      // TODO reuse styles
      'td:hover': {
        'background-color': '#ddd',
      },
      focused: {
        'background-color': '#ddd',
      },

      highlighted: {
        'background-color': '#ccc',
      },

      next: {
        cursor: 'pointer',
        float: 'right',
      },

      prev: {
        cursor: 'pointer',
        float: 'left',
      },

      selected: {
        'background-color': '#ddd',
      },

      today: {
        'background-color': '#000',
        color: '#fff',
      },

      'today:hover': {
        'background-color': '#666',
      },
    });

    calendar.forEach((date) => {
      const dateAsString = `${elem.year}-${elem.month}-${date.day}`;
      const week = date.weekDay === 0 ? [] : weeks[weeks.length - 1];

      if (!week.length) {
        weeks.push(week);
      }

      const isCurrent = date.day === elem.day;
      const isDisabled = elem.disabled.indexOf(dateAsString) > -1;
      const isFocused = elem.focused === date.day && !date.siblingMonth;
      const isHighlighted = elem.highlighted.indexOf(dateAsString) > -1;
      const isSiblingMonth = date.siblingMonth;
      const isToday = date.day === now.getDate() &&
        date.month === now.getMonth() &&
        date.year === now.getFullYear();

      week.push(
        <td
          aria-live={isFocused ? 'polite' : ''}
          class={classnames(css.day, css.td, {
            [css.current]: isCurrent,
            [css.disabled]: isDisabled,
            [css.focused]: isFocused,
            [css.highlighted]: isHighlighted,
            [css.sibling]: isSiblingMonth,
            [css.today]: isToday,
          })}
          data-day={date.day.toString()}
        >{date.day}</td>
      );
    });

    return [
      <Announcer>{elem.a11y}</Announcer>,
      <table>
        <caption class={classnames(css.caption)}>
          <button class={classnames(css.prev)}>
            {elem.btnPrev}
          </button>
          <span class={classnames(css.month)}>
            {getMonthName(elem, elem.month)}
          </span>
          &nbsp;
          <span class={classnames(css.year)}>
            {elem.year}
          </span>
          <button class={classnames(css.next)} onClick={this.next}>
            {elem.btnNext}
          </button>
        </caption>
        <thead>
          <tr>
            {makeArrayFromNumber(7).map(i => <th>{getDayName(elem, i)}</th>)}
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
