import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { borderRadius, colors, gridSize, math, themed } from '@atlaskit/theme';

const Wrapper = styled.code`
  display: inline-block;
  font-size: 0.8rem;
  line-height: 1.4;
  margin-bottom: ${gridSize}px;
  margin-top: ${gridSize}px;
`;
const Block = styled.span`
  display: block;
`;
const TypeMinWidth = styled.span`
  display: inline-block;
  min-width: 60px;
`;
const Type = styled.span`
  background-color: ${themed({ light: colors.P50, dark: colors.P500 })};
  border-radius: ${borderRadius}px;
  color: ${themed({ light: colors.P500, dark: colors.P50 })};
  display: inline-block;
  margin: 2px 0;
  padding: 0 0.2em;
`;
const TypeMeta = styled(Type)`
  background-color: ${themed({ light: colors.N20, dark: colors.DN50 })};
  color: ${themed({ light: colors.subtleText, dark: colors.subtleText })};
`;
const StringType = styled(Type)`
  background-color: ${themed({ light: colors.G50, dark: colors.G500 })};
  color: ${themed({ light: colors.G500, dark: colors.G100 })};
`;
const InstanceType = styled(Type)`
  background-color: ${themed({ light: colors.Y50, dark: colors.G500 })};
  color: ${themed({ light: colors.Y500, dark: colors.G100 })};
`;
const Required = styled.span`
  color: ${themed({ light: colors.R500, dark: colors.R300 })};
`;
const Outline = styled.span`
  color: ${themed({ light: colors.subtleText, dark: colors.subtleText })};
  line-height: 1;
`;
const Invalid = styled.span`
  color: ${themed({ light: colors.N80, dark: colors.DN80 })};
  margin: ${math.divide(gridSize, 2)}px;
`;

const SIMPLE_TYPES = ['array', 'boolean', 'function', 'number', 'string',
  'symbol', 'node', 'element', 'custom', 'any', 'void', 'mixed'];

/* eslint-disable no-use-before-define */
/* eslint-disable prefer-rest-params */
function printComplexType(type) {
  if (typeof type === 'object' && !SIMPLE_TYPES.includes(type.kind)) {
    return print(...arguments);
  }
  return null;
}
/* eslint-enable no-use-before-define */
/* eslint-enable prefer-rest-params */

function print(type, depth = 1) {
  const Indent = ({ children }) => (
    <div style={{ paddingLeft: '1.3em' }}>{children}</div>
  );
  Indent.propTypes = { children: PropTypes.node };

  if (type.kind === 'string' || type.kind === 'stringLiteral') {
    if (type.value) {
      return <StringType>{'"'}{type.value}{'"'}</StringType>;
    }
    return <Type>{type.kind}</Type>;
  }

  if (type.kind === 'number' || type.kind === 'numberLiteral') {
    if (type.value) {
      return <StringType>{type.value}</StringType>;
    }
    return <Type>{type.kind}</Type>;
  }

  // make sure we have an object; we should always have an object!!!
  if (typeof type !== 'object') {
    return (
      <div>ERROR: TYPEOF type === {typeof type}</div>
    );
  }

  if (type.kind === 'object') {
    return (
      <span>
        <TypeMeta>Shape <Outline>{'{'}</Outline></TypeMeta>
        <Indent>
          {type.props.map(prop => (
            <div key={prop.key}>
              <TypeMinWidth><Type>{prop.key}</Type></TypeMinWidth>
              {' '}{prop.value.kind}
              {prop.optional ? null : <Required> required</Required>}
              {' '}{printComplexType(prop.value, depth + 1)}
            </div>
          ))}
        </Indent>
        <TypeMeta><Outline>{'}'}</Outline></TypeMeta>
      </span>
    );
  }

  if (type.name === 'enum') {
    if (typeof type.value === 'string') {
      return (
        <span>
          <TypeMeta>One of <Outline>{'('}</Outline></TypeMeta>
          <InstanceType>{type.value}</InstanceType>
          <TypeMeta><Outline>{')'}</Outline></TypeMeta>
        </span>
      );
    }
    return (
      <span>
        <TypeMeta>One of <Outline>{'('}</Outline></TypeMeta>
        <Indent>
          {Array.isArray(type.value)
            ? type.value.map((v, i) => <Block key={i}>{print(v.value, depth + 1)}</Block>)
            : print(type.value, depth + 1)}
        </Indent>
        <TypeMeta><Outline>{')'}</Outline></TypeMeta>
      </span>
    );
  }

  if (type.kind === 'union') {
    return (
      <span>
        <TypeMeta>One of <Outline>{'('}</Outline></TypeMeta>
        <Indent>
          {Array.isArray(type.types)
            ? type.types.map(i => <Block>{print(i, depth + 1)}</Block>)
            : print(type.types, depth + 1)}
        </Indent>
        <TypeMeta><Outline>{')'}</Outline></TypeMeta>
      </span>
    );
  }

  // note we guard against complex name properties here, because you can have
  // shapes with name properties
  if (!type.value && typeof type.name === 'string') {
    return (
      <Type>{type.name}</Type>
    );
  }

  return <Invalid>{JSON.stringify(type)}</Invalid>;
}

export default class PrettyPropType extends Component {
  static propTypes = {
    type: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
  }
  state = {}
  render() {
    const { type } = this.props;

    if (SIMPLE_TYPES.includes(type.kind)) return null;
    if (type.kind === 'nullable' && SIMPLE_TYPES.includes(type.arguments.kind)) return null;

    return (
      <Wrapper>
        {print(type)}
      </Wrapper>
    );
  }
}
