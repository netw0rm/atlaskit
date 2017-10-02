import * as React from 'react';
import { PureComponent } from 'react';
import {
  akColorB300,
  akColorB400,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';
import { EventHandlers } from '../../../ui/Renderer';
import { ActionMarkAttributes } from '@atlaskit/editor-common';

// tslint:disable-next-line:variable-name
const StyledAction = styled.span`
  color: ${akColorB400};
  cursor: pointer;

  &:hover {
    color: ${akColorB300};
    text-decoration: underline;
  }
`;

export interface Props extends ActionMarkAttributes {
  eventHandlers?: EventHandlers;
  children?: any;
}

export default class Action extends PureComponent<Props, {}> {

  onClick = () => {
    if (this.props.eventHandlers &&
      this.props.eventHandlers.action &&
      this.props.eventHandlers.action.onClick) {
      this.props.eventHandlers.action.onClick({
        target: this.props.target,
        parameters: this.props.parameters
      });
    }
  }

  render() {
    // tslint:disable-next-line:variable-name
    const Component = this.props.target.key ? StyledAction : React.DOM.span;
    return (
      <Component onClick={this.onClick}>{this.props.children}</Component>
    );
  }
}
