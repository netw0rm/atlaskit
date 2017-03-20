// @flow
import React from 'react';
import DragHandle from './drag-handle';
// eslint-disable-next-line no-duplicate-imports
import type { Callbacks } from './drag-handle';

export default (callbacks: Callbacks) => (isEnabled: boolean) => (el: React$Element<*>) => (
  <DragHandle
    {...callbacks}
    isEnabled={isEnabled}
  >
    {el}
  </DragHandle>
);
