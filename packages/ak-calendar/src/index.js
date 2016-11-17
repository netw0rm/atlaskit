import { Calendar } from 'calendar-base';
import { style } from 'glamor';
import keycode from 'keycode';
import React, { Component, PropTypes } from 'react';

import {
  dateToString,
  getDayName,
  getMonthName,
  makeArrayFromNumber,
} from './util';
import {
  n80,
  n700,
  transparent,
  white,
} from './util.colors';
import AnnouncerFn from './index.Announcer';
import DateFn from './index.Date';

const arrowKeys = [keycode('down'), keycode('left'), keycode('right'), keycode('up')];
const daysPerWeek = 7;
const monthsPerYear = 12;
const cssPadding = '5px 0 10px 0';
const css = {
  btn: style({
    backgroundColor: transparent,
    border: 'none',
    color: n80,
    padding: cssPadding,
  }),
  btnNext: style({
    float: 'right',
  }),
  btnPrev: style({
    float: 'left',
  }),
  calendar: style({
    backgroundColor: n700,
    color: white,
    display: 'inline-block',
    padding: 10,
    textAlign: 'center',
  }),
  dayOfWeek: style({
    color: n80,
    fontSize: 8,
    textTransform: 'uppercase',
  }),
  heading: style({
    display: 'flex',
  }),
  monthAndYear: style({
    color: white,
    flexBasis: '100%',
    fontSize: 14,
    padding: cssPadding,
  }),
};

export default class extends Component {
  static get propTypes() {
    return {
      calendar: PropTypes.any,
      disabled: PropTypes.array,
      focused: PropTypes.number,
      month: PropTypes.number,
      onBlur: PropTypes.any,
      onChange: PropTypes.any,
      onFocus: PropTypes.any,
      onSelect: PropTypes.any,
      previouslySelected: PropTypes.array,
      selected: PropTypes.array,
      tabIndex: PropTypes.number,
      title: PropTypes.string,
      year: PropTypes.number,
    };
  }
  static get defaultProps() {
    const now = new Date();
    return {
      calendar: new Calendar({ siblingMonths: true, weekNumbers: true }),
      disabled: [],
      focused: 0,
      month: now.getMonth() + 1,
      onBlur: () => {},
      onChange: () => {},
      onFocus: () => {},
      onSelect: () => {},
      previouslySelected: [],
      selected: [],
      tabIndex: 0,
      title: 'Calendar',
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
      this.props.onFocus({ day: 1, month, year });
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

    this.props.onFocus({ day: focused, month, year });
  }
  next() {
    let { month, year } = this.props;
    if (month === monthsPerYear) {
      month = 1;
      year++;
    } else {
      month++;
    }
    this.props.onChange({ month, year });
  }
  prev() {
    let { month, year } = this.props;
    if (month === 1) {
      month = monthsPerYear;
      year--;
    } else {
      month--;
    }
    this.props.onChange({ month, year });
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

      week.push(
        <DateFn
          aria-live={isFocused ? 'polite' : ''}
          disabled={isDisabled}
          focused={isFocused}
          key={dateAsString}
          previouslySelected={isPreviouslySelected}
          selected={isSelected}
          sibling={isSiblingMonth}
          day={date.day.toString()}
          onClick={() => this.props.onSelect({ day: date.day, month, year })}
        />
      );
    });

    return (
      // There's no interactive element to trap keyboard events on so we must trap them here so
      // that we can navigate the keyboard for them.
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        aria-label={this.props.title}
        onBlur={() => this.props.onBlur()}
        onKeyDown={e => this.navigateWithKeyboard(e)}
        tabIndex={this.props.tabIndex}
      >
        <AnnouncerFn>{new Date(year, month, focused).toString()}</AnnouncerFn>
        <table {...css.calendar}>
          <caption>
            <div {...css.heading}>
              <button {...css.btn} {...css.btnPrev} onClick={() => this.prev()}>
                &prev;
              </button>
              <div {...css.monthAndYear}>
                <span>{getMonthName(month)}</span>
                {' '}
                <span>{year}</span>
              </div>
              <button {...css.btn} {...css.btnNext} onClick={() => this.next()}>
                &next;
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
