import React, { PropTypes, PureComponent } from 'react';
import * as reactDocs from 'react-docgen';

import Description from './description';
import Heading from './heading';

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
    const propTypes = Object.keys(componentDocs.props);
    return (
      <div>
        <Heading type="2">Props</Heading>
        {propTypes.length ? (
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
                      {prop.type.value ? (
                        <div>Allowed values are: <code>
                          {prop.type.value.map(i => i.value).join(' | ')}
                        </code></div>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <Description>There are no props for this component.</Description>
        )}
      </div>
    );
  }
}
