import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { theme, themeValue } from '../../../../theme/src';

const Wrapper = styled.code`
  display: inline-block;
  font-size: 0.8rem;
  line-height: 1.4;
  margin-bottom: ${themeValue('base.gridSize')}px;
  margin-top: ${themeValue('base.gridSize')}px;
`;
const Block = styled.span`
  display: block;
`;
const TypeMinWidth = styled.span`
  display: inline-block;
  min-width: 60px;
`;
const Type = styled.span`
  background-color: ${themeValue('dynamicProps.types.base.background')};
  border-radius: ${themeValue('base.borderRadius')}px;
  color: ${themeValue('dynamicProps.types.base.text')};
  display: inline-block;
  margin: 2px 0;
  padding: 0 0.2em;
`;
const TypeMeta = styled(Type)`
  background-color: ${themeValue('dynamicProps.types.meta.background')};
  color: ${themeValue('dynamicProps.types.meta.text')};
`;
const StringType = styled(Type)`
  background-color: ${themeValue('dynamicProps.types.string.background')};
  color: ${themeValue('dynamicProps.types.string.text')};
`;
const InstanceType = styled(Type)`
  background-color: ${themeValue('dynamicProps.types.instance.background')};
  color: ${themeValue('dynamicProps.types.instance.text')};
`;
const Required = styled.span`
  color: ${themeValue('dynamicProps.types.required')};
`;
const Outline = styled.span`
  color: ${themeValue('dynamicProps.types.outline')};
  line-height: 1;
`;
const Invalid = styled.span`
  color: ${themeValue('dynamicProps.types.invalid')};
  margin: ${p => theme(p).base.gridSize / 2}px;
`;

const SIMPLE_TYPES = ['array', 'bool', 'func', 'number', 'object', 'string',
  'symbol', 'node', 'element', 'custom', 'any'];

/* eslint-disable no-use-before-define */
/* eslint-disable prefer-rest-params */
function printComplexType(type) {
  if (typeof type === 'object' && !SIMPLE_TYPES.includes(type.name)) {
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

  function maybeIndent(nestedType) {
    if (SIMPLE_TYPES.includes(nestedType.name)) {
      return print(nestedType, depth + 1);
    }
    return <Indent>{print(nestedType, depth + 1)}</Indent>;
  }

  if (typeof type === 'string') {
    if (type.charAt(0) === "'") {
      return <StringType>{type}</StringType>;
    }
    return <Type>{type}</Type>;
  }

  // make sure we have an object; we should always have an object!!!
  if (typeof type !== 'object') {
    return (
      <div>ERROR: TYPEOF type === {typeof type}</div>
    );
  }

  if (type.name === 'arrayOf') {
    return (
      <span>
        <TypeMeta>Array of <Outline>{'['}</Outline></TypeMeta>
        {maybeIndent(type.value)}
        <TypeMeta><Outline>{']'}</Outline></TypeMeta>
      </span>
    );
  }

  if (type.name === 'objectOf') {
    return (
      <span>
        <TypeMeta>Object of <Outline>{'{'}</Outline></TypeMeta>
        {maybeIndent(type.value)}
        <TypeMeta><Outline>{'}'}</Outline></TypeMeta>
      </span>
    );
  }

  if (type.name === 'instanceOf') {
    return (
      <span>
        <TypeMeta>Instance of <Outline>{'('}</Outline></TypeMeta>
        <InstanceType>{type.value}</InstanceType>
        <TypeMeta><Outline>{')'}</Outline></TypeMeta>
      </span>
    );
  }

  if (type.name === 'shape') {
    if (typeof type.value === 'string') {
      return (
        <span>
          <TypeMeta>Shape <Outline>{'{'}</Outline></TypeMeta>
          <InstanceType>{type.value}</InstanceType>
          <TypeMeta><Outline>{'}'}</Outline></TypeMeta>
        </span>
      );
    }
    return (
      <span>
        <TypeMeta>Shape <Outline>{'{'}</Outline></TypeMeta>
        <Indent>
          {Object.keys(type.value).map(key => (
            <div key={key}>
              <TypeMinWidth><Type>{type.value[key].name}</Type></TypeMinWidth>
              {' '}{key}
              {type.value[key].required ? <Required> required</Required> : null}
              {' '}{printComplexType(type.value[key], depth + 1)}
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

  if (type.name === 'union') {
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
            ? type.value.map(i => <Block>{print(i, depth + 1)}</Block>)
            : print(type.value, depth + 1)}
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

export default class PrettyPropType extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
  }
  state = {}
  render() {
    const { type } = this.props;
    if (SIMPLE_TYPES.includes(type.name)) return null;
    return (
      <Wrapper>
        {print(type)}
      </Wrapper>
    );
  }
}
