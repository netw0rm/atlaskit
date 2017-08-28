import React from 'react';
import { MultiSelectStateless } from '@atlaskit/multi-select';

export default (
  <MultiSelectStateless
    items={[]}
    label="Always loading..."
    isLoading
    loadingMessage="Custom loading message"
    isOpen
    shouldFitContainer
  />
);
