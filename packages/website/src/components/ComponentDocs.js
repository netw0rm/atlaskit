/* eslint-disable react/prop-types */

import React from 'react';
import { DynamicProps } from '@atlaskit/util-readme';
import styled from 'styled-components';

import Example from './ComponentExample';

import { getStorybookURL } from '../utils';

const Title = styled.h2`
  margin-top: 30px !important;
  margin-bottom: 10px;
`;

const ComponentDocs = ({ component }) => {
  const { docs } = component;
  if (docs && typeof docs.default === 'function') {
    const Docs = docs.default;
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
        {typeof docs.componentSource === 'string'
          ? <DynamicProps componentSrc={docs.componentSource} />
          : null}
      </div>
    );
  }
  return (
    <div>
      See the <a href={getStorybookURL(component)} target="_blank">
        {component.name} Storybook
      </a> for usage and docs.
    </div>
  );
};

export default ComponentDocs;
