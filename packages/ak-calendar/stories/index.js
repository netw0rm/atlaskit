import { action, storiesOf } from '@kadira/storybook';
import React from 'react';

import { pad } from '../src/util';
import Component from '../src';

const now = new Date();
const today = now.getDate();
const month = now.getMonth() + 1;
const year = now.getFullYear();

const notToday = today === 10 ? 11 : 10;
const notThisMonth = month === 10 ? 11 : 10;
const notThisYear = year + 1;

function getDate(day = today) {
  return `${year}-${pad(month)}-${pad(day)}`;
}

function getDates() {
  return [getDate(), getDate(3), getDate(20)];
}

storiesOf('Basic', module)
  .add('empty', () => (
    <Component />
  ));

storiesOf('Events', module)
  .add('onBlur', () => (
    <Component onBlur={action('blur')} />
  ))
  .add('onChange', () => (
    <Component onChange={action('change')} />
  ))
  .add('onFocus', () => (
    <Component onFocus={action('focus')} />
  ))
  .add('onSelect', () => (
    <Component onSelect={action('select')} />
  ));

storiesOf('Props', module)
  .add('disabled', () => (
    <Component disabled={getDates()} />
  ))
  .add('focused (today)', () => (
    <Component focused={today} />
  ))
  .add('focused (not today)', () => (
    <Component focused={notToday} />
  ))
  .add('month', () => (
    <Component month={notThisMonth} />
  ))
  .add('previouslySelected', () => (
    <Component previouslySelected={getDates()} />
  ))
  .add('selected', () => (
    <Component selected={getDates()} />
  ))
  .add('year', () => (
    <Component year={notThisYear} />
  ));
