import React, { PropTypes, PureComponent } from 'react';
import decamelize from 'decamelize';
import Chrome from './chrome';
import Code from './code';
import Description from './description';
import Heading from './heading';

// eslint-disable-next-line react/prefer-stateless-function
export default class extends PureComponent {
  static displayName = 'Readme'
  static propTypes = {
    children: PropTypes.node,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    description: PropTypes.string.isRequired,
  }
  render() {
    const { children, component, description } = this.props;
    const displayName = (typeof component === 'string' ? component : component.displayName) || 'Unknown';
    const displayNameDashed = displayName ? decamelize(displayName, '-') : '';
    return (
      <Chrome title={displayName}>
        <Description>{description}</Description>
        <Heading type="2">Usage</Heading>
        <Description>Installing:</Description>
        <Code language="bash">{`npm install ${displayNameDashed}`}</Code>
        {children ? [<Description>Basic usage:</Description>, children] : ''}
      </Chrome>
    );
  }
}
