import * as React from 'react';

declare global {
  interface Window {
    React: typeof React;
    ReactDOM: any;
  }
}
