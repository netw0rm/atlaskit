import { action, storiesOf } from '@kadira/storybook';
import React from 'react';

import { name } from '../package.json';
import { dateToString } from '../src/util';
import AkCalendarSmart, { AkCalendar } from '../src';

const now = new Date();
const today = now.getDate();
const thisMonth = now.getMonth() + 1;
const thisYear = now.getFullYear();

const notToday = today === 10 ? 11 : 10;
const notThisMonth = thisMonth === 10 ? 11 : 10;
const notThisYear = thisYear + 1;

function getDate(day = today) {
  return dateToString({ day, month: thisMonth, year: thisYear });
}

function getDates() {
  return [getDate(), getDate(3), getDate(20)];
}

storiesOf(name, module)
  .add('smart', () => (
    <AkCalendarSmart />
  ))
  .add('onBlur', () => (
    <AkCalendar onBlur={action('blur')} />
  ))
  .add('onChange', () => (
    <AkCalendar onChange={action('change')} />
  ))
  .add('onSelect', () => (
    <AkCalendar onSelect={action('select')} />
  ))
  .add('disabled', () => (
    <AkCalendar disabled={getDates()} />
  ))
  .add('focused (today)', () => (
    <AkCalendar focused={today} />
  ))
  .add('focused (not today)', () => (
    <AkCalendar focused={notToday} />
  ))
  .add('month', () => (
    <AkCalendar month={notThisMonth} />
  ))
  .add('previouslySelected', () => (
    <AkCalendar previouslySelected={getDates()} />
  ))
  .add('selected', () => (
    <AkCalendar selected={getDates()} />
  ))
  .add('year', () => (
    <AkCalendar year={notThisYear} />
  ));
