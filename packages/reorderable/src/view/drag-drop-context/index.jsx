import React from 'react';
import Provider from './provider';

export default (Component: React$Element) => (
  <Provider>
    <Component />
  </Provider>
);
