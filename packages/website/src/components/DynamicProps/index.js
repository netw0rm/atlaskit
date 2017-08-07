import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { borderRadius, colors, gridSize, math, themed } from '@atlaskit/theme';

import Description from './Description';
import { H2 } from './Heading';
import PrettyPropType from './PrettyPropType';

const Heading = styled.h3`
  border-bottom: 2px solid ${themed({ light: colors.N20, dark: colors.DN40 })};
  font-size: 0.9rem;
  font-weight: normal;
  line-height: 1.4;
  margin: 0 0 ${gridSize}px 0;
  padding-bottom: ${gridSize}px;
`;
const HeadingDefault = styled.code`
  color: ${themed({ light: colors.subtleText, dark: colors.subtleText })};
`;
const HeadingRequired = styled.span`
  color: ${themed({ light: colors.R500, dark: colors.R300 })};
`;
const HeadingType = styled.span`
  background: ${themed({ light: colors.B50, dark: colors.B500 })};
  border-radius: ${borderRadius}px;
  color: ${themed({ light: colors.B500, dark: colors.B50 })};
  display: inline-block;
  padding: 0 0.2em;
`;
const PropTypeWrapper = styled.div`
  margin-top: ${math.multiply(gridSize, 4)}px;
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
