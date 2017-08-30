import React from 'react';
import { gridSize } from '../../../src/shared-variables';

export default (
  <p style={{ padding: gridSize * 2 }}>
    <strong>Usage note:</strong> Drag and drop should only be used when the Navigation
    is in an uncollapsed state. It can be used alongside AkCollapseOverflow, which should
    only be used when the Navigation is in a collapsed state. For this reason, you can
    include both reorder and AkCollapseOverflow functionalities in your view logic, but they
    should never be in effect at the same time.
Add a comment to this line
  </p>
);
