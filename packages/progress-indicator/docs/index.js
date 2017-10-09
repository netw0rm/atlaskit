import React from 'react';

/* eslint-disable import/no-duplicates, import/first */
import Example from './example';
import exampleSrc from '!raw-loader!./example';
/* eslint-enable import/no-duplicates, import/first */

export const description = (
  <div>
    <p>
      The progress dots are visual indicators used when stepping a user through
      a journey, to allow them to keep track of their progress.
    </p>
    <p>
      They are typically accompanied by a carousel or other such UI device.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Basic Usage',
    Component: Example,
    src: exampleSrc,
  },
];
