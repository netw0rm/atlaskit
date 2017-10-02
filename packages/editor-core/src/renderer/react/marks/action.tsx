import * as React from 'react';
import { PureComponent } from 'react';
import {
  akColorB300,
  akColorB400,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';
import { EventHandlers } from '../../../ui/Renderer';

// tslint:disable-next-line:variable-name
const StyledAction = styled.span`
  color: ${akColorB400};
  cursor: pointer;

  &:hover {
    color: ${akColorB300};
    text-decoration: underline;
  }
`;

export interface Props {
  eventHandlers?: EventHandlers;
  children?: any;
  target?: string;
}

export default class Action extends PureComponent<Props, {}> {

  onClick = () => {
    if (this.props.eventHandlers &&
      this.props.eventHandlers.actionTarget &&
      this.props.eventHandlers.actionTarget.onClick) {
      this.props.eventHandlers.actionTarget.onClick({
        target: this.props.target
      });
    }
  }

  render() {
    return (
      <StyledAction onClick={this.onClick}>{this.props.children}</StyledAction>
    );
  }
}
