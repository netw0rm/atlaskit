import { action, storiesOf } from '@kadira/storybook';
import React from 'react';
import reactify from 'akutil-react';

import { name } from '../package.json';
import WebComponent from '../src';

const ReactComponent = reactify(WebComponent);
const now = new Date();
const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
const fixedDay1 = `${now.getFullYear()}-${now.getMonth() + 1}-08`;
const fixedDay2 = `${now.getFullYear()}-${now.getMonth() + 1}-17`;
const days = [today, fixedDay1, fixedDay2];

storiesOf(name, module)
  .add('default', () => (
    <ReactComponent />
  ))
  .add('disabled', () => (
    <ReactComponent disabled={days} />
  ))
  .add('focused', () => (
    <ReactComponent focused="8" />
  ))
  .add('previouslySelected', () => (
    <ReactComponent previouslySelected={days} />
  ))
  .add('selected', () => (
    <ReactComponent selected={days} />
  ))
  .add('month', () => (
    <ReactComponent month="12" />
  ))
  .add('year', () => (
    <ReactComponent year="1984" />
  ))
  .add('events', () => (
    <ReactComponent onAkCalendarSelect={action('select')} />
  ))
  .add('selecting a day', () => (
    <ReactComponent onAkCalendarSelect={({ detail, target }) => (target.selected = detail.date)} />
  ))
  .add('selecting multiple days', () => (
    <ReactComponent
      onAkCalendarSelect={({ detail, target }) => (
        target.selected = target.selected.concat(detail.date)
      )}
    />
  ));
