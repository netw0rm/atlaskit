import React from 'react';

/* eslint-disable import/no-duplicates, import/first */
import Examples from './Examples';
import examplesSrc from '!raw-loader!./Examples';
import WidthExamples from './WidthExamples';
import widthExamplesSrc from '!raw-loader!./WidthExamples';
/* eslint-enable import/no-duplicates, import/first */

export const description = (
  <div>
    <p>
      Modal Dialogs are useful and interesting.
    </p>
  </div>
);

export const examples = [

  {
    title: 'Basic Usage',
    Component: Examples,
    src: examplesSrc,
  },
  {
    title: 'Example Width Options',
    Component: WidthExamples,
    src: widthExamplesSrc,
  },
];
