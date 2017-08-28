import React from 'react';
import Select from '@atlaskit/multi-select';

export default (
  <Select
    items={[]}
    label="Always loading..."
    isLoading
    loadingMessage="Custom loading message"
    placeholder="Click here to check the loading state"
    shouldFitContainer
  />
);
