import { action, storiesOf } from '@kadira/storybook';
import React from 'react';
import reactify from 'akutil-react';

import { name } from '../package.json';
import WebComponent from '../src';

const ReactComponent = reactify(WebComponent);

storiesOf(name, module)
  .add('default', () => (
    <ReactComponent />
  ))
  .add('disabled: "2016-11-8"', () => (
    <ReactComponent disabled="2016-11-8" />
  ))
  .add("disabled: ['2016-11-8', '2016-11-10']", () => (
    <ReactComponent disabled={['2016-11-8', '2016-11-10']} />
  ))
  .add('focused: 8', () => (
    <ReactComponent focused="8" />
  ))
  .add('previouslySelected: "2016-11-8"', () => (
    <ReactComponent previouslySelected="2016-11-8" />
  ))
  .add("previouslySelected: ['2016-11-8', '2016-11-10']", () => (
    <ReactComponent previouslySelected={['2016-11-8', '2016-11-10']} />
  ))
  .add('selected: "2016-11-8"', () => (
    <ReactComponent selected="2016-11-8" />
  ))
  .add("selected: ['2016-11-8', '2016-11-10']", () => (
    <ReactComponent selected={['2016-11-8', '2016-11-10']} />
  ))
  .add('month: 12', () => (
    <ReactComponent month="12" />
  ))
  .add('year: 1984', () => (
    <ReactComponent year="1984" />
  ))
  .add('today + disabled', () => {
    const now = new Date();
    const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    return <ReactComponent disabled={today} />;
  })
  .add('events', () => (
    <ReactComponent onAkCalendarSelect={action('select')} />
  ))
  .add('selecting a day', () => (
    <ReactComponent onAkCalendarSelect={({ detail, target }) => (target.selected = `${detail.year}-${detail.month}-${detail.day}`)} />
  ))
  .add('selecting multiple days', () => (
    <ReactComponent onAkCalendarSelect={({ detail, target }) => (target.selected = target.selected.concat(`${detail.year}-${detail.month}-${detail.day}`))} />
  ));
