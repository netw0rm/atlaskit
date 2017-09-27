import React from 'react';

/* eslint-disable import/no-duplicates, import/first */
import ButtonGroupExample from './ButtonGroupExample';
import buttonGroupExampleSrc from '!raw-loader!./ButtonGroupExample';
/* eslint-enable import/no-duplicates, import/first */

export const description = (
  <div>
    <p>
      <strong>Note:</strong> Button group has been deprecated, and merged into
      the main @atlaskit/button package.
    </p>
    <p>
      Button groups allow you to group buttons and manage them as a block.
      This ensures the buttons are given correct spacing (with RTL support).
    </p>
  </div>
);

export const examples = [
  {
    title: 'Appearance Options',
    Component: ButtonGroupExample,
    src: buttonGroupExampleSrc,
  },
];
