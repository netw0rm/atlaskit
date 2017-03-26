import React, { PropTypes, PureComponent } from 'react';
import * as reactDocs from 'react-docgen';
import styled from 'styled-components';

import typeParser from './typeParser';
import Description from './Description';
import Heading from './Heading';

const CodeBlock = styled.code`
  display: block;
`;

const wrap = inner => (
  <div>
    <Heading type={2}>Props</Heading>
    {inner}
  </div>
);

function renderTypeDescription(type) {
  // primitive types have the shape { name: <type> }
  // complex types have the shape { name: <type>, value: <something> }
  // we only want to render the explicit type options in the description area if they are complex
  if (type.value) {
    return <CodeBlock>{typeParser(type)}</CodeBlock>;
  }

  return null;
}

export default class DynamicProps extends PureComponent {
  static propTypes = {
    componentSrc: PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props);
    // we store this in state to cache it between "props" changes.changes
    // this is defensive, against a case in the future where props to control behaviour are added
    // since reactDocs.parse is an expensive operation, we want to avoid recomputing it
    // when the props change, unless the componentSrc prop is the one that changes
    // see the componentWillReceiveProps method below
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
      return wrap(<Description>There are no props for this component.</Description>);
    }

    const propTypes = Object.keys(componentDocs.props);

    return wrap(
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
                  {renderTypeDescription(prop.type)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
