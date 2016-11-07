import { storiesOf } from '@kadira/storybook';
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
  .add('disableNavigation: true', () => (
    <ReactComponent disableNavigation />
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
  ));
