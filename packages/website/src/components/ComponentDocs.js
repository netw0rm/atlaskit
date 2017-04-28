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

function renderProps(comp, i) {
  if (Array.isArray(comp)) {
    return comp.map(renderProps);
  }
  if (typeof comp === 'object' && typeof comp.src === 'string') {
    return <DynamicProps key={i} componentName={comp.name} componentSrc={comp.src} />;
  }
  if (typeof comp === 'string') {
    return <DynamicProps componentSrc={comp} />;
  }
  return null;
}

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
        {renderProps(docs.componentSource)}
      </div>
    );
  }
  return (
    <div>
      See the <a href={getStorybookURL(component)} target="_blank" rel="noopener noreferrer">
        {component.name} Storybook
      </a> for usage and docs.
    </div>
  );
};

export default ComponentDocs;
