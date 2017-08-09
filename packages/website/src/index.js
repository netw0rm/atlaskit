import React from 'react';
import ReactDOM from 'react-dom';

// import '@atlaskit/css-reset';
import App from './containers/App';
import { CodeBlock } from './components/Docs';

export default { CodeBlock };

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
