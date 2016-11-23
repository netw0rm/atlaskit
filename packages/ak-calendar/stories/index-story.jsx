import { action, storiesOf } from '@kadira/storybook';
import React, { Component } from 'react';

import { name } from '../package.json';
import { pad } from '../src/util';
import Calendar from '../src';

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

class Smart extends Component {
  state = {
    focused: 0,
    month: 4,
    year: 2018,
  }
  handleChange = (data) => {
    this.setState({
      focused: data.day,
      month: data.month,
      year: data.year,
    });
  }
  render() {
    return <Calendar onChange={this.handleChange} {...this.state} />;
  }
}

storiesOf(name, module)
  .add('smart', () => (
    <Smart />
  ))
  .add('onBlur', () => (
    <Calendar onBlur={action('blur')} />
  ))
  .add('onChange', () => (
    <Calendar onChange={action('change')} />
  ))
  .add('onSelect', () => (
    <Calendar onSelect={action('select')} />
  ))
  .add('disabled', () => (
    <Calendar disabled={getDates()} />
  ))
  .add('focused (today)', () => (
    <Calendar focused={today} />
  ))
  .add('focused (not today)', () => (
    <Calendar focused={notToday} />
  ))
  .add('month', () => (
    <Calendar month={notThisMonth} />
  ))
  .add('previouslySelected', () => (
    <Calendar previouslySelected={getDates()} />
  ))
  .add('selected', () => (
    <Calendar selected={getDates()} />
  ))
  .add('year', () => (
    <Calendar year={notThisYear} />
  ));
