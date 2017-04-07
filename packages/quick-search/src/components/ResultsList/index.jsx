import React from 'react';

// eslint-disable-next-line react/prop-types
const ResultsList = ({ items }) =>
  <div>{items || 'No matching results found'}</div>;

export default ResultsList;
