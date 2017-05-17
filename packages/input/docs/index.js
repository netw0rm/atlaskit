import React from 'react';
import { Link } from 'react-router-dom';

/* eslint-disable import/no-duplicates, import/first */
import Example from './Example';
import ExampleSrc from '!raw-loader!./Example';
/* eslint-enable import/no-duplicates, import/first */

export const description = (
  <div>
    <p>
      <b>Note:</b> The input component is used internally by atlaskit, and is
      used to be passed in to <Link to="/components/inline-edit">Inline Edit</Link> component.
      You should use the text field component if you need one.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Example',
    Component: Example,
    src: ExampleSrc,
  },
];
