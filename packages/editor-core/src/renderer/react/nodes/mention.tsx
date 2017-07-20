import * as React from 'react';
import { PureComponent } from 'react';

import Mention from '../../../ui/Mention';
import { EventHandlers } from '../../../ui/Renderer';
import ProviderFactory from '../../../providerFactory';

export interface Props {
  id: string;
  providers?: ProviderFactory;
  eventHandlers?: EventHandlers;
  text: string;
  accessLevel?: string;
}

export default class MentionItem extends PureComponent<Props, {}> {
  render() {
    const {
      eventHandlers,
      id,
      providers,
      text,
      accessLevel,
    } = this.props;

    return (
      <Mention
        id={id}
        text={text}
        accessLevel={accessLevel}
        providers={providers}
        eventHandlers={eventHandlers && eventHandlers.mention}
      />
    );
  }
}
