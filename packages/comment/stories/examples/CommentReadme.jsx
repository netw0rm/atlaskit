import React, { PropTypes, PureComponent } from 'react';
import { Code, Chrome, Description, Heading, Props } from '@atlaskit/util-readme';
import { name } from '../../package.json';

export default class CommentReadme extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    example: PropTypes.node,
    exampleRaw: PropTypes.node,
    component: PropTypes.func,
    propDescriptions: PropTypes.objectOf(PropTypes.string),
    propTypes: PropTypes.objectOf(PropTypes.string),
    children: PropTypes.node,
  }

  render() {
    return (
      <div>
        <Chrome title={`${name} - ${this.props.name}`}>
          <Description>{this.props.description}</Description>
          <Heading type="2">Usage</Heading>
          <Description>Installing:</Description>
          <Code language="bash">{`npm install ${name}`}</Code>
          <Description>Basic usage:</Description>
          <Code code={this.props.exampleRaw}>
            {this.props.example}
          </Code>
          {this.props.children}
          <Props
            component={this.props.component}
            descriptions={this.props.propDescriptions}
            types={this.props.propTypes}
          />
        </Chrome>
      </div>
    );
  }
}
