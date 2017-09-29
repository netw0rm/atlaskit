import * as React from 'react';

import Mention from '../../../ui/Mention';
import { EventHandlers } from '../../../ui/Renderer';
import ProviderFactory from '../../../providerFactory';

export interface Props {
  id: string;
  providers?: ProviderFactory;
  eventHandlers?: EventHandlers;
  text: string;
  accessLevel?: string;
  portal?: HTMLElement;
}

export default function MentionItem(props, params) {
  const {
    eventHandlers,
    id,
    portal,
    providers,
    text,
    accessLevel,
  } = props;

  return (
    <Mention
      key={params.key}
      id={id}
      text={text}
      accessLevel={accessLevel}
      providers={providers}
      portal={portal}
      eventHandlers={eventHandlers && eventHandlers.mention}
    />
  );
}
