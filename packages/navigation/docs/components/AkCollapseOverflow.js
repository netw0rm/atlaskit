import React from 'react';

export const description = (
  <div>
    <p>
      A wrapper for your container navigation children which renders as many children that will fit
      inside the available vertical space, then placing any remaining children inside a dropdown
      menu.
    </p>
    <p>
      Note that this component should only be used when the Navigation is in its collapsed mode,
      which you can detect via the Navigation.onResize prop callback.
    </p>
    <p>
      Because this component is only ever used in a collapsed Navigation mode, and similarly the
      optional drag-and-drop behaviour is only used in an un-collapsed Navigation mode, the two
      features should never be in use at the same time.
    </p>
  </div>
);

export const examples = [];

export const byline = 'Wrapper for collapsed Navigation children that places any overflowing children in a dropdown menu.';
