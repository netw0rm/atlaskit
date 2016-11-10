import { Calendar } from 'calendar-base';
import { define, emit, prop, vdom } from 'skatejs';
import classnames from 'classnames';
import AkIconArrowLeft from 'ak-icon/glyph/arrowleft';
import AkIconArrowRight from 'ak-icon/glyph/arrowright';

import { dateToString, getDayName, getMonthName, makeArrayFromNumber, makeEventDetail } from './util';
import * as events from './index.events';
import * as keys from './keys';
import css from './index.less';
import cssDate from './internal/date-component/index.less';
import DateComponent from './internal/date-component';
import {
  $a11y,
  $calendars,
  $next,
  $now,
  $prev,
  $selectDay,
} from './index.symbols';

const { locals } = css;
const daysPerWeek = 7;
const monthsPerYear = 12;

// TODO formalize this helper.
const attr = Object.keys(prop).reduce((prev, curr) => {
  prev[curr] = prop[curr].bind(null, { attribute: true });
  return prev;
}, {});

// TODO this doesn't seem to be announcing right now. Needs fixing.
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
    [$now]: { default: new Date() },
    [$a11y]: prop.string(),
    disabled: attr.array(),
    focused: attr.number({ default: 0 }),
    previouslySelected: attr.array(),
    selected: attr.array(),
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
        emit(this, events.select, {
          detail: makeEventDetail({
            year: this.year,
            month: this.month,
            day: this.focused,
          }),
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
      emit(this, events.select, {
        detail: makeEventDetail({
          year: e.currentTarget.getAttribute('year'),
          month: e.currentTarget.getAttribute('month'),
          day: e.currentTarget.getAttribute('day'),
        }),
      });
    },
  },
  created(elem) {
    elem[$calendars] = new Calendar({
      siblingMonths: true,
      weekNumbers: true,
    });

    elem.addEventListener('blur', elem.loseFocus);
    elem.addEventListener('keydown', elem.navigateWithKeyboard);

    elem[$next] = elem.next.bind(elem);
    elem[$prev] = elem.prev.bind(elem);
    elem[$selectDay] = elem.selectDay.bind(elem);
  },
  attached(elem) {
    if (!elem.hasAttribute('tabindex')) {
      elem.setAttribute('tabindex', 0);
    }

    if (!elem.hasAttribute('aria-label')) {
      elem.setAttribute('aria-label', elem.getAttribute('title') || 'Calendar');
    }
  },
  render(elem) {
    const calendar = elem[$calendars].getCalendar(elem.year, elem.month - 1);
    const now = elem[$now];
    const weeks = [];
    const shouldDisplaySixthWeek = calendar.length % 6;

    if (shouldDisplaySixthWeek) {
      const lastDayIsSibling = calendar[calendar.length - 1].siblingMonth;
      const sliceStart = lastDayIsSibling ? daysPerWeek : 0;
      calendar.push(
        ...elem[$calendars].getCalendar(elem.year, elem.month)
          .slice(sliceStart, sliceStart + daysPerWeek)
          .map(e => Object.assign({}, e, { siblingMonth: true }))
      );
    }

    calendar.forEach((date) => {
      const dateAsString = dateToString(date, { fixMonth: true });
      const week = date.weekDay === 0 ? [] : weeks[weeks.length - 1];

      if (!week.length) {
        weeks.push(week);
      }

      const isDisabled = elem.disabled.indexOf(dateAsString) > -1;
      const isFocused = elem.focused === date.day && !date.siblingMonth;
      const isPreviouslySelected = elem.previouslySelected.indexOf(dateAsString) > -1;
      const isSelected = elem.selected.indexOf(dateAsString) > -1;
      const isSiblingMonth = date.siblingMonth;
      const isToday = date.day === now.getDate() &&
        date.month === now.getMonth() &&
        date.year === now.getFullYear();

      week.push(
        <DateComponent
          aria-live={isFocused ? 'polite' : ''}
          disabled={isDisabled}
          focused={isFocused}
          previouslySelected={isPreviouslySelected}
          selected={isSelected}
          sibling={isSiblingMonth}
          today={isToday}
          day={date.day.toString()}
          month={(date.month + 1).toString()}
          year={date.year.toString()}
          onClick={elem[$selectDay]}
        />
      );
    });

    return [
      <style>{css.toString()}</style>,
      <style>{cssDate.toString()}</style>,
      <Announcer>{new Date(elem.year, elem.month, elem.focused).toString()}</Announcer>,
      <table className={locals.calendar}>
        <caption>
          <div className={locals.heading}>
            <button className={classnames(locals.btn, locals.btnPrev)} onClick={elem[$prev]}>
              <AkIconArrowLeft />
            </button>
            <div className={locals.monthAndYear}>
              <span>{getMonthName(elem, elem.month)}</span>
              {' '}
              <span>{elem.year}</span>
            </div>
            <button className={classnames(locals.btn, locals.btnNext)} onClick={elem[$next]}>
              <AkIconArrowRight />
            </button>
          </div>
        </caption>
        <thead>
          <tr>
            {makeArrayFromNumber(daysPerWeek).map(i =>
              <th className={locals.dayOfWeek}>{getDayName(elem, i)}</th>
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
