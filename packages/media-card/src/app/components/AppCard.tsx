import * as React from 'react';
import {AppCardModel} from '../model';
import {AppCardView} from './AppCardView';

export interface AppCardProps {
  details: AppCardModel;
}

export interface AppCardState {
  collapsed: boolean;
}

export class AppCard extends React.Component<AppCardProps, AppCardState> {

  state = {
    collapsed: false
  };

  handleCollapseToggled = () => this.setState(state => ({collapsed: !state.collapsed}));

  render() {
    const {details} = this.props;
    const {collapsed} = this.state;
    return (
      <AppCardView
        model={details}
        collapse={collapsed}
        onCollapseClick={this.handleCollapseToggled}
      />
    );
  }

}
