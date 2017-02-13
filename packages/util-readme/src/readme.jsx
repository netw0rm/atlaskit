import uppercamelcase from 'uppercamelcase';
import React, { PropTypes, PureComponent } from 'react';
import Markdown from 'react-remarkable';

import Chrome from './chrome';
import Code from './code';
import Description from './description';
import Heading from './heading';

export default class AtlaskitUtilReadme extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    description: PropTypes.string,
    name: PropTypes.string.isRequired,
  }
  render() {
    const { children, description, name } = this.props;
    return (
      <Chrome title={uppercamelcase(name.split('/').pop())}>
        {description ? <Description>{description}</Description> : null}
        <Heading type="2">Usage</Heading>
        <Description>Installing:</Description>
        <Code language="bash">{`npm install ${name}`}</Code>
        {children ? (
          <div>
            <Description>Basic usage:</Description>
            <Markdown>{children}</Markdown>
          </div>
        ) : null}
      </Chrome>
    );
  }
}
