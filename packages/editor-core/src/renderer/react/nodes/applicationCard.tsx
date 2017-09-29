import * as React from 'react';
import { AppCardView } from '@atlaskit/media-card';
import { Attributes } from '../../../schema/nodes/applicationCard';
import { EventHandlers } from '../../../ui/Renderer';

export interface AppCardViewProps extends Attributes {
  eventHandlers?: EventHandlers;
}

export default function ApplicationCard(props, params) {
  const { eventHandlers, link } = props;
  const onClick = () => {
    if (eventHandlers && eventHandlers.applicationCard && eventHandlers.applicationCard.onClick) {
      eventHandlers.applicationCard.onClick(link && link.url ? link.url : undefined);
    }
  };

  return <AppCardView
    key={params.key}
    onClick={onClick}
    model={props}
    onActionClick={eventHandlers && eventHandlers.applicationCard && eventHandlers.applicationCard.onActionClick}
  />;
}
