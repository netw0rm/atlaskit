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
      This component displays content in a layer that sits above the rest of the
      page content. Users won&#39;t be able to interact with the page until the
      dialog is closed.
    </p>
    <p>
      To ensure you get the exit animation when dismissing a modal dialog, first
      set <code>isOpen</code> to <code>false</code>. Once the animation is finished
      the <code>onDialogDismissed</code> function prop will be called, at which
      point you can stop rendering the modal dialog.
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
