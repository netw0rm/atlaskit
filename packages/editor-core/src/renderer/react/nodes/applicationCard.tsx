import * as React from 'react';
import { PureComponent } from 'react';
import { AppCardView } from '@atlaskit/media-card';
import { Attributes } from '../../../schema/nodes/applicationCard';
import { EventHandlers } from '../../../ui/Renderer';

export interface AppCardViewProps extends Attributes {
  eventHandlers?: EventHandlers;
}

export default class ApplicationCard extends PureComponent<AppCardViewProps, {}> {
  state = {};

  private onClick = () => {
    const { eventHandlers, link } = this.props;

    if (eventHandlers && eventHandlers.applicationCard && eventHandlers.applicationCard.onClick) {
      eventHandlers.applicationCard.onClick(link && link.url ? link.url : undefined);
    }
  }

  render() {

    const { eventHandlers } = this.props;

    return <AppCardView
      onClick={this.onClick}
      model={this.props}
      onActionClick={eventHandlers && eventHandlers.applicationCard && eventHandlers.applicationCard.onActionClick}
    />;
  }
}
