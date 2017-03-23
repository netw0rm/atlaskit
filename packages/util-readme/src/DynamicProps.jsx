import React, { PropTypes, PureComponent } from 'react';
import * as reactDocs from 'react-docgen';

import Description from './Description';
import Heading from './Heading';

function parseValue(type) {
  if (type.name === 'arrayOf') {
    return `[ ${parseValue(type.value)} ]`;
  }

  if (type.name === 'union') {
    return type.value.map(parseValue).join(' | ');
  }

  if (!type.value) {
    return type.name;
  }

  if (typeof type.value === 'string') {
    return type.value;
  }

  return null;
}

function renderValue(type) {
  if (type.name === 'arrayOf' || type.name === 'union' || (typeof type.value === 'string')) {
    return (
      <div>
        <code>{parseValue(type)}</code>
      </div>
    );
  }

  return null;
}

const Wrap = ({ children }) => (
  <div>
    <Heading type="2">Props</Heading>
    {children}
  </div>
);

Wrap.propTypes = {
  children: PropTypes.node,
};

export default class DynamicProps extends PureComponent {
  static propTypes = {
    componentSrc: PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props);
    const componentDocs = reactDocs.parse(props.componentSrc);
    this.state = { componentDocs };
  }
  componentWillReceiveProps(newProps) {
    if (newProps.componentSrc !== this.props.componentSrc) {
      const componentDocs = reactDocs.parse(newProps.componentSrc);
      this.setState({ componentDocs });
    }
  }
  render() {
    const { componentDocs } = this.state;
    if (!componentDocs || !componentDocs.props || !!componentDocs.props.length) {
      return (
        <Wrap>
          <Description>There are no props for this component.</Description>
        </Wrap>
      );
    }

    const propTypes = Object.keys(componentDocs.props);

    return (
      <Wrap>
        <table>
          <thead style={{ border: 0, borderBottom: '1px solid #ddd' }}>
            <tr>
              <th>Name (* is required)</th>
              <th>Type</th>
              <th>Default value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody style={{ border: 0 }}>
            {propTypes.map((propName) => {
              const prop = componentDocs.props[propName];
              return (
                <tr key={propName}>
                  <td>{propName}{prop.required ? ' *' : ''}</td>
                  <td>{prop.type.name || '--'}</td>
                  <td>{prop.defaultValue ? prop.defaultValue.value : '--'}</td>
                  <td>
                    {prop.description}
                    {renderValue(prop.type)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Wrap>
    );
  }
}
