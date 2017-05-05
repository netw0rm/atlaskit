import React from 'react';

/* eslint-disable import/no-duplicates, import/first */
import ButtonGroupExample from './ButtonGroupExample';
import buttonGroupExampleSrc from '!raw-loader!./ButtonGroupExample';
/* eslint-enable import/no-duplicates, import/first */

export const description = (
  <p>
    Button groups allow you to group buttons and manage them as a block.
    This allows you to apply styles to a group of buttons more easily. Button
    groups will not cause any error if non-button elements are included,
    however will not necessarily fit neatly.
  </p>
);

export const examples = [
  {
    title: 'Appearance Options',
    Component: ButtonGroupExample,
    src: buttonGroupExampleSrc,
  },
];
