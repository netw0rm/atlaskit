/* eslint-disable react/prop-types */

import React from 'react';
import { DynamicProps } from '@atlaskit/util-readme';
import styled from 'styled-components';

import Example from './ComponentExample';

const Title = styled.h2`
  margin-top: 30px !important;
  margin-bottom: 10px;
`;

const ComponentDocs = ({ component: { docs } }) => {
  if (typeof docs === 'function') {
    const Docs = docs;
    return <Docs />;
  }
  if (typeof docs === 'object') {
    return (
      <div>
        {docs.description}
        {Array.isArray(docs.examples) && docs.examples.length ? (
          <div>
            <Title>Examples</Title>
            {docs.examples.map((eg, i) => <Example key={i} {...eg} />)}
          </div>
        ) : null}
        <DynamicProps componentSrc={docs.componentSource} />
      </div>
    );
  }
  return <div>No Docs Yet</div>;
};

export default ComponentDocs;
