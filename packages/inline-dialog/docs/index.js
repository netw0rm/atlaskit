import React from 'react';

/* eslint-disable import/no-duplicates, import/first */
import InlineDialogExample from './InlineDialogExample';
import inlineDialogExampleSrc from '!raw-loader!./InlineDialogExample';
import ComplexDialogExample from './ComplexDialogExample';
import complexDialogExampleSrc from '!raw-loader!./ComplexDialogExample';
/* eslint-enable import/no-duplicates, import/first */

export const description = (
  <div>
    <p>
      Inline Dialog components launch a modal that is displayed outside a block
      of content, and over the top of surrounding elements. They can be made to
      change position to fit in the page.
    </p>
    <p>
      The content takes two different react elements. The children, which are
      the elements the modal will appear around, and the content, which is the
      content within the modal.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Simple Example',
    Component: InlineDialogExample,
    src: inlineDialogExampleSrc,
  },
  {
    title: 'Simple Example',
    Component: ComplexDialogExample,
    src: complexDialogExampleSrc,
  },
];
