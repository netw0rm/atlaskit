import * as React from 'react';
import { PureComponent } from 'react';
import { Attributes } from '../../../schema/nodes/applicationCard';
import { EventHandlers } from '../../../ui/Renderer';
import Spinner from '@atlaskit/spinner';

export interface AppCardViewProps extends Attributes {
  eventHandlers?: EventHandlers;
}

export interface AppCardViewState {
  AppCardView?: React.ComponentClass<any>;
}

export default class ApplicationCard extends PureComponent<AppCardViewProps, AppCardViewState> {
  state: AppCardViewState = {};

  componentDidMount () {
    require.ensure([], () => {
      const { AppCardView } = require('@atlaskit/media-card');
      this.setState({ AppCardView });
    });
  }

  private onClick = () => {
    const { eventHandlers, link } = this.props;

    if (eventHandlers && eventHandlers.applicationCard && eventHandlers.applicationCard.onClick) {
      eventHandlers.applicationCard.onClick(link && link.url ? link.url : undefined);
    }
  }

  render() {

    const { eventHandlers } = this.props;
    const { AppCardView } = this.state;
    if (!AppCardView) {
      return <Spinner />;
    }

    return <AppCardView
      onClick={this.onClick}
      model={this.props}
      onActionClick={eventHandlers && eventHandlers.applicationCard && eventHandlers.applicationCard.onActionClick}
    />;
  }
}
