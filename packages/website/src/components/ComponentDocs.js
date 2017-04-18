/* eslint-disable react/prop-types */

import React from 'react';

const ComponentDocs = ({ component }) => {
  const Docs = component.docs;
  return (
    Docs ? <Docs /> : <div>No Docs Yet</div>
  );
};

export default ComponentDocs;
