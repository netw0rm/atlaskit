// @flow
import React from 'react';
import DragHandle from './drag-handle';
import type { Callbacks } from './drag-handle';

export default (callbacks: Callbacks) => (isEnabled: boolean) => (el: React$Element<*>) => (
  <DragHandle
    {...callbacks}
    isEnabled={isEnabled}
  >
    {el}
  </DragHandle>
);
