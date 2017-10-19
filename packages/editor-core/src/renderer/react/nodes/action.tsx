import * as React from 'react';
import { ActionAttributes as Attributes } from '@atlaskit/editor-common';
import { EventHandlers } from '../../../ui/Renderer';
import Button from '@atlaskit/button';
import styled from 'styled-components';

// tslint:disable-next-line:variable-name
const ActionButton = styled(Button)`
  margin-right: 5px;
  margin-bottom: 5px;
` as any;

export interface ActionGroupViewProps extends Attributes {
  eventHandlers?: EventHandlers;
}

export default class Action extends React.Component<ActionGroupViewProps, any> {
  private onClick = () => {
    const { eventHandlers, target, parameters, text } = this.props;

    if (eventHandlers && eventHandlers.actionGroup && eventHandlers.actionGroup.onClick) {
      eventHandlers.actionGroup.onClick({
        target, parameters, text
      });
    }
  }

  render() {
    return <ActionButton onClick={this.onClick}>{this.props.text}</ActionButton>;
  }
}
