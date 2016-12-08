import { Calendar } from 'calendar-base';
import ArrowleftIcon from 'ak-icon/glyph/arrowleft';
import ArrowrightIcon from 'ak-icon/glyph/arrowright';
import keycode from 'keycode';
import React, { PureComponent, PropTypes } from 'react';

import {
  dateToString,
  getDayName,
  getMonthName,
  makeArrayFromNumber,
} from './util';
import AnnouncerFn from './Announcer';
import Btn from './Btn';
import DateFn from './Date';
import styles from './style';

const arrowKeys = [keycode('down'), keycode('left'), keycode('right'), keycode('up')];
const css = styles();
const daysPerWeek = 7;
const monthsPerYear = 12;

export default class StatelessCalendar extends PureComponent {
  static propTypes = {
    /**
     * @description The ISO date that represents today.
     * @default current ISO date
     * @type {number}
     */
    today: PropTypes.string,

    /**
     * @description The ISO dates that are disabled.
     * @default []
     * @type {array.<string>}
     */
    disabled: PropTypes.arrayOf(PropTypes.string),

    /**
     * @description The day number that is currently focused.
     * @default 0
     * @type {number}
     */
    focused: PropTypes.number,

    /**
     * @description The month to display (1 - 12).
     * @default current month
     * @type {number}
     */
    month: PropTypes.number,

    /**
     * @description Function called when the calendar is un-focused.
     * @default function(){}
     * @type {func}
     */
    onBlur: PropTypes.func,

    /**
     * @description Function called when the focused date changes.
     * @default function(){}
     * @type {func}
     */
    onChange: PropTypes.func,

    /**
     * @description Function called when a date on the calendar is selected via the keyboard or
     *   mouse.
     * @default function(){}
     * @type {func}
     */
    onSelect: PropTypes.func,

    /**
     * @description The ISO dates that were previously selected.
     * @default []
     * @type {array.<string>}
     */
    previouslySelected: PropTypes.arrayOf(PropTypes.string),

    /**
     * @description The ISO dates that currently selected.
     * @default []
     * @type {array.<string>}
     */
    selected: PropTypes.arrayOf(PropTypes.string),

    /**
     * @description The full year to display.
     * @default current year
     * @type {number}
     */
    year: PropTypes.number,
  }

  static get defaultProps() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    return {
      disabled: [],
      focused: 0,
      month,
      onBlur() {},
      onChange() {},
      onSelect() {},
      previouslySelected: [],
      selected: [],
      today: dateToString({ day, month, year }),
      year,
    };
  }

  constructor(props) {
    super(props);
    this.calendar = new Calendar({
      siblingMonths: true,
      weekNumbers: true,
    });
  }

  handleKeyDown = (e) => {
    const { focused, month, year } = this.props;
    const key = e.keyCode;
    const isArrowKey = arrowKeys.indexOf(key) > -1;
    const isInitialArrowKeyPress = !focused && isArrowKey;

    if (isInitialArrowKeyPress) {
      this.triggerOnChange(year, month, 1);
      return;
    }

    // TODO break this down into separate functions.
    if (key === keycode('down')) {
      const next = focused + daysPerWeek;
      const daysInMonth = Calendar.daysInMonth(year, month - 1);

      if (next > daysInMonth) {
        const { month: nextMonth, year: nextYear } = this.nextMonth();
        this.triggerOnChange(nextYear, nextMonth, next - daysInMonth);
      } else {
        this.triggerOnChange(year, month, next);
      }
    } else if (key === keycode('left')) {
      const prev = focused - 1;

      if (prev < 1) {
        const { month: prevMonth, year: prevYear } = this.prevMonth();
        const prevDay = Calendar.daysInMonth(prevYear, prevMonth - 1);
        this.triggerOnChange(prevYear, prevMonth, prevDay);
      } else {
        this.triggerOnChange(year, month, prev);
      }
    } else if (key === keycode('right')) {
      const next = focused + 1;
      const daysInMonth = Calendar.daysInMonth(year, month - 1);

      if (next > daysInMonth) {
        const { month: nextMonth, year: nextYear } = this.nextMonth();
        this.triggerOnChange(nextYear, nextMonth, 1);
      } else {
        this.triggerOnChange(year, month, next);
      }
    } else if (key === keycode('up')) {
      const prev = focused - daysPerWeek;

      if (prev < 1) {
        const { month: prevMonth, year: prevYear } = this.prevMonth();
        const prevDay = Calendar.daysInMonth(prevYear, prevMonth - 1) + prev;
        this.triggerOnChange(prevYear, prevMonth, prevDay);
      } else {
        this.triggerOnChange(year, month, prev);
      }
    } else if (key === keycode('enter') || key === keycode('space')) {
      const { focused: selectFocused, month: selectMonth, year: selectYear } = this.props;
      this.triggerOnSelect(selectYear, selectMonth, selectFocused);
    }
  }

  handleClickDay = ({ year, month, day }) => {
    this.triggerOnSelect(year, month, day);
  }

  handleClickNext = () => {
    const { focused: day, month, year } = { ...this.props, ...this.nextMonth() };
    this.props.onChange({ day, month, year });
  }

  handleClickPrev = () => {
    const { focused: day, month, year } = { ...this.props, ...this.prevMonth() };
    this.props.onChange({ day, month, year });
  }

  triggerOnChange = (year, month, day) => {
    const iso = dateToString({ year, month, day });
    this.props.onChange({ day, month, year, iso });
  }

  triggerOnSelect = (year, month, day) => {
    const iso = dateToString({ year, month, day });
    this.props.onSelect({ day, month, year, iso });
  }

  nextMonth() {
    let { month, year } = this.props;

    if (month === monthsPerYear) {
      month = 1;
      year++;
    } else {
      month++;
    }

    return { month, year };
  }

  prevMonth() {
    let { month, year } = this.props;

    if (month === 1) {
      month = monthsPerYear;
      year--;
    } else {
      month--;
    }

    return { month, year };
  }

  render() {
    const { disabled, focused, month, previouslySelected, selected, today, year } = this.props;
    const calendar = this.calendar.getCalendar(year, month - 1);
    const weeks = [];
    const shouldDisplaySixthWeek = calendar.length % 6;

    if (shouldDisplaySixthWeek) {
      const lastDayIsSibling = calendar[calendar.length - 1].siblingMonth;
      const sliceStart = lastDayIsSibling ? daysPerWeek : 0;

      calendar.push(
        ...this.calendar.getCalendar(year, month)
          .slice(sliceStart, sliceStart + daysPerWeek)
          .map(e => ({ ...e, siblingMonth: true }))
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
      const isToday = today === dateAsString;

      week.push(
        <DateFn
          disabled={isDisabled}
          focused={isFocused}
          key={dateAsString}
          isToday={isToday}
          month={date.month + 1}
          onClick={this.handleClickDay}
          previouslySelected={isPreviouslySelected}
          selected={isSelected}
          sibling={isSiblingMonth}
          year={date.year}
        >{date.day}</DateFn>
      );
    });

    return (
      // There's no interactive element to trap keyboard events on so we must trap them here so
      // that we can navigate the keyboard for them. The aria role of "grid" here will hint to
      // screen readers that it can be navigated with the keyboard, but the linter still fails.
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        onBlur={this.props.onBlur}
        onKeyDown={this.handleKeyDown}
      >
        <AnnouncerFn>{new Date(year, month, focused).toString()}</AnnouncerFn>
        <div
          aria-label="calendar"
          role="grid"
          tabIndex={0}
          {...css.wrapper}
        >
          <div {...css.heading}>
            <div onClick={this.handleClickPrev} aria-hidden="true">
              <Btn>
                <ArrowleftIcon />
              </Btn>
            </div>
            <div {...css.monthAndYear}>
              {`${getMonthName(month)} ${year}`}
            </div>
            <div onClick={this.handleClickNext} aria-hidden="true">
              <Btn>
                <ArrowrightIcon />
              </Btn>
            </div>
          </div>
          <table {...css.calendar} role="presentation">
            <thead style={{ border: 0 }}>
              <tr>
                {makeArrayFromNumber(daysPerWeek).map(i =>
                  <th
                    {...css.dayOfWeek}
                    key={i}
                    style={{ border: 0, padding: '2px 5px' }}
                  >{getDayName(i)}</th>
                )}
              </tr>
            </thead>
            <tbody style={{ border: 0 }}>
              {weeks.map((week, i) => <tr key={i}>{week}</tr>)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
