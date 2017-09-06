import { action, storiesOf } from '@kadira/storybook';
import React from 'react';

import { name } from '../package.json';
import { dateToString } from '../src/util';
import Calendar, { CalendarStateless } from '../src';

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

const imports = [['React', 'react'], ['Calendar, { StatelessCalendar }', '@atlaskit/calendar']];

storiesOf(name, module)
  .addCodeExampleStory('smart', () => (
    <Calendar />
  ), { imports })
  .addCodeExampleStory('onBlur', () => (
    <CalendarStateless onBlur={action('blur')} />
  ), { imports, overrides: { onBlur: "action('blur')" } })
  .addCodeExampleStory('onChange', () => (
    <CalendarStateless onChange={action('change')} />
  ), { imports, overrides: { onChange: "action('change')" } })
  .addCodeExampleStory('onSelect', () => (
    <CalendarStateless onSelect={action('select')} />
  ), { imports, overrides: { onSelect: "action('select')" } })
  .addCodeExampleStory('disabled', () => (
    <CalendarStateless disabled={getDates()} />
  ), { imports })
  .addCodeExampleStory('focused (today)', () => (
    <CalendarStateless focused={today} />
  ), { imports })
  .addCodeExampleStory('focused (not today)', () => (
    <CalendarStateless focused={notToday} />
  ), { imports })
  .addCodeExampleStory('month', () => (
    <CalendarStateless month={notThisMonth} />
  ), { imports })
  .addCodeExampleStory('previouslySelected', () => (
    <CalendarStateless previouslySelected={getDates()} />
  ), { imports })
  .addCodeExampleStory('selected', () => (
    <CalendarStateless selected={getDates()} />
  ), { imports })
  .addCodeExampleStory('year', () => (
    <CalendarStateless year={notThisYear} />
  ), { imports });
