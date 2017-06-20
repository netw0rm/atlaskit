import * as React from 'react';
import {AppCardModel} from '../model';
import {AppCardView} from './AppCardView';

export interface AppCardProps {
  details: AppCardModel;
}

export interface AppCardState {
  isCollapsed: boolean;
}

export class AppCard extends React.Component<AppCardProps, AppCardState> {

  state = {
    isCollapsed: false
  };

  handleCollapseToggled = () => this.setState(state => ({isCollapsed: !state.isCollapsed}));

  render() {
    const {details} = this.props;
    const {isCollapsed} = this.state;
    return (
      <AppCardView
        model={details}
        isCollapsed={isCollapsed}
        onCollapseClick={this.handleCollapseToggled}
      />
    );
  }

}
