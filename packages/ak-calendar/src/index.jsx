import { Calendar } from 'calendar-base';
import { ArrowleftIcon, ArrowrightIcon } from 'ak-icon';
import keycode from 'keycode';
import reactify from 'akutil-react';
import React, { Component, PropTypes } from 'react';

import {
  dateToString,
  getDayName,
  getMonthName,
  makeArrayFromNumber,
} from './util';
import AnnouncerFn from './Announcer';
import DateFn from './Date';
import styles from './style';

const arrowKeys = [keycode('down'), keycode('left'), keycode('right'), keycode('up')];
const css = styles();
const daysPerWeek = 7;
const monthsPerYear = 12;

const ReactArrowleftIcon = reactify(ArrowleftIcon);
const ReactArrowrightIcon = reactify(ArrowrightIcon);

export default class extends Component {
  static get propTypes() {
    return {
      calendar: PropTypes.any,
      day: PropTypes.number,
      disabled: PropTypes.arrayOf(PropTypes.string),
      focused: PropTypes.number,
      month: PropTypes.number,
      onBlur: PropTypes.func,
      onChange: PropTypes.func,
      onSelect: PropTypes.func,
      previouslySelected: PropTypes.arrayOf(PropTypes.string),
      selected: PropTypes.array(PropTypes.string),
      year: PropTypes.number,
    };
  }
  static get defaultProps() {
    const now = new Date();
    return {
      calendar: new Calendar({ siblingMonths: true, weekNumbers: true }),
      day: now.getDate(),
      disabled: [],
      focused: 0,
      month: now.getMonth() + 1,
      onBlur() {},
      onChange() {},
      onSelect() {},
      previouslySelected: [],
      selected: [],
      year: now.getFullYear(),
    };
  }
  navigateWithKeyboard(e) {
    let { focused } = this.props;
    const { month, year } = this.props;
    const key = e.keyCode;
    const isArrowKey = arrowKeys.indexOf(key) > -1;
    const isInitialArrowKeyPress = !focused && isArrowKey;

    if (isInitialArrowKeyPress) {
      this.props.onChange({ day: 1, month, year });
      return;
    }

    // TODO break this down into separate functions.
    if (key === keycode('down')) {
      const next = focused + daysPerWeek;
      const daysInMonth = Calendar.daysInMonth(this.year, this.month - 1);

      if (next > daysInMonth) {
        this.next();
        focused = next - daysInMonth;
      } else {
        focused = next;
      }
    } else if (key === keycode('left')) {
      const next = focused - 1;

      if (next < 1) {
        this.prev();
        focused = Calendar.daysInMonth(this.year, this.month - 1);
      } else {
        focused = next;
      }
    } else if (key === keycode('right')) {
      const next = focused + 1;
      const daysInMonth = Calendar.daysInMonth(this.year, this.month - 1);

      if (next > daysInMonth) {
        this.next();
        focused = 1;
      } else {
        focused = next;
      }
    } else if (key === keycode('up')) {
      const next = focused - daysPerWeek;

      if (next < 1) {
        this.prev();
        focused = Calendar.daysInMonth(this.year, this.month - 1) + next;
      } else {
        focused = next;
      }
    } else if (key === keycode('enter') || key === keycode('space')) {
      this.props.onSelect({ day: focused, month, year });
      return;
    } else {
      return;
    }

    this.props.onChange({ day: focused, month, year });
  }
  next() {
    const { focused } = this.props;
    let { month, year } = this.props;

    if (month === monthsPerYear) {
      month = 1;
      year++;
    } else {
      month++;
    }

    this.props.onChange({ day: focused, month, year });
  }
  prev() {
    const { focused } = this.props;
    let { month, year } = this.props;

    if (month === 1) {
      month = monthsPerYear;
      year--;
    } else {
      month--;
    }

    this.props.onChange({ day: focused, month, year });
  }
  render() {
    const { disabled, focused, month, previouslySelected, selected, year } = this.props;
    const calendar = this.props.calendar.getCalendar(year, month - 1);
    const weeks = [];
    const shouldDisplaySixthWeek = calendar.length % 6;

    if (shouldDisplaySixthWeek) {
      const lastDayIsSibling = calendar[calendar.length - 1].siblingMonth;
      const sliceStart = lastDayIsSibling ? daysPerWeek : 0;

      calendar.push(
        ...this.props.calendar.getCalendar(year, month)
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

      const isDisabled = disabled.indexOf(dateAsString) > -1;
      const isFocused = focused === date.day && !date.siblingMonth;
      const isPreviouslySelected = previouslySelected.indexOf(dateAsString) > -1;
      const isSelected = selected.indexOf(dateAsString) > -1;
      const isSiblingMonth = date.siblingMonth;
      const isToday = date.day === this.props.day &&
        date.month === this.props.month &&
        date.year === this.props.year;

      week.push(
        <DateFn
          aria-live={isFocused ? 'polite' : ''}
          disabled={isDisabled}
          focused={isFocused}
          key={dateAsString}
          onClick={() => this.props.onSelect({ day: date.day, month, year })}
          previouslySelected={isPreviouslySelected}
          selected={isSelected}
          sibling={isSiblingMonth}
          today={isToday}
        >{date.day}</DateFn>
      );
    });

    return (
      // There's no interactive element to trap keyboard events on so we must trap them here so
      // that we can navigate the keyboard for them. The aria role of "grid" here will hint to
      // screen readers that it can be navigated with the keyboard, but the linter still fails.
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        aria-label="calendar"
        onBlur={() => this.props.onBlur()}
        onKeyDown={e => this.navigateWithKeyboard(e)}
        role="grid"
        tabIndex={0}
      >
        <AnnouncerFn>{new Date(year, month, focused).toString()}</AnnouncerFn>
        <table {...css.calendar}>
          <caption>
            <div {...css.heading}>
              <button {...css.btn} {...css.btnPrev} onClick={() => this.prev()}>
                <ReactArrowleftIcon />
              </button>
              <div {...css.monthAndYear}>
                {`${getMonthName(month)} ${year}`}
              </div>
              <button {...css.btn} {...css.btnNext} onClick={() => this.next()}>
                <ReactArrowrightIcon />
              </button>
            </div>
          </caption>
          <thead>
            <tr>
              {makeArrayFromNumber(daysPerWeek).map(i =>
                <th {...css.dayOfWeek} key={i}>{getDayName(i)}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, i) => <tr key={i}>{week}</tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}
