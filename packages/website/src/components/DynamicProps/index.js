import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Description from './Description';
import { H2 } from './Heading';
import PrettyPropType from './PrettyPropType';

import { theme, themeValue } from '../../../../theme/src';
import './theme';

const Heading = styled.h3`
  border-bottom: 2px solid ${themeValue('dynamicProps.heading.borderColor')};
  font-size: 0.9rem;
  font-weight: normal;
  line-height: 1.4;
  margin: 0 0 ${p => theme(p).base.gridSize}px 0;
  padding-bottom: ${p => theme(p).base.gridSize}px;
`;
const HeadingDefault = styled.code`
  color: ${themeValue('dynamicProps.heading.defaultValue')};
`;
const HeadingRequired = styled.span`
  color: ${themeValue('dynamicProps.heading.required')};
`;
const HeadingType = styled.span`
  background: ${themeValue('dynamicProps.heading.type.background')};
  border-radius: ${themeValue('base.borderRadius')}px;
  color: ${themeValue('dynamicProps.heading.type.text')};
  display: inline-block;
  padding: 0 0.2em;
`;
const PropTypeWrapper = styled.div`
  margin-top: ${p => theme(p).base.gridSize * 4}px;
`;

// Disable prop types validation for internal functional components
/* eslint-disable react/prop-types */

const PageWrapper = ({ name, children }) => (
  <div>
    <H2>{name ? `${name} ` : ''}Props</H2>
    {children}
  </div>
);

const PropTypeHeading = ({ defaultValue, name, required, type }) => (
  <Heading>
    <code>
      <HeadingType>{type.name}</HeadingType> {name}
      {defaultValue ? <HeadingDefault> = {defaultValue.value}</HeadingDefault> : null}
      {required ? <HeadingRequired> required</HeadingRequired> : null}
    </code>
  </Heading>
);

/* eslint-enable react/prop-types */

export default class DynamicProps extends PureComponent {
  static propTypes = {
    componentName: PropTypes.string,
    /* eslint-disable react/forbid-prop-types */
    componentDocs: PropTypes.object.isRequired,
    /* eslint-enable react/forbid-prop-types */
  }
  render() {
    const { componentName, componentDocs } = this.props;

    if (!componentDocs || !componentDocs.props || !!componentDocs.props.length) {
      return (
        <PageWrapper name={componentName}>
          <Description>There are no props for this component.</Description>
        </PageWrapper>
      );
    }

    const propTypes = Object.keys(componentDocs.props);

    return (
      <PageWrapper name={componentName}>
        {propTypes.map((propName) => {
          const prop = componentDocs.props[propName];
          if (!prop.type) {
            console.error(`${componentName} prop ${propName} has no type; this usually indicates invalid propType or defaultProps config`); // eslint-disable-line no-console
            return null;
          }
          return (
            <PropTypeWrapper key={propName}>
              <PropTypeHeading
                defaultValue={prop.defaultValue}
                name={propName}
                required={prop.required}
                type={prop.type}
              />
              {prop.description && <div>{prop.description}</div>}
              <PrettyPropType type={prop.type} />
            </PropTypeWrapper>
          );
        })}
      </PageWrapper>
    );
  }
}
